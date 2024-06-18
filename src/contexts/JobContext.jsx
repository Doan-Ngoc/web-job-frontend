import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { request } from '../utils/request';
import { useNavigate} from "react-router-dom";

const JobContext = createContext();

export const useJobContext = () => {
    return useContext(JobContext);
  };
  
export const JobProvider = ({ children }) => {
  const [jobFields, setJobFields] = useState([]);
  const navigate = useNavigate();
  const getFieldList = async() => {
    try{
    const response = await request.get(`/job/api/fields`);
    const fieldArray = response.data.map((field) => field.field);
      setJobFields(fieldArray); 
    }
    catch(err) {
      console.error("Error fetching job fields:", err);
      navigate("/error/500")
    }
  }
  useEffect(() => {
    // Fetch job fields when the context is initialized
    // axios
    //   .get("http://localhost:3000/job/api/fields")
    //   .then((response) => {
    //     setJobFields(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching job fields:", error);
    //   });
    getFieldList()
  }, []);

  return (
    <JobContext.Provider value={{ jobFields}}>
      {children}
    </JobContext.Provider>
  );
};
