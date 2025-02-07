import { useForm } from 'react-hook-form';
import { useJobContext } from '../../contexts/JobContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import * as authApi from '../../api/authenticate';
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
  const { jobFields } = useJobContext();
  //Get the access token
  const { accessToken } = useAuth();
  //Set states
  const companyData = {
    accountId: null,
    name: '',
    logo: '',
  };
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

  //Submit form
  const handleFormSubmit = async (data) => {
    try {
      //Account authentication & Fetch company profile's data
      const response = await authApi.verifyAccessToken(accessToken);
      if (response.user.role === 'company') {
        companyData.accountId = response.user.id;
      }
      const companyProfile = await companyApi.getCompanyProfile(
        response.user.id,
      );
      if (companyProfile.data) {
        (companyData.name = companyProfile.data.name),
          (companyData.logo = companyProfile.data.logo);
      }
      //Submit job data
      const newJobData = {
        title: data.title,
        company: companyData.name,
        logo: companyData.logo,
        createdAt: new Date().toISOString().split('T')[0],
        closedDate: data.closedDate,
        createdBy: companyData.accountId,
        salary: data.salary,
        location: data.location,
        field: data.field,
        position: data.position,
        description: data.description,
        status: 'active',
        applicants: [],
      };
      const res = await request.post('/job/new', newJobData);
      openConfirmDialog();
    } catch (error) {
      console.error('Creating job failed:', error.message);
      const errorMessage =
        error.response?.data?.message || ' Oops something went wrong! ';
      toast.error(errorMessage);
    }
  };
  return (
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
  );
};

export default CreateJobNews;
