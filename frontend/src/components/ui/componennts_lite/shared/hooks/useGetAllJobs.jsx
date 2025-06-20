import React, { useEffect } from 'react'
import axios from 'axios';
import { JOB_API_ENDPOINT } from '@/utils/data';
import { useDispatch } from 'react-redux';
import { setAllJobs } from '@/redux/jobSlice';

function useGetAllJobs  ()  {
    const dispatch = useDispatch();
 useEffect(() => {
    const fetchAllJobs = async () => {
    //   setLoading(true);
    //   setError(null);
      try {
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/jobs`,
          {
            withCredentials: true,
          }
        );
        // console.log("API Response:", res.data);
        if (res.data.success) {
          // Updated success check
          dispatch(setAllJobs(res.data.jobs));
        } 
      } catch (error) {
        console.error("Fetch Error:", error);
        // setError(error.message || "An error occurred.");
        } 
    //    finally {
    //     setLoading(false);
    //   }
    };

    fetchAllJobs();
  }, []);
}

export default useGetAllJobs;
