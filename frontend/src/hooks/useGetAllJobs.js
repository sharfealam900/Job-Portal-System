import axios from 'axios'
import { useEffect } from 'react'
import { JOB_API_END_POINT } from '../utils/constant'
import { setAllJobs } from '../redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);

    useEffect(() => {
        let isMounted = true;

        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get?keyword=${searchedQuery || ""}`,
                    { withCredentials: true }
                );

                if (isMounted && res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }

            } catch (error) {
                console.log(error.response?.data?.message || error.message);
            }
        };

        fetchAllJobs();

        return () => {
            isMounted = false;
        };

    }, [searchedQuery]);
};

export default useGetAllJobs;