import { useAuth } from '../../hooks/useAuth';
import CompanyProfile from './CompanyProfile';
import ApplicantProfile from './ApplicantProfile';
import { NoPermission } from '../errors/NoPermission';

const ProfilePageWrapper = () => {
  const {accountRole, accountId } = useAuth();


  return (
    //Show My Profile page for company or applicant based on account role
    <div>
      {accountRole === 'company' ? (
        <CompanyProfile accountId={accountId} />
      ) : accountRole === 'applicant' ? (
        <ApplicantProfile accountId={accountId}/>
      ) :  <NoPermission />}
    </div>
  );
}

export default ProfilePageWrapper;
