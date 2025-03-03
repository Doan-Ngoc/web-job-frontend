import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as applicantApi from '../../api/applicant';
import { request } from '../../utils/request';
import { Button } from '@material-tailwind/react';

const ApplicantProfile = ({ accountId }) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const { accountId: paramAccountId } = useParams();

  useEffect(() => {
    const applicantId = accountId || paramAccountId
    //Fetch profile data
    const fetchProfile = async () => {
      try {
        const res = await applicantApi.getApplicantProfile(applicantId);
        if (res.data) {
          setProfile(res.data);
        }
        else {
          navigate('/profile/applicant/create')
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="company-profile grow flex flex-col items-center justify-center px-8">
        {/* Profile information */}
        <header className="hero h-80  bg-[#e7e8ff]">
          <div className="hero-content w-full px-8 flex items-center justify-center gap-24 ">
            <div className="w-40 ">
              <img
                src={`${request.defaults.baseURL}/uploads/${profile.profilePicture}`}
                alt="Profile Picture"
                className="w-44 h-44 rounded-full object-cover"
              />
            </div>
            <div className="">
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
                  <ion-icon className="icon" name="briefcase"></ion-icon>
                  Field: {profile.workingFields.join(', ')}
                </li>
              </ul>
            </div>
          </div>
        </header>

        <main
          className="p-8 text-justify text-lg bg-white w-full rounded-lg"
          style={{ whiteSpace: 'pre-line' }}
        >
          {profile.description}
        </main>
      </div>

      {/* Download CV button */}
      <a
        href={`${request.defaults.baseURL}/applicant/download/${profile.applicantCV}`}
        download
      >
        <Button className="btn mt-10 mx-auto text-black text-base font-medium w-1/3 bg-[#ffce00] hover:bg-[#ffce00]">
          Download CV
        </Button>
      </a>
    </>
  );
};

export default ApplicantProfile;
