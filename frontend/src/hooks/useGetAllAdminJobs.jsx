import axios from "axios";
import { useEffect } from "react";
import { JOB_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setAllAdminJobs } from "../redux/jobSlice";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {

    console.log("HOOK RUNNING");

    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/getadminjobs`,
          { withCredentials: true }
        );

        console.log("API RESPONSE:", res.data);

        if (res?.data?.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }

      } catch (error) {
        console.log("ERROR:", error.response?.data || error.message);
      }
    };

    fetchAllAdminJobs();

  }, [dispatch]);
};

export default useGetAllAdminJobs;