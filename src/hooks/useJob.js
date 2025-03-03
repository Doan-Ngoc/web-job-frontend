import { useContext } from "react";
import { JobContext } from "../contexts/JobContext";

export const useJob = () => {
  return useContext(JobContext);
};