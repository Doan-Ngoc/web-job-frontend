import CustomDate from '../../utils/dateUtils';
import { request } from '../../utils/request';
import { Link } from 'react-router-dom';

const JobItem = (props) => {
  const { jobData } = props;
  return (
    <article className="h-36 flex gap-12 py-4 px-10 rounded-xl shadow-md bg-[#fff] text-lg">
      <div className="w-24 h-24 bg-white avatar">
        <div className="w-24 h-24 rounded-lg">
          <img
            src={`${request.defaults.baseURL}/uploads/${jobData.logo}`}
            alt="Company Logo"
            className="w-44 h-44 rounded-full object-cover"
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-1 text-left">
        <Link to={`/job/${jobData._id}`}>
          <p className="text-xl font-bold">{jobData.title}</p>
        </Link>
        <Link to={`/profile/company/${jobData.createdBy}`}>
          <p className="font-semibold">{jobData.company}</p>
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
