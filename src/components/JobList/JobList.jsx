import React from "react";
import "./JobList.css";
import JobItem from "../JobItem/JobItem";

const JobList = () => {
  return (
    <div className="jobList">
      <JobItem />
      <JobItem />
      <JobItem />
    </div>
  );
};

export default JobList;
