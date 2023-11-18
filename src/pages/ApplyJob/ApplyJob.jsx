import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CustomDate from '../../utils/dateUtils';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  Typography,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';

const ApplyJob = () => {
  const { jobId } = useParams();
  const [jobData, setJobData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { register, handleSubmit } = useForm();

  //Open dialog when click button
  const [open, setOpen] = React.useState(false);
  const openConfirmDialog = () => setOpen(!open);
  const navigate = useNavigate();

  //Get appliedjob data
  useEffect(() => {
    axios.get(`http://localhost:3000/job/${jobId}`).then((response) => {
      setJobData(response.data);
      setIsLoading(false);
    });
  }, [jobId]);

  // Send application
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      const token = localStorage.getItem('refreshToken');
      const userId = localStorage.getItem('userId');
      formData.append('file', data.file[0]);
      formData.append('notes', data.notes);
      formData.append('userId', userId);
      const response = await axios.post(
        `http://localhost:3000/applicant/apply/${jobId}`,
        formData,
        userId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const responseData = response.data;
      openConfirmDialog();
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div className="job-apply grow flex flex-col ">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
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
                <ul className="grid grid-cols-2 gap-4 text-lg text-left">
                  <li className="opacity-70 flex gap-2 ">
                    <ion-icon className="icon" name="time"></ion-icon>
                    Created at: {new CustomDate(jobData.createdAt).formatDate()}
                  </li>
                  <li className="opacity-70 flex gap-2 ">
                    <ion-icon className="icon" name="calendar"></ion-icon>
                    Valid Until:{' '}
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
            className="p-8 text-justify text-lg flex flex-col gap-10"
            style={{ whiteSpace: 'pre-line' }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <Typography variant="h5" color="blue-gray">
                Upload your CV:
              </Typography>
              <input
                type="file"
                name="file"
                id="file"
                required
                {...register('file')}
              />
              <Typography variant="h5" color="blue-gray">
                Notes:
              </Typography>
              <textarea
                id="application-notes"
                rows={8}
                className="text-xl bg-white h-full min-h-[100px] w-full resize-none rounded-[7px] border
             px-3 py-2  transition-all !border-t-blue-gray-200 focus:!border-t-gray-900"
                placeholder=" "
                {...register('notes')}
              ></textarea>
              <Button
                className="btn mt-10 mx-auto text-black text-base font-medium w-1/4 bg-[#ffce00] hover:bg-[#ffce00]"
                type="submit"
              >
                Submit
              </Button>
            </form>
            <Dialog
              open={open}
              size="xs"
              handler={openConfirmDialog}
              className="w-44"
            >
              <DialogBody className="font-medium text-lg text-center ">
                Your application has been sent!
              </DialogBody>
              <DialogFooter className="flex justify-center">
                <Button
                  className="bg-[#ffce00] text-black font-medium"
                  color="black"
                  onClick={() => navigate('/')}
                >
                  <span>OK</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </main>
        </div>
      )}
    </div>
  );
};

export default ApplyJob;
