// import React, { useEffect } from 'react'
// import axios from 'axios';
// import { JOB_API_ENDPOINT } from '@/utils/data';
// import { useDispatch } from 'react-redux';
// import { setAllJobs } from '@/redux/jobSlice';

// function useGetAllJobs  ()  {
//     const dispatch = useDispatch();
//  useEffect(() => {
//     const fetchAllJobs = async () => {
    
//       try {
//         const res = await axios.get(
//           `${JOB_API_ENDPOINT}/get`,
//           {
//             withCredentials: true,
//           }
//         );

//         console.log("📡 Request Sent To: ", `${JOB_API_ENDPOINT}/get`);
// console.log("✅ Response Data: ", res.data);
       
//         if (res.data.success) {
//           // Updated success check
//           dispatch(setAllJobs(res.data.jobs));
//           console.log("All jobs fetched: ", res.data.jobs);

//         } 
//       } catch (error) {
//         console.error("Fetch Error:", error);
      
//         } 
   
//     };

//     fetchAllJobs();
//   }, []);
// }

// export default useGetAllJobs;


import { useEffect } from 'react';
import axios from 'axios';
import { JOB_API_ENDPOINT } from '@/utils/data';
import { useDispatch } from 'react-redux';
import { setAllJobs } from '@/redux/jobSlice';

function useGetAllJobs() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get`, {
          withCredentials: true,
        });
        console.log("✅ API response:", res.data);

        if (res.data.status) {
          dispatch(setAllJobs(res.data.jobs));
          console.log("✅ Dispatch to Redux:", res.data.jobs);
        }
      } catch (error) {
        console.error("❌ Error fetching jobs:", error);
      }
    };

    fetchAllJobs();
  }, [dispatch]);
}

export default useGetAllJobs;
