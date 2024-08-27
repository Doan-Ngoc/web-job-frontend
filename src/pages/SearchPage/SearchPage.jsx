import JobList from "../../components/JobList/JobList";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const { state } = useLocation();
  const allJobs = state.searchResult;

  return (
    <div className="homepage grow flex flex-col gap-8 bg-[#e7e8ff]">
      <SearchBar />
      <JobList allJobs={allJobs} />
    </div>
  );
};

export default SearchPage;
