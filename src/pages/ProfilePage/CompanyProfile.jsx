import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import * as companyApi from '../../api/company';
import {Button} from "@material-tailwind/react";

const CompanyProfile = ({accountId}) => {
  const navigate = useNavigate();
  // const location = useLocation();
  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState();
  const { accountId: paramAccountId } = useParams();
  const [companyId, setCompanyId] = useState();

  // const { profile } = location.state || {}; 

  const fetchProfile = async () => {
    try {
      const res = await companyApi.getCompanyProfile(companyId);
      if (res.data) {
        setProfile(res.data)
      }
    } catch (err) {
      console.log(err)
      navigate("/error/500")
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (accountId) {
      setCompanyId(accountId);
    } else if (paramAccountId) {
      setCompanyId(paramAccountId);
    } else {
      navigate("/error/404");
    }
  }, [accountId, paramAccountId]);

  useEffect(() => {
    if (!companyId) return;
    fetchProfile();
  }, [companyId]);


  // useEffect(() => { 
  //   if (accountId) {
  //     setCompanyId(accountId)
  //   }
  //   else {
  //     setCompanyId(paramAccountId)
  //   }
  //   fetchProfile();
  // }, [accountId, paramAccountId,]);

  if (isLoading) {
    return <div>Loading...</div>
  }
  
  return (
    <>
    <div className="company-profile grow flex flex-col items-center justify-center">
      {/* {isLoading ? (
        <div>Loading...</div>
      ) : ( */}
      <header className="hero h-80  bg-[#e7e8ff]">
        <div className="hero-content w-full px-8 flex items-center justify-center gap-24 ">
          <div className="company-logo w-40 ">
            <img src={profile.logo} className=" rounded-lg" />
          </div>
          <div className="">
            {/* <h1 className="text-3xl font-bold text-left pl-4">
                  {profile.name}
                </h1> */}
            <h1 className="text-2xl font-bold py-6 text-left pl-4">{profile.name}</h1>
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
                Field: {profile.companyIndustries.join(", ")}
              </li>
            </ul>
          </div>
        </div>
      </header>

      <main
        className="p-8 text-justify text-lg "
        style={{ whiteSpace: "pre-line" }}
      >
        {profile.description}
      </main>
      {/* )
} */}
    </div>
    {accountId ? (
      <Button
      className="btn mt-10 mx-auto text-black text-base font-medium w-1/3 bg-[#ffce00] hover:bg-[#ffce00]">
      Edit Profile
    </Button>
    ) : (
      null
    )}
    </>
  )
}

export default CompanyProfile