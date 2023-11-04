import "./JobItem.css";
import CustomDate from "../../utils/dateUtils";
import { Link } from "react-router-dom";

const JobItem = (props) => {
  const { jobData } = props;
  return (
    <article className="h-36 flex gap-12 py-4 px-10 rounded-xl shadow-md bg-[#fff] text-lg">
      <div className="w-24 h-24 bg-white avatar">
        <div className="rounded-lg">
          <img src={jobData.logo} alt="Avatar" />
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-1 text-left">
        <p className="text-xl font-bold">{jobData.company}</p>
        <Link to={`/job/${jobData._id}`}>
          <p className="font-semibold">{jobData.title}</p>
        </Link>
        <p className="opacity-50">{jobData.location}</p>
      </div>
      <div className="flex-1 text-left flex flex-col gap-1 py-auto py-3">
        <p>Salary: {jobData.salary}</p>
        <p>Valid Until: {new CustomDate(jobData.closedDate).formatDate()}</p>
      </div>
    </article>
  );
};

export default JobItem;
