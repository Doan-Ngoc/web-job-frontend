import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CustomDate from '../../utils/dateUtils';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const ApplyJob = () => {
  const { jobId } = useParams();
  const [jobData, setJobData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { register, handleSubmit } = useForm();
  const today = new Date();
  const applicationDate = today.toLocaleDateString().split('T')[0];
  useEffect(() => {
    axios.get(`http://localhost:3000/job/${jobId}`).then((response) => {
      setJobData(response.data);
      setIsLoading(false);
    });
  }, [jobId]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('file', data.file[0]);
      formData.append('description', data.description);
      formData.append('applicationDate', applicationDate);
      formData.append('status', 'sent');
      console.log(...formData);
      const token = localStorage.getItem('refreshToken');
      const response = await axios.post(
        'http://localhost:3000/applicant/apply',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const responseData = response.data;
      console.log(responseData);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  // useEffect(() => {
  //   const setupFormListener = () => {
  //     const form = document.querySelector('form');

  //     if (form) {
  //       form.addEventListener('submit', async (e) => {
  //         e.preventDefault();
  //         const files = document.getElementById('files');
  //         const applicationDescription = document.getElementById(
  //           'application-description',
  //         );
  //         const formData = new FormData();

  //         for (let i = 0; i < files.files.length; i++) {
  //           formData.append('files', files.files[i]);
  //         }
  //         formData.append('description', applicationDescription);
  //         formData.append(
  //           'applicationDate',
  //           new Date().toISOString().split('T')[0],
  //         );
  //         formData.append('status', 'active');

  //         console.log(...formData);
  //         try {
  //           const token = localStorage.getItem('refreshToken');
  //           const response = await axios.post(
  //             'http://localhost:3000/applicant/apply',
  //             formData,
  //             {
  //               headers: {
  //                 Authorization: `Bearer ${token}`,
  //               },
  //             },
  //           );
  //           const data = response.data;
  //           console.log(data);
  //         } catch (error) {
  //           console.error('Error uploading files:', error);
  //         }
  //       });
  //     }
  //   };

  //   if (!isLoading) {
  //     setupFormListener();
  //   }
  // }, [isLoading]);

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
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="file"
                name="file"
                id="file"
                required
                {...register('file')}
              />

              <textarea
                id="application-description"
                rows={8}
                className="text-xl bg-white h-full min-h-[100px] w-full resize-none rounded-[7px] border
             px-3 py-2  transition-all !border-t-blue-gray-200 focus:!border-t-gray-900"
                placeholder=" "
                {...register('description')}
              ></textarea>
              <button type="submit">Submit</button>
            </form>
          </main>
        </div>
      )}
    </div>
  );
};

export default ApplyJob;
