import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import * as applicantApi from '../../api/applicant'
import { request } from "../../utils/request";
import CustomDate from "../../utils/dateUtils";
import toast from 'react-hot-toast';
import Loading from "../../components/Loading";
import "./JobDescription.css";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const JobDescription = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [jobData, setJobData] = useState({});
  const { isLoggedIn, accessToken, accountRole} = useAuth();
  const [openDialog, setOpenDialog] = useState(false);

  //Fetch job data
  useEffect(() => {
    request.get(`/job/${jobId}`).then((response) => {
      setJobData(response.data);
      setIsLoading(false);
    });
  }, [jobId]);

  //Submit application
  const submitApplication = async () => {
    try {
      setOpenDialog(!openDialog)
      const response = await applicantApi.sendApplication(accessToken, jobId)
      toast.success('Your application has been sent!');
      navigate('/job/applied');
    } catch (err) {
      console.error("Sending application failed", err.message);
      const errorMessage = err.response?.data?.message || 'Something went wrong! Please try again later.';
      toast.error(errorMessage);
    }
  }

  return (
   isLoading ? 
       <Loading />
       : 
        <div className="job-description grow flex flex-col">
        <div>
          {/* Header with job details */}
          <header className="hero rounded-md" 
          style={{ backgroundColor: 'var(--slate-color)'}}
          >
            <div className="hero-content w-full p-8 flex">
              <div className="job-description-logo w-1/4">
                <img src={`${request.defaults.baseURL}/uploads/${jobData.logo}`} 
                className="rounded-full w-44 h-44 mx-auto" alt="Company Logo"/>
              </div>
              <div className="w-3/4">
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
          {/* Job description */}
          <main
            className="bg-white rounded-md px-32 py-20 text-justify text-lg"
            style={{ whiteSpace: "pre-line" }}
          >
            {jobData.description}
          </main>
          {/* Apply Job button */}
          <Button
            className="btn mt-14 mx-auto text-black text-base font-medium w-1/4 bg-[#ffce00] hover:bg-[#ffce00]"
            onClick={() => setOpenDialog(!openDialog)}>
            Apply Job
          </Button>

          {/* Dialog after clicking Apply Job button */}
          <Dialog
            open={openDialog}
            size="xs"
            className="w-44"
          >
            {isLoggedIn ? (
              // Dialog for applicant
              accountRole === "applicant" ? (
                <DialogBody className="font-normal text-lg text-center ">
                  Would you like to apply for this job? Click OK to send your profile to the hiring team.
                </DialogBody>
              ) : (
                //Dialog if logged in as company
                <DialogBody className="font-normal text-lg text-center ">
                  You need an applicant account to apply for jobs.
                </DialogBody>
              )
            ) : (
                //Dialog if user haven't logged in
              <DialogBody className="font-medium text-lg text-center ">
                Log in required
              </DialogBody>
            )}

            {/* Dialog to confirm sending application */}
            {accountRole === "applicant" ? (
              <DialogFooter className="flex justify-center gap-3">
                <Button
                  className="bg-[#ffce00] text-black text-base font-medium"
                  onClick={submitApplication}
                >
                  <span>Yes</span>
                </Button>
                <Button
                  variant="text"
                  color="black"
                  onClick={() => setOpenDialog(!openDialog)}
                  className="mr-1 text-base"
                >
                  <span>Cancel</span>
                </Button>
              </DialogFooter>
            ) : (
              //Dialog to abandon action if not logged in as applicant
              <DialogFooter className="flex justify-center">
                <Button
                  className="bg-[#ffce00] text-base text-black "
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
    </div>
  );
};

export default JobDescription;
