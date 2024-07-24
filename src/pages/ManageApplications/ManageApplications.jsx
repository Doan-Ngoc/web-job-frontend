import { useEffect, useState } from "react";
import CustomDate from "../../utils/dateUtils";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { request } from '../../utils/request';
import * as authorizeApi from '../../api/authorize';
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

const TABLE_HEAD = ["Job Title", "Company", "Applied Date", "Status", ""];

function ManageApplications() {
  const {accessToken, accountId} = useAuth();
  const [appliedJobList, setAppliedJobList] = useState([]);
//   const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchAppliedJobs();
  }, []);


  const fetchAppliedJobs = async () => {
    try {
      const response = await request.get(`/job/applied/${accountId}`);
      const appliedJobData = response.data;
      console.log('abc', appliedJobData)
      //Sort data by created date in descending order
    //   appliedJobData.sort(
    //     (a, b) => new Date(b.appliedDate) - new Date(a.appliedDate)
    //   );
      setAppliedJobList(appliedJobData);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };

//   //Open confirm dialog when clicking remove button
//   const [open, setOpen] = useState(false);
//   const [selectedJobId, setSelectedJobId] = useState("");
//   const openConfirmDialog = (_id) => {
//     setSelectedJobId(_id);
//     setOpen(!open);
//   };
//   const navigate = useNavigate();
//   const backToHomePage = () => {
//     navigate("/");
//   };
//   //Remove job
//   const handleRemoveJob = async (_id) => {
//     try {
//       const validateAccount = await authorizeApi.jobCreatorAuthorize(accessToken, _id)
//       if (validateAccount) {
//       await Axios.post(`http://localhost:3000/job/remove/${_id}`);
//       setOpen(!open);
//       setRefresh(true)
//       }
//       else {
//         toast.error("Oops something went wrong");
//       }
//     } catch (error) {
//       console.error("Error removing job:", error);
//     }
//   };

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
           {appliedJobList.map(
            ({ _id, jobTitle, company, status, appliedDate }, index) => {
              const isLast = index === appliedJobList.length - 1;
              const classes = isLast
                ? "py-4 "
                : "py-4 border-b border-blue-gray-50";

              return (
                <tr key={_id}>
                  <td className={classes}>
                    <div className="text-center">
                      {/* <Link to={`/job/${_id}`}> */}
                      <div className="text-center">
                        <Typography
                          color="blue-gray"
                          className="font-semibold text-center w-fit m-auto"
                        >
                          {jobTitle}
                        </Typography>
                        </div>
                      {/* </Link> */}
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="text-center">
                      {/* <Link to={`/job/${_id}`}> */}
                      <div className="text-center">
                        <Typography
                          color="blue-gray"
                          className="font-semibold text-center w-fit m-auto"
                        >
                          {company}
                        </Typography>
                        </div>
                      {/* </Link> */}
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
                    <div className="text-left">
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
                      {/* {(status === "active" || status === "expired") && ( */}
                        <Tooltip content="Cancel">
                          <IconButton
                            variant="text"
                            onClick={() => openConfirmDialog(_id)}
                          >
                            <i className="fa fa-trash text-base"></i>
                          </IconButton>
                        </Tooltip>
                      {/* )} */}
                    </div>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>

{/* //       <Dialog
//         open={open}
//         handler={openConfirmDialog}
//         size="xs"
//         className="w-44"
//       >
//         <DialogBody className="font-medium text-lg text-center ">
//           Are you sure you want to remove this job?
//         </DialogBody>
//         <DialogFooter className="flex justify-center">
//           <Button
//             className="bg-[#ffce00] text-black font-medium  mr-1"
//             color="black"
//             onClick={() => handleRemoveJob(selectedJobId)}
//           >
//             <span>Confirm</span>
//           </Button>
//           <Button
//             variant="text"
//             color="black"
//             onClick={() => setOpen(!open)}
//             className="mr-1"
//           >
//             <span>Cancel</span>
//           </Button>
//         </DialogFooter>
//       </Dialog> */}
    </>
  );
}
export default ManageApplications;
