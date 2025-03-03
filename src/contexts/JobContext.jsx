import { createContext, useEffect, useState } from 'react';
import { request } from '../utils/request';
import { useNavigate } from 'react-router-dom';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobFields, setJobFields] = useState([]);
  const navigate = useNavigate();

  //State for pagination
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    //Fetch list of job fields
    const getFieldList = async () => {
      try {
        const response = await request.get(`/job/api/fields`);
        const fieldArray = response.data.map((field) => field.field);
        setJobFields(fieldArray);
      } catch (err) {
        console.error('Error fetching job fields:', err);
        navigate('/error/500');
      }
    };
    getFieldList();
  }, [navigate]);

  return (
    <JobContext.Provider value={{ jobFields, currentPage, setCurrentPage }}>
      {children}
    </JobContext.Provider>
  );
};
