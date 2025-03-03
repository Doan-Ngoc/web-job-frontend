import { useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { useJob } from '../../hooks/useJob';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import * as companyApi from '../../api/company';
import { request } from '../../utils/request';
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

const CreateJobNews = () => {
  //Get the job field list
  const { jobFields } = useJob();
  //Get the access token
  const { accountId } = useAuth();
  //Set states
  const [companyData, setCompanyData] = useState({accountId: '', name: '', logo: '' });
  const [isLoading, setIsLoading] = useState()
  // Calculate the minimum expiration date (10 days from today)
  const today = new Date();
  today.setDate(today.getDate() + 10);
  const minDate = today.toISOString().split('T')[0];
  //Use React Hook Form
  const { register, handleSubmit } = useForm();
  //Open dialog when click button
  const [open, setOpen] = useState(false);
  const openConfirmDialog = () => setOpen(!open);
  const navigate = useNavigate();
  //Fetch company profile's data
  useEffect(() => {
    const getCompanyProfile = async() => {
      try {
      setIsLoading(true)
      const companyProfile = await companyApi.getCompanyProfile(accountId);
      if (companyProfile.data) {
        setCompanyData({
          accountId: accountId,
          name: companyProfile.data.name,
          logo: companyProfile.data.logo
        });
        setIsLoading(false)
      }
      else {
        navigate('/profile/company/create')
      }
    }catch {
      console.error('Error fetching profile data')
      navigate('/error/500')
    }
  } 
    getCompanyProfile();
  }, [accountId, navigate])

  //Submit form
  const handleFormSubmit = async (data) => {
    try {
      //Submit job data
      const newJobData = {
        title: data.title,
        company: companyData.name,
        logo: companyData.logo,
        createdAt: new Date().toISOString().split('T')[0],
        closedDate: data.closedDate,
        createdBy: accountId,
        salary: data.salary,
        location: data.location,
        field: data.field,
        position: data.position,
        description: data.description,
        status: 'active',
        applicants: [],
      };
      await request.post('/job/new', newJobData);
      openConfirmDialog();
    } catch (error) {
      console.error('Creating job failed:', error.message);
      const errorMessage =
        error.response?.data?.message || ' Oops something went wrong! ';
      toast.error(errorMessage);
    }
  };

  return (
    <>
    {!isLoading && (
    <Card color="transparent" shadow={false}>
      <Typography variant="h3" color="blue-gray">
        Create New Job
      </Typography>
      <form
        className="mt-8 mb-2 w-5/6 max-w-screen-lg mx-auto text-lg"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="mb-1 flex flex-col gap-6 w-100 text-lg">

          {/* Job Title */}
          <Typography variant="h6" color="blue-gray" className="-mb-3 text-lg ">
            Title
          </Typography>
          <Input
            size="lg"
            className="text-xl bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
            required
            {...register('title')}
          />

          {/* Expiration Date */}
          <Typography variant="h6" color="blue-gray" className="-mb-3  text-lg">
            Expiration Date <br></br> (At least 10 days after created date)
          </Typography>
          <input
            type="date"
            id="datepicker"
            name="datepicker"
            min={minDate}
            required
            {...register('closedDate')}
          />

          {/* Field of job */}
          <Typography variant="h6" color="blue-gray" className="-mb-3 text-lg">
            Field
          </Typography>
          <select
            name="jobField"
            id="jobField"
            className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            required
            {...register('field')}
          >
            <option value="" selected disabled hidden>
              --Select an option--
            </option>
            {jobFields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>

          {/* Salary */}
          <Typography variant="h6" color="blue-gray" className="-mb-3 text-lg">
            Salary
          </Typography>
          <Input
            size="lg"
            className="text-xl bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
            required
            {...register('salary')}
          />

          {/* Location */}
          <Typography variant="h6" color="blue-gray" className="-mb-3 text-lg">
            Location
          </Typography>
          <Input
            size="lg"
            className="text-xl bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
            required
            {...register('location')}
          />

          {/* Job position */}
          <Typography variant="h6" color="blue-gray" className="-mb-3 text-lg">
            Job Position
          </Typography>
          <Input
            size="lg"
            className="text-xl bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
            required
            {...register('position')}
          />

          {/* Job description */}
          <Typography variant="h6" color="blue-gray" className="-mb-3 text-lg">
            Job Description
          </Typography>
          <textarea
            rows={8}
            className="text-xl bg-white h-full min-h-[100px] w-full resize-none rounded-[7px] border
             px-3 py-2  transition-all !border-t-blue-gray-200 focus:!border-t-gray-900"
            placeholder=" "
            {...register('description')}
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

      {/* Success Dialog */}
      <Dialog
        open={open}
        size="xs"
        handler={openConfirmDialog}
        className="w-44"
      >
        <DialogBody className="font-medium text-lg text-center ">
          Job created successfully!
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
    </Card>
    )}
    </>
  
  );
};

export default CreateJobNews;
