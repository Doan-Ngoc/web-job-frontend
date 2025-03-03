import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { request } from '../../utils/request';
import * as companyApi from '../../api/company';
import './CompanyProfile.css';
import Loading from '../../components/Loading';

const CompanyProfile = ({ accountId }) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState();
  const { accountId: paramAccountId } = useParams();

  useEffect(() => {
    //Get company's account id. 
    // If the user is the company itself, get it from props. If not, get it from URL param.
    const companyId = accountId || paramAccountId
    //Fetch profile data
    const fetchProfile = async () => {
      try {
        const res = await companyApi.getCompanyProfile(companyId);
        if (res.data) {
          setProfile(res.data);
        }
        else {
          navigate('/profile/company/create')
        }
      } catch (err) {
        console.log(err);
        navigate('/error/500');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [accountId, paramAccountId, navigate]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="company-profile grow flex flex-col items-center justify-center">
        <header
          className="hero rounded-md"
          style={{ backgroundColor: 'var(--slate-color)' }}
        >
          <div className="hero-content w-full p-8 flex items-center justify-center gap-24 ">
            <div className="company-logo w-1/4 ">
              <img
                src={
                  profile.name === 'Green Earth Solutions'
                    ? 'https://bcassetcdn.com/public/blog/wp-content/uploads/2022/10/31010325/xbox.png'
                    : `${request.defaults.baseURL}/uploads/${profile.logo}`
                }
                className="w-44 h-44 rounded-full mx-auto"
                alt="Company Logo"
              />
            </div>
            <div className="w-3/4">
              <h1 className="text-2xl font-bold py-6 text-left pl-4">
                {profile.name}
              </h1>
              <ul className="grid grid-rows-3 grid-flow-col gap-4 text-lg text-left">
                <div className="grid grid-cols-2 gap-4 ">
                  <li className="opacity-70 flex gap-3 ">
                    <ion-icon className="icon" name="mail"></ion-icon>
                    {profile.email}
                  </li>
                  <li className="opacity-70 flex gap-3 ">
                    <ion-icon className="icon" name="call"></ion-icon>
                    Tel: {profile.phone}
                  </li>
                </div>
                <li className="opacity-70 flex gap-3 ">
                  <ion-icon className="icon" name="location"></ion-icon>
                  Address: {profile.address}
                </li>
                <li className="opacity-70 flex gap-3 ">
                  <ion-icon className="icon" name="briefcase"></ion-icon>
                  Field: {profile.companyIndustries.join(', ')}
                </li>
              </ul>
            </div>
          </div>
        </header>

        <main
          className="w-full bg-white rounded-md px-32 py-20 text-justify text-lg"
          style={{ whiteSpace: 'pre-line' }}
        >
          {profile.description}
        </main>
      </div>
    </>
  );
};

export default CompanyProfile;
