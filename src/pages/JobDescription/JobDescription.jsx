import { useEffect, useState } from "react";
import axios from "axios";
import "./JobDescription.css";
import { useParams } from "react-router-dom";
import CustomDate from "../../utils/dateUtils";

const JobDescription = () => {
  const { jobId } = useParams();
  const [jobData, setJobData] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:3000/job/${jobId}`).then((response) => {
      console.log("data", response.data);
      setJobData(response.data);
    });
  }, [jobId]);
  return (
    <div className="job-description grow flex flex-col ">
      <header className="hero h-80 justify-start bg-[#e7e8ff]">
        <div className="hero-content w-full px-8 flex gap-12">
          <div className="job-description-logo">
            <img src={jobData.logo} className=" rounded-lg" />
          </div>
          <div className="w-full">
            <h1 className="text-3xl font-bold text-left pl-4">
              {jobData.company}
            </h1>
            <p className="text-xl py-6 text-left pl-4">{jobData.title}</p>
            <ul className="grid grid-cols-2 gap-4 text-lg">
              <li className="opacity-70 flex gap-2">
                <ion-icon className="icon" name="time"></ion-icon>
                Ngày đăng tin: {new CustomDate(jobData.createdAt).formatDate()}
              </li>
              <li className="opacity-70 flex gap-2">
                <ion-icon className="icon" name="calendar"></ion-icon>
                Hạn ứng tuyển: {new CustomDate(jobData.closedDate).formatDate()}
              </li>
              <li className="opacity-70 flex gap-2">
                <ion-icon className="icon" name="location"></ion-icon>Địa chỉ
                làm việc: {jobData.location}
              </li>
              <li className="opacity-70 flex gap-2">
                <i className="icon fa fa-dollar-sign"></i>
                Mức lương: {jobData.salary}
              </li>
              <li className="opacity-70 flex gap-2">
                <ion-icon className="icon" name="person"></ion-icon>
                Vị trí tuyển dụng: {jobData.position}
              </li>
              <li className="opacity-70 flex gap-2">
                <ion-icon className="icon" name="briefcase"></ion-icon>
                Lĩnh vực: {jobData.field}
              </li>
            </ul>
          </div>
        </div>
      </header>

      <main className="p-8 text-justify text-lg">{jobData.description}</main>
    </div>
  );
};

export default JobDescription;
