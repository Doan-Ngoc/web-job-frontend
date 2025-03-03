import { useEffect, useState } from 'react';
import CustomDate from '../../utils/dateUtils';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { request } from '../../utils/request';
import * as applicantApi from '../../api/applicant';
import toast from 'react-hot-toast';
import {
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';

const TABLE_HEAD = ['Job Title', 'Company', 'Applied Date', 'Status', ''];

function ManageApplicationsForApplicant() {
  const { accessToken, accountId } = useAuth();
  const [appliedJobList, setAppliedJobList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAppliedJobs();
  }, [refresh]);

  const fetchAppliedJobs = async () => {
    try {
      const response = await request.get(`/job/applied/${accountId}`);
      const appliedJobData = response.data;
      setAppliedJobList(appliedJobData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching job data:', error);
    }
  };

  //Open confirm dialog when clicking remove button
  const [open, setOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState('');
  const openConfirmDialog = (jobId) => {
    setSelectedJobId(jobId);
    setOpen(!open);
  };

  //Cancel application
  const handleCancelApplication = async (jobId) => {
    try {
      const cancelApplication = await applicantApi.cancelApplication(
        accessToken,
        jobId,
      );
      setOpen(!open);
      toast.success('Your application has been canceled!');
      setRefresh(true);
    } catch (error) {
      setOpen(!open);
      console.error('Canceling application failed', error.message);
      const errorMessage =
        error.response?.data?.message ||
        'Something went wrong! Please try again later.';
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (appliedJobList.length <= 0) {
    return <div>You haven't applied to any job.</div>;
  }

  return (
    <>
      <table className="w-full bg-white py-auto rounded-lg min-w-max table-auto ">
        {/* Table head */}
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-y border-blue-gray-100 bg-indigo-100 py-4 "
              >
                <Typography
                  color="blue-gray"
                  className="leading-none opacity-70 font-bold "
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>

        {/* Table body */}
        <tbody>
          {appliedJobList.map(
            ({ _id, jobId, jobTitle, company, status, appliedDate }, index) => {
              const isLast = index === appliedJobList.length - 1;
              const classes = isLast
                ? 'py-4 '
                : 'py-4 border-b border-blue-gray-50';

              return (
                <tr key={_id}>
                  <td className={classes}>
                    {/* Job details */}
                    <div className="text-center">
                      <Link to={`/job/${jobId}`}>
                        <div className="text-center">
                          <Typography
                            color="blue-gray"
                            className="font-semibold text-center w-fit m-auto"
                          >
                            {jobTitle}
                          </Typography>
                        </div>
                      </Link>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="text-center">
                      <div className="text-center">
                        <Typography
                          color="blue-gray"
                          className="font-semibold text-center w-fit m-auto"
                        >
                          {company}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="text-center">
                      <Typography color="blue-gray" className="font-normal">
                        {new CustomDate(appliedDate).formatDate()}
                      </Typography>
                    </div>
                  </td>

                  {/* Application status */}
                  <td className={classes}>
                    <div className="w-max m-auto">
                      <Chip
                        variant="ghost"
                        value={status}
                        color={
                          status === 'pending'
                            ? 'blue'
                            : status === 'rejected'
                            ? 'gray'
                            : 'green'
                        }
                      />
                    </div>
                  </td>

                  {/* Button to open confirm dialog*/}
                  <td className={classes}>
                    <div className="text-left">
                      <Tooltip content="Cancel">
                        <IconButton
                          variant="text"
                          onClick={() => openConfirmDialog(jobId)}
                        >
                          <i className="fa fa-trash text-base"></i>
                        </IconButton>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              );
            },
          )}
        </tbody>
      </table>

      {/* Confirm cancellation dialog */}
      <Dialog
        open={open}
        handler={openConfirmDialog}
        size="xs"
        className="w-44"
      >
        <DialogBody className="font-medium text-lg text-center ">
          Are you sure you want to cancel the application for this job?
        </DialogBody>
        <DialogFooter className="flex justify-center">
          <Button
            className="bg-[#ffce00] text-black font-medium  mr-1"
            color="black"
            onClick={() => handleCancelApplication(selectedJobId)}
          >
            <span>Confirm</span>
          </Button>
          <Button
            variant="text"
            color="black"
            onClick={() => setOpen(!open)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default ManageApplicationsForApplicant;
