import React from "react";
import JobList from "../../components/JobList/JobList";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./homepage.css";

const Homepage = () => {
  return (
    <div className="homepage">
      <SearchBar />
      <JobList />
    </div>
  );
};

export default Homepage;
