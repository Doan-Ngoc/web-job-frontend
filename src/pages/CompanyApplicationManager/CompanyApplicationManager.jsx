import { useEffect, useState } from 'react';
import CustomDate from '../../utils/dateUtils';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
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

const TABLE_HEAD = ['Applicant', 'Applied Date', 'Status', ''];

function CompanyApplicationManager() {
  const [jobApplicationList, setJobApplicationList] = useState([]);
  const [selectedApplicationId, setSelectedApplicationId] = useState('');
  const { jobId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetchCreatedJobs();
  }, []);

  //Fetch application data
  const fetchCreatedJobs = async () => {
    try {
      const response = await Axios.get(
        `http://localhost:3000/company/applications/${jobId}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const responseData = response.data;
      console.log('Data', responseData);
      setJobApplicationList(responseData);
    } catch (error) {
      console.error('Error fetching job data:', error);
    }
  };

  //Open confirm dialog when clicking accept button
  const [agreeDialog, setAgreeDialog] = useState(false);
  const openAgreeDialog = (_id) => {
    console.log('id1', _id);
    setSelectedApplicationId(_id);
    setAgreeDialog(!agreeDialog);
  };

  //Open confirm dialog when clicking decline button
  const [declineDialog, setDeclineDialog] = useState(false);
  const openDeclineDialog = (_id) => {
    console.log('id1', _id);
    setSelectedApplicationId(_id);
    setDeclineDialog(!declineDialog);
  };

  //Decline application
  const handleDeclineApplication = async (applicationId) => {
    try {
      await Axios.post(
        `http://localhost:3000/company/decline/${jobId}/${applicationId}`,
      );
      setDeclineDialog(!declineDialog);
    } catch (error) {
      console.error('Error declining application:', error);
    }
  };

  return (
    <>
      <Typography variant="h3" color="blue-gray">
        Job Applications
      </Typography>
      <table className="w-full mt-10 bg-white py-auto rounded-lg min-w-max table-auto ">
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
        <tbody>
          {jobApplicationList.map(({ application, applicantData }, index) => {
            const isLast = index === jobApplicationList.length - 1;
            const classes = isLast
              ? 'py-4 '
              : 'py-4 border-b border-blue-gray-50';

            return (
              <tr key={application._id}>
                <td className={classes}>
                  <div className="text-center">
                    {/* <Link to={`/job/${_id}`}> */}
                    <Typography
                      color="blue-gray"
                      className="font-semibold text-center w-fit m-auto"
                    >
                      {applicantData.name}
                    </Typography>
                    {/* </Link> */}
                  </div>
                </td>
                <td className={classes}>
                  <div className="text-center">
                    <Typography color="blue-gray" className="font-normal">
                      {application.applicationDate}
                    </Typography>
                  </div>
                </td>
                <td className={classes}>
                  <div className="w-max m-auto">
                    <Chip
                      variant="ghost"
                      value={application.status}
                      color={
                        application.status === 'sent'
                          ? 'gray'
                          : application.status === 'accepted'
                          ? 'green'
                          : 'green'
                      }
                    />
                  </div>
                </td>
                <td className={classes}>
                  <Tooltip content="Accept">
                    <IconButton
                      variant="text"
                      onClick={() => openAgreeDialog(application._id)}
                    >
                      <ion-icon
                        name="checkmark"
                        style={{ color: 'green' }}
                        size="large"
                      ></ion-icon>
                    </IconButton>
                  </Tooltip>
                  {/* <Link to={`/job/edit/`}> */}
                  <Tooltip content="Decline">
                    <IconButton
                      variant="text"
                      onClick={() => openDeclineDialog(application._id)}
                    >
                      <ion-icon
                        name="close"
                        style={{ color: 'red' }}
                        size="large"
                      ></ion-icon>
                    </IconButton>
                  </Tooltip>
                  {/* </Link> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Agree Dialog */}
      <Dialog
        open={agreeDialog}
        handler={openAgreeDialog}
        size="xs"
        className="w-44"
      >
        <DialogBody className="font-medium text-lg text-center ">
          Accept this job application?
        </DialogBody>
        <DialogFooter className="flex justify-center">
          <Button
            className="bg-[#ffce00] text-black font-medium  mr-1"
            color="black"
            // onClick={() => handleRemoveJob(selectedJobId)}
          >
            <span className="font-semibold">Yes</span>
          </Button>
          <Button
            variant="text"
            color="black"
            onClick={() => setAgreeDialog(!agreeDialog)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Decline Dialog */}
      <Dialog
        open={declineDialog}
        handler={openDeclineDialog}
        size="xs"
        className="w-44"
      >
        <DialogBody className="font-medium text-lg text-center ">
          Decline this job application?
        </DialogBody>
        <DialogFooter className="flex justify-center">
          <Button
            className="bg-[#ffce00] text-black font-medium  mr-1"
            color="black"
            onClick={() => handleDeclineApplication(selectedApplicationId)}
          >
            <span className="font-semibold">Yes</span>
          </Button>
          <Button
            variant="text"
            color="black"
            onClick={() => setDeclineDialog(!declineDialog)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
export default CompanyApplicationManager;
