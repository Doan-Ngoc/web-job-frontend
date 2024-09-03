import { useEffect, useState } from "react";
import CustomDate from "../../utils/dateUtils";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { request } from '../../utils/request';
import * as companyApi from '../../api/company';
import { useParams } from "react-router-dom";
import toast from 'react-hot-toast';
import Axios from "axios";
import {
  Card,
  Input,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const TABLE_HEAD = ["Applicant Name", "Applied Date", "Status", "Download CV", "Action"];

function ManageApplicationsForCompany() {
  const { accessToken, accountId } = useAuth();
  const { jobId } = useParams();
  const [applicationList, setApplicationList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [newStatus, setNewStatus] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchApplicationList();
  }, [refresh]);

  const fetchApplicationList = async () => {
    try {
      const response = await request.get(`job/applications/${jobId}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
      setApplicationList(response.data);
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error);
      const errorMessage = error.response?.data?.message || 'Something went wrong! Please try again later.';
      toast.error(errorMessage);
    }
  };

  const handleChangingStatus = async (profileId, status) => {
    try {
      setOpen(!open);
      const response = await companyApi.changeApplicationStatus(accessToken, profileId, jobId, status)
      toast.success('Application status updated successfully!');
      setRefresh(!refresh)
      }
    catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  //Open confirm dialog when clicking remove button
  const [open, setOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState("");

  const openConfirmDialog = (status, profileId) => {
    setNewStatus(status);
    setSelectedProfileId(profileId)
    setOpen(!open);
  };

  //Cancel application
  // const handleCancelApplication = async (jobId) => {
  //   try {
  //     const cancelApplication = await applicantApi.cancelApllication(accessToken, jobId)
  //     setOpen(!open);
  //     toast.success('Your application has been canceled!');
  //     setRefresh(true);
  //   } catch (error) {
  //     setOpen(!open);
  //     console.error("Canceling application failed", error.message);
  //     const errorMessage = error.response?.data?.message || 'Something went wrong! Please try again later.';
  //     toast.error(errorMessage);
  //   }
  // };

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (applicationList.length <= 0) {
    return <div>There is no application for this job yet.</div>
  }

  return (
    <>
      <table className="w-full bg-white py-auto rounded-lg min-w-max table-auto ">
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
          {applicationList.map(
            ({ _id, profileId, accountId, name, status, appliedDate, applicantCV }, index) => {
              const isLast = index === applicationList.length - 1;
              const classes = isLast
                ? "py-4 "
                : "py-4 border-b border-blue-gray-50";

              return (
                <tr key={_id}>
                  <td className={classes}>
                    <div className="text-center">
                      <Link to={`/profile/applicant/${accountId}`}>
                        <div className="text-center">
                          <Typography
                            color="blue-gray"
                            className="font-semibold text-center w-fit m-auto"
                          >
                            {name}
                          </Typography>
                        </div>
                      </Link>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="text-center">
                      <Typography color="blue-gray" className="font-normal">
                        {new CustomDate(appliedDate).formatDate()}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max m-auto">
                      <Chip
                        variant="ghost"
                        value={status}
                        color={
                          status === "pending"
                            ? "green"
                            : status === "rejected"
                              ? "gray"
                              : "red"
                        }
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="m-auto">
                    <a href={`${request.defaults.baseURL}/applicant/download/${applicantCV}`} download>
                          <Tooltip content="Download">
                            <IconButton variant="text">
                            <i className="fa fa-file-download text-base"></i>
                            </IconButton>
                          </Tooltip>
                    </a>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="text-left"> 
                    {(status === "pending" || status === "rejected") && (
                      <Tooltip content="Accept">
                      <IconButton
                        variant="text"
                        onClick={() => openConfirmDialog("accepted", profileId)}
                      >
                        <i className="fa fa-check text-base"></i>
                      </IconButton>
                    </Tooltip>
                    )}
                    {(status === "pending" || status === "accepted") && (
                      <Tooltip content="Reject">
                      <IconButton
                        variant="text"
                        onClick={() => openConfirmDialog("rejected", profileId)}
                      >
                        <i className="fa fa-times text-base"></i>
                      </IconButton>
                    </Tooltip>
                    )}
                    {(status === "accepted" || status === "rejected") && (
                          <Tooltip content="Restore">
                            <IconButton variant="text"
                            onClick={() => openConfirmDialog("pending", profileId)}>
                            <i className="fa fa-redo text-base"></i>
                            </IconButton>
                          </Tooltip>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>


      <Dialog
        open={open}
        handler={openConfirmDialog}
        size="xs"
        className="w-44"
      >
         <DialogBody className="font-medium text-lg text-center ">
           Are you sure you want to change the status of this application?
         </DialogBody>
         <DialogFooter className="flex justify-center">
            <Button
            className="bg-[#ffce00] text-black font-medium  mr-1"
            onClick={() => handleChangingStatus(selectedProfileId, newStatus)}
          >
            <span>Confirm</span>
          </Button>
          <Button
            variant="text"
            onClick={() => setOpen(!open)}
            className="mr-1 text-black "
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog> 

    </>
  );
}
export default ManageApplicationsForCompany;

{/* <td className={classes}>
                    <div className="text-left"> */}


{/* {status === "active" && (
                        <Link to={`/job/edit/${_id}`}>
                          <Tooltip content="Edit">
                            <IconButton variant="text">
                              <i className="fa fa-pen text-base"></i>
                            </IconButton>
                          </Tooltip>
                        </Link>
                      )}
                      {(status === "expired" || status === "removed") && (
                        <Link to={`/job/restore/${_id}`}>
                          <Tooltip content="Restore">
                            <IconButton variant="text">
                              <i className="fa fa-redo text-base"></i>
                            </IconButton>
                          </Tooltip>
                        </Link>
                      )} */}
{/* {(status === "active" || status === "expired") && ( */ }


{/* <Tooltip content="Cancel">
                          <IconButton
                            variant="text"
                            onClick={() => openConfirmDialog(jobId)}
                          >
                            <i className="fa fa-trash text-base"></i>
                          </IconButton>
                        </Tooltip>
                      {/* )} */}
{/* </div>
                  </td>
                </tr>
                */}