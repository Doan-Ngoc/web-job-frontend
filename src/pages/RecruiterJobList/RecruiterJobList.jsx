import {
  Typography,
  Chip,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import CustomDate from "../../utils/dateUtils";
import { Link } from "react-router-dom";

const TABLE_HEAD = ["Job Title", "Created Date", "Status", ""];

function RecruiterJobList() {
  const [companyCreatedJobs, setCompanyCreatedJobs] = useState([]);
  useEffect(() => {
    fetchCreatedJobs();
  }, []);

  //Fetch job data
  const fetchCreatedJobs = async () => {
    try {
      const response = await fetch(`http://localhost:3000/job/created`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: "Google",
        }),
      });
      const data = await response.json();
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); //Sort data by created date in descending order
      setCompanyCreatedJobs(data);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };

  return (
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
        {companyCreatedJobs.map(({ _id, title, createdAt, status }, index) => {
          const isLast = index === companyCreatedJobs.length - 1;
          const classes = isLast
            ? "py-4 "
            : "py-4 border-b border-blue-gray-50";

          return (
            <tr key={_id}>
              <td className={classes}>
                <div className="text-center">
                  <Link to={`/job/${_id}`}>
                    <Typography
                      color="blue-gray"
                      className="font-semibold text-center w-fit m-auto"
                    >
                      {title}
                    </Typography>
                  </Link>
                </div>
              </td>
              <td className={classes}>
                <div className="text-center">
                  <Typography color="blue-gray" className="font-normal">
                    {new CustomDate(createdAt).formatDate()}
                  </Typography>
                </div>
              </td>
              <td className={classes}>
                <div className="w-max m-auto">
                  <Chip
                    variant="ghost"
                    value={status}
                    color={
                      status === "active"
                        ? "green"
                        : status === "expired"
                        ? "gray"
                        : "red"
                    }
                  />
                </div>
              </td>
              <td className={classes}>
                <div className="text-left">
                  {status === "active" && (
                    <Tooltip content="Edit">
                      <IconButton variant="text">
                        <i className="fa fa-pen text-base"></i>
                      </IconButton>
                    </Tooltip>
                  )}
                  {(status === "expired" || status === "removed") && (
                    <Tooltip content="Re-open">
                      <IconButton variant="text">
                        <i className="fa fa-redo text-base"></i>
                      </IconButton>
                    </Tooltip>
                  )}
                  {(status === "active" || status === "expired") && (
                    <Tooltip content="Remove">
                      <IconButton variant="text">
                        <i className="fa fa-trash text-base"></i>
                      </IconButton>
                    </Tooltip>
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    // </Card>
  );
}
export default RecruiterJobList;

// import React from "react";
// import { useEffect, useState } from "react";

// const RecruiterJobList = () => {
//   const [companyCreatedJobs, setCompanyCreatedJobs] = useState([]);
//   useEffect(() => {
//     fetchCreatedJobs();
//   }, []);

//   const fetchCreatedJobs = async () => {
//     try {
//       const response = await fetch(`http://localhost:3000/job/created`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           company: "Google",
//         }),
//       });
//       const data = await response.json();
//       setCompanyCreatedJobs(data);
//       console.log(companyCreatedJobs);
//     } catch (error) {
//       console.error("Error fetching job data:", error);
//     }
//   };

//   return (
//     <div>
//       <p>Value: {companyCreatedJobs[0]}</p>
//     </div>
//   );
// };

// export default RecruiterJobList;
