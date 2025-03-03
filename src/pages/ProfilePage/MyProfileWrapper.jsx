import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import CompanyProfile from './CompanyProfile';
import Homepage from '../Homepage/Homepage';
import ApplicantProfile from './ApplicantProfile';

const ProfilePageWrapper = () => {
  const {accountRole, accountId } = useAuth();
  // const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  // if (accountRole !== "company" || accountRole !== "applicant") {
  //   navigate("/error/500")
  // }

  return (
    //Show My Profile page for company or applicant based on account role
    <div>
      {accountRole === 'company' ? (
        <CompanyProfile accountId={accountId} />
      ) : accountRole === 'applicant' ? (
        <ApplicantProfile accountId={accountId}/>
      ) :  null}
    </div>
  );
}

export default ProfilePageWrapper;
