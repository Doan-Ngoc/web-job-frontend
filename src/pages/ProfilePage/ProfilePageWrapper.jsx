import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NoPermission } from '../errors/NoPermission';
import * as companyApi from '../../api/company';
import { toast } from 'react-hot-toast';
import * as authApi from '../../api/authenticate';
import { useAuth } from '../../contexts/AuthContext';
import CompanyProfile from './CompanyProfile';
import NewCompanyProfile from './NewCompanyProfile';
import { HttpStatusCode } from 'axios';

const ProfilePageWrapper = () => {
  const {accessToken, isLoggedIn} = useAuth();
  const [isLoading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [reloadProfile, setReloadProfile] = useState(false)
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
              const res = await companyApi.getCompanyProfile(response.user.id);
              if (res.data) {
              setProfile(res.data[0]);
              }
              else {
                setProfile(null)
              }
            } 
          }
          }
      catch (err) {
        toast.error('Failed to load profile');
      }
       finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isLoggedIn, reloadProfile]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAllowed) {
    return <NoPermission />;
  }

  if (profile) {
    navigate(`/profile/${profile._id}`, { state: { profile: profile } });
    // return <CompanyProfile profile={profile} />;
  } else {
    return <NewCompanyProfile accountId={accountId} setReloadProfile={setReloadProfile} />;
  }
};

export default ProfilePageWrapper;
