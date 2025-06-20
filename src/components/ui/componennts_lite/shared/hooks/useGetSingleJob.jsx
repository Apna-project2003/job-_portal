
import { useEffect, useState } from 'react';
import axios from 'axios';
import { JOB_API_ENDPOINT } from '@/utils/data';
import { useDispatch } from 'react-redux';
import { setAllJobs, setSingleJob } from '@/redux/jobSlice';


function useGetSingleJob (JobId) {
  const dispatch = useDispatch();
const[loading,setLoading] = useState(false);
connst[error,setError] =useState(null);

 

export default useGetSingleJob;
