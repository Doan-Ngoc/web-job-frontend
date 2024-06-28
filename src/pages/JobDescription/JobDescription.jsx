import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import "./JobDescription.css";
import { useParams } from "react-router-dom";
import CustomDate from "../../utils/dateUtils";

const JobDescription = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [jobData, setJobData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get(`http://localhost:3000/job/${jobId}`).then((response) => {
      setJobData(response.data);
      setIsLoading(false);
    });
  }, [jobId]);
  
  return (
    <div className="job-description grow flex flex-col ">
      {isLoading ? ( // Conditional rendering while loading
        <p>Loading...</p>
      ) : (
        <div>
          <header className="hero h-80 justify-start bg-[#e7e8ff]">
            <div className="hero-content w-full px-8 flex gap-12 bg-[#ff9999]">
              <div className="job-description-logo">
                <img src={jobData.logo} className=" rounded-lg" />
              </div>
              <div className="w-full">
                <h1 className="text-3xl font-bold text-left pl-4"
                >
                  {jobData.title}
                </h1>
                <Link to={`/profile/company/${jobData.createdBy}`}>
                <p className="cursor-pointer text-xl py-6 text-left pl-4" >{jobData.company}</p>
                </Link>
                <ul className="grid grid-cols-2 gap-4 text-lg text-left">
                  <li className="opacity-70 flex gap-2 ">
                    <ion-icon className="icon" name="time"></ion-icon>
                    Created at: {new CustomDate(jobData.createdAt).formatDate()}
                  </li>
                  <li className="opacity-70 flex gap-2 ">
                    <ion-icon className="icon" name="calendar"></ion-icon>
                    Valid Until:{" "}
                    {new CustomDate(jobData.closedDate).formatDate()}
                  </li>
                  <li className="opacity-70 flex gap-2 ">
                    <ion-icon className="icon" name="location"></ion-icon>
                    Location: {jobData.location}
                  </li>
                  <li className="opacity-70 flex gap-2 ">
                    <ion-icon name="cash"></ion-icon>
                    Salary: {jobData.salary}
                  </li>
                  <li className="opacity-70 flex gap-2">
                    <ion-icon className="icon" name="person"></ion-icon>
                    Job Position: {jobData.position}
                  </li>
                  <li className="opacity-70 flex gap-2 ">
                    <ion-icon className="icon" name="briefcase"></ion-icon>
                    Field: {jobData.field}
                  </li>
                </ul>
              </div>
            </div>
          </header>

          <main
            className="p-8 text-justify text-lg"
            style={{ whiteSpace: "pre-line" }}
          >
            {jobData.description}
          </main>
        </div>
      )}
    </div>
  );
};

export default JobDescription;
