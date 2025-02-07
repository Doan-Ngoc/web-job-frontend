import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { request } from '../../utils/request';
import { useJobContext } from '../../contexts/JobContext';
import JobList from '../../components/JobList/JobList';
import SearchBar from '../../components/SearchBar/SearchBar';
import Loading from '../../components/Loading';

const Homepage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [allJobs, setAllJobs] = useState([]);
  //Pagination variables
  const { currentPage, setCurrentPage } = useJobContext();
  const [totalPages, setTotalPages] = useState(1);
  const limitPerPage = 5;

  useEffect(() => {
    fetchJobs();
  }, [currentPage]);

  const fetchJobs = async () => {
    try {
      //Fetch jobs
      const response = await request.get(
        `/job?page=${currentPage || 1}&limit=${limitPerPage}`,
      );
      const { docs, totalPages } = response.data;
      setAllJobs(docs);
      setTotalPages(totalPages);
      // Update the URL when changing the page
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('page', currentPage.toString());
      navigate(`${location.pathname}?${searchParams.toString()}`);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching job data:', error);
      navigate('/error/500');
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="homepage grow flex flex-col gap-8 bg-[#e7e8ff]">
      <SearchBar />
      <JobList allJobs={allJobs} />
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
