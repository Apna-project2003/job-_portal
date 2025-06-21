
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { JOB_API_ENDPOINT } from '@/utils/data';
// import { useDispatch } from 'react-redux';
// import { setAllJobs, setSingleJob } from '@/redux/jobSlice';


// function useGetSingleJob (JobId) {
//   const dispatch = useDispatch();
// const[loading,setLoading] = useState(false);
// const[error,setError] =useState(null);

 

// export default useGetSingleJob;


import { useEffect, useState } from 'react';
import axios from 'axios';
import { JOB_API_ENDPOINT } from '@/utils/data';
import { useDispatch } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';

function useGetSingleJob(jobId) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.status) {
          dispatch(setSingleJob(res.data.job));
        } else {
          setError('Job not found');
        }
      } catch (err) {
        console.error('❌ Error fetching job:', err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId, dispatch]);

  return { loading, error };
}

export default useGetSingleJob;
