import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NoPermission } from '../errors/NoPermission';
import * as companyApi from '../../api/company';
// import NewBusinessProfile from './NewBusinessProfile';
// import ExistingBusinessProfile from './ExistingBusinessProfile';
import { toast } from 'react-hot-toast';
import * as authApi from '../../api/authenticate';
import { useAuth } from '../../contexts/AuthContext';

const ProfilePageWrapper = () => {
  const {accessToken, isLoggedIn} = useAuth();
  const [isLoading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [profile, setProfile] = useState(null);
  // const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        if (isLoggedIn) {
          const response = await authApi.verifyAccessToken(accessToken);
          if (response.user.role === 'company') {
            setIsAllowed(true);
            setAccountId(response.user.id);
            const profileData = await companyApi.getCompanyProfile(response.user.id);
            setProfile(profileData);
          }
      }
     } catch (err) {
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [accessToken]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAllowed) {
    return <NoPermission />;
  }

  if (profileData) {
    return <ExistingBusinessProfile profile={profile} />;
  } else {
    return <NewBusinessProfile accountId={accountId} />;
  }
};

export default ProfilePageWrapper;
