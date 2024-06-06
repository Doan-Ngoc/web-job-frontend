import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";

const JobContext = createContext();

export const useJobContext = () => {
    return useContext(JobContext);
  };
  
export const JobProvider = ({ children }) => {
  const [jobFields, setJobFields] = useState([]);

  useEffect(() => {
    // Fetch job fields when the context is initialized
    axios
      .get("http://localhost:3000/job/api/fields")
      .then((response) => {
        setJobFields(response.data);
      })
      .catch((error) => {
        console.error("Error fetching job fields:", error);
      });
  }, []);

  return (
    <JobContext.Provider value={{ jobFields}}>
      {children}
    </JobContext.Provider>
  );
};
