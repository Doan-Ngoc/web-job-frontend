import { useContext } from "react";
import "./JobList.css";
import JobItem from "../JobItem/JobItem";

const JobList = ({ allJobs }) => {
  return (
    <div className="jobList grow flex flex-col gap-8">
      {allJobs &&
        allJobs.map((jobData) => (
          <JobItem jobData={jobData} key={jobData._id} />
        ))}
    </div>
  );
};

export default JobList;
