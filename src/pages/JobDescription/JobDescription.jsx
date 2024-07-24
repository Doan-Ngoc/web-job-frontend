import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import "./JobDescription.css";
import { useParams } from "react-router-dom";
import CustomDate from "../../utils/dateUtils";
import toast from 'react-hot-toast';
import * as applicantApi from '../../api/applicant'
import {
  Card,
  Input,
  Typography,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const JobDescription = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [jobData, setJobData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn, accessToken, accountRole, accountId } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    axios.get(`http://localhost:3000/job/${jobId}`).then((response) => {
      setJobData(response.data);
      setIsLoading(false);
    });
  }, [jobId]);

  const submitApplication = async () => {
    try {
      setOpenDialog(!openDialog)
     const response = await applicantApi.sendApllication(accessToken, jobId) 
     toast.success('Your application has been sent!');
    } catch(err) {
      console.error("Sending application failed", err.message);
      const errorMessage = err.response?.data?.message || 'Something went wrong! Please try again later.';
      toast.error(errorMessage);
    }
  }

  return (
    <div className="job-description grow flex flex-col ">
      {isLoading ? ( // Conditional rendering while loading
        <p>Loading...</p>
      ) : (
        <div>
          <header className="hero h-80 bg-[#e7e8ff]">
            <div className="hero-content w-full px-8 flex gap-12 bg-[#ff9999]">
              <div className="job-description-logo">
                <img src={`http://localhost:3000/uploads/${jobData.logo}`} alt="Company Logo" className="w-44 h-44 rounded-full object-cover" />

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

          <Button
            className="btn mt-10 mx-auto text-black text-base font-medium w-1/3 bg-[#ffce00] hover:bg-[#ffce00]"
            onClick={() => setOpenDialog(!openDialog)}>
            Apply Job
          </Button>

          <Dialog
            open={openDialog}
            size="xs"
            // handler={openDialog}
            className="w-44"
          >
            {isLoggedIn ? (
              accountRole === "applicant" ? (
                <DialogBody className="font-medium text-lg text-center ">
                Would you like to apply for this job? Click OK to send your profile to the hiring team.
              </DialogBody>
              ) : (
               <DialogBody className="font-medium text-lg text-center ">
                You need an applicant account to apply for jobs.
              </DialogBody>
              )
            ) : (
              <DialogBody className="font-medium text-lg text-center ">
                Log in required
              </DialogBody>
            )}
           
            {accountRole === "applicant" ? (
              <DialogFooter className="flex justify-center">
              <Button
                className="bg-[#ffce00] text-black font-medium"
                color="black"
              onClick={submitApplication}
              >
                <span>Yes</span>
              </Button>
              <Button
              variant="text"
              color="black"
              onClick={() => setOpenDialog(!openDialog)}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            </DialogFooter>
              ) : (
                <DialogFooter className="flex justify-center">
                <Button
                className="bg-[#ffce00] text-black font-medium"
                color="black"
                onClick={() => setOpenDialog(!openDialog)}
              >
                <span>OK</span>
              </Button>
            </DialogFooter>
             )
            }
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default JobDescription;
