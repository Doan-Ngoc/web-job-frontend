import CustomDate from '../../utils/dateUtils';
import { Link } from 'react-router-dom';
import { request } from '../../utils/request';

const JobItem = (props) => {
  const { jobData } = props;
  return (
    <article className="h-36 flex gap-12 py-4 px-10 rounded-xl shadow-md bg-[#fff] text-lg">
      <div className="w-24 h-24 bg-white avatar">
        <div className="w-24 h-24 rounded-lg">
        <img src={`${request.defaults.baseURL}/uploads/${jobData.logo}`} alt="Company Logo" className="w-44 h-44 rounded-full object-cover" />
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-1 text-left">
      <Link to={`/job/${jobData._id}`}>
        <p className="text-xl font-bold">{jobData.title}</p>
        </Link>
        <div className="w-100 flex">
          <div className="w-1/2 ">
        <Link to={`/profile/company/${jobData.createdBy}`}>
          <p className="font-semibold">{jobData.company}</p>
          </Link>
        <p className="opacity-50">{jobData.location}</p>
        </div>
        <div className="w-1/2 text-lgs flex flex-col gap-1">
        <p>Salary: {jobData.salary}</p>
        <p>Valid Until: {new CustomDate(jobData.closedDate).formatDate()}</p>
        </div>
      </div>
      </div>
    </article>
  );
};

export default JobItem;
