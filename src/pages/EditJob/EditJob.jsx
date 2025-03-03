import React from 'react';
import { useForm } from 'react-hook-form';
import { useJob } from '../../hooks/useJob';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import * as companyApi from '../../api/company';
import { request } from '../../utils/request';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Card,
  Input,
  Typography,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';

const EditJob = () => {
  //Get data of this job
  const { jobId } = useParams();
  const { accessToken } = useAuth();
  const [jobData, setJobData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    //Verify account and get job data
    const fetchJobData = async () => {
      try {
        const jobData = await companyApi.jobCreatorAuthorize(accessToken, jobId);
        if (jobData) {
          setJobData(jobData);
        } else {
          navigate('/error/no-permission');
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };
    fetchJobData();
  }, [accessToken, jobId, navigate]);
  
  //Get the job field list
  const { jobFields } = useJob();
  //Conditionally rendering the edit page or the restore page
  const location = useLocation();
  const currentPath = location.pathname;
  // Calculate the minimum expiration date (10 days from today)
  const today = new Date();
  today.setDate(today.getDate() + 10);
  const minDate = today.toISOString().split('T')[0];
  //Use React Hook Form
  const { register, handleSubmit} =useForm();
  //Open dialog when click button
  const [open, setOpen] = React.useState(false);
  const openConfirmDialog = () => setOpen(!open);
  const navigate = useNavigate();
  const backToHomePage = async () => {
    const res = await request.get(`/job/${jobId}`);
    setJobData(res.data);
    navigate(`/job/${jobId}`);
  };

  //Submit form
  const handleFormSubmit = async (data) => {
    try {
      const validateAccount = await companyApi.jobCreatorAuthorize(
        accessToken,
        jobId,
      );
      if (validateAccount) {
        await request.put(`/job/update/${jobId}`, {
          ...jobData,
          ...data,
        });
        openConfirmDialog();
      } else {
        toast.error('Oops something went wrong');
      }
    } catch (error) {
      console.error('Updating job failed', error);
    }
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Card color="transparent" shadow={false}>
          {/* Show edit or restore button based on url */}
          {currentPath === `/job/edit/${jobId}` ? (
            <Typography variant="h3" color="blue-gray">
              Edit Job
            </Typography>
          ) : (
            <Typography variant="h3" color="blue-gray">
              Restore Job
            </Typography>
          )}

          <form
            className="mt-8 mb-2 w-5/6 max-w-screen-lg mx-auto text-lg"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <div className="mb-1 flex flex-col gap-6 w-100 text-lg">
              
              {/* Job title */}
              <Typography
                variant="h6"
                color="blue-gray"
                className="-mb-3 text-lg "
              >
                Title
              </Typography>
              <Input
                size="lg"
                className="text-xl bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
                defaultValue={jobData.title}
                style={{ backgroundColor: 'white' }}
                required
                {...register('title')}
              />

              {/* Expiration date */}
              <Typography
                variant="h6"
                color="blue-gray"
                className="-mb-3  text-lg"
              >
                Expiration Date <br></br> (At least 10 days after created date)
              </Typography>
              <input
                type="date"
                id="datepicker"
                name="datepicker"
                min={minDate}
                // defaultValue={jobData.createdAt}
                defaultValue={jobData.closedDate.split('T')[0]}
                required
                {...register('closedDate')}
              />

              {/* Job field */}
              <Typography
                variant="h6"
                color="blue-gray"
                className="-mb-3 text-lg"
              >
                Field
              </Typography>
              <select
                name="jobField"
                id="jobField"
                className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                required
                {...register('field')}
              >
                <option value="" disabled hidden>
                  --Select an option--
                </option>
                {jobFields.map((field) => (
                  <option
                    key={field}
                    value={field}
                    selected={field === jobData.field ? true : false}
                  >
                    {field}
                  </option>
                ))}
              </select>

              {/* Salary */}
              <Typography
                variant="h6"
                color="blue-gray"
                className="-mb-3 text-lg"
              >
                Salary
              </Typography>
              <Input
                size="lg"
                className="text-xl bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
                defaultValue={jobData.salary}
                style={{ backgroundColor: 'white' }}
                required
                {...register('salary')}
              />

              {/* Location */}
              <Typography
                variant="h6"
                color="blue-gray"
                className="-mb-3 text-lg"
              >
                Location
              </Typography>
              <Input
                size="lg"
                className="text-xl bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
                defaultValue={jobData.location}
                style={{ backgroundColor: 'white' }}
                required
                {...register('location')}
              />

              {/* Job position */}
              <Typography
                variant="h6"
                color="blue-gray"
                className="-mb-3 text-lg"
              >
                Job Position
              </Typography>
              <Input
                size="lg"
                className="text-xl bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
                defaultValue={jobData.position}
                style={{ backgroundColor: 'white' }}
                required
                {...register('position')}
              />

              {/* Job description */}
              <Typography
                variant="h6"
                color="blue-gray"
                className="-mb-3 text-lg"
              >
                Job Description
              </Typography>
              <textarea
                rows={8}
                className="text-xl bg-white h-full min-h-[100px] w-full resize-none rounded-[7px] border
             px-3 py-2  transition-all !border-t-blue-gray-200 focus:!border-t-gray-900"
                placeholder=" "
                {...register('description')}
                defaultValue={jobData.description}
                style={{ backgroundColor: 'white' }}
              ></textarea>
            </div>

            {/* Submit button */}
            <Button
              className="btn mt-10 mx-auto text-black text-base font-medium w-1/3 bg-[#ffce00] hover:bg-[#ffce00]"
              type="submit"
            >
              Submit
            </Button>
          </form>

          {/* Show success dialog */}
          <Dialog
            open={open}
            size="xs"
            handler={openConfirmDialog}
            className="w-44"
          >
            {currentPath === `/job/edit/${jobId}` ? (
              <DialogBody className="font-medium text-lg text-center ">
                Job updated successfully!
              </DialogBody>
            ) : (
              <DialogBody className="font-medium text-lg text-center ">
                Job restored successfully!
              </DialogBody>
            )}
            <DialogFooter className="flex justify-center">
              <Button
                className="bg-[#ffce00] text-black font-medium"
                color="black"
                onClick={backToHomePage}
              >
                <span>OK</span>
              </Button>
            </DialogFooter>
          </Dialog>
        </Card>
      )}
    </>
  );
};

export default EditJob;
