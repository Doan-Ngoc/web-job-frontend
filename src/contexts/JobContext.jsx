import { createContext } from "react";
const JobContext = createContext();

export default JobContext;
// import React, { createContext, useEffect, useState, useContext } from "react";
// import axios from "axios";

// const JobContext = createContext();

// const JobProvider = ({ children }) => {
//   const [jobFields, setJobFields] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Fetch job fields when the context is initialized
//     axios
//       .get("http://localhost:3000/job/api/fields")
//       .then((response) => {
//         setJobFields(response.data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching job fields:", error);
//         setIsLoading(false);
//       });
//   }, []);

//   return (
//     <JobContext.Provider value={{ jobFields, isLoading }}>
//       {children}
//     </JobContext.Provider>
//   );
// };

// const useJobContext = () => {
//   return useContext(JobContext);
// };

// export { JobProvider, useJobContext };
