import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const CompanyProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = location.state || {}; 
  useEffect(() => {
    if (!profile) {
      navigate('/error/500'); 
    }
  }, [profile]);
  return (
    <div className="company-profile grow flex flex-col items-center justify-center">
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
    </div>
  )
}

export default CompanyProfile