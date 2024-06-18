import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Outlet, useNavigate } from 'react-router-dom';
import * as accountApi from '../api/account';

export default function ProfileRequired() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getAccount = async () => {
      setLoading(true);
      const response = await accountApi.getAccount();
      const account = response.data.account;
      if (!account.associatedProfile && !account.associatedCompany) {
        navigate(`/profile/new/${account.role}`);
        toast('Please complete information for your registration');
      }
    };
    getAccount()
      .catch((_) => {
        navigate('/error/500');
      })
      .finally(() => setLoading(false));
  }, []);

  return <>{isLoading && <Outlet />}</>;
}
