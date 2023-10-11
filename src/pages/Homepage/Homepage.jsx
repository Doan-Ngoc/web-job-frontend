import "./homepage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import JobList from "../../components/JobList/JobList";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useNavigate, useLocation } from "react-router-dom";

const Homepage = (props) => {
  const { currentPage, setCurrentPage } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const [allJobs, setAllJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const limitPerPage = 5;

  useEffect(() => {
    fetchJobs();
  }, [currentPage]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/job?page=${currentPage}&limit=${limitPerPage}`
      );
      const { docs, totalPages } = response.data;
      setAllJobs(docs);
      setTotalPages(totalPages);

      // Update the URL when changing the page
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("page", currentPage.toString());
      navigate(`${location.pathname}?${searchParams.toString()}`);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };

  return (
    <div className="homepage grow flex flex-col gap-8 bg-[#e7e8ff]">
      <SearchBar />
      <JobList allJobs={allJobs} />
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
