import React, { useState, useEffect } from "react";
import { Badge } from "../../badge";
import { Button } from "../../button";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";

const JOB_API_ENDPOINT = "https://your-api.com/api/jobs"; // Replace with your actual endpoint

const Description = () => {
  const params = useParams();
  const JobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Placeholder for apply handler
  const applyJobHandler = () => {
    console.log("Apply button clicked");
  };

  const isApplied = true; // Replace with real logic if needed

  useEffect(() => {
    const fetchSingleJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${JobId}`, {
          withCredentials: true,
        });
        console.log("✅ API response:", res.data);

        if (res.data.status) {
          dispatch(setSingleJob(res.data.jobs));
          console.log("✅ Dispatch to Redux:", res.data.jobs);
        } else {
          setError("Failed to fetch job");
        }
      } catch (error) {
        console.error("❌ Error fetching job:", error);
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (JobId) fetchSingleJobs();
  }, [JobId, dispatch]);

  return (
    <div>
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl">{singleJob?.title}</h1>
            <div className="flex gap-2 items-center mt-4">
              <Badge className="text-blue-600 font-bold" variant="ghost">
                {singleJob?.position} Open Positions
              </Badge>
              <Badge className="text-[#FA4F09] font-bold" variant="ghost">
                {singleJob?.salary} LPA
              </Badge>
              <Badge className="text-[#6B3AC2] font-bold" variant="ghost">
                {singleJob?.location}
              </Badge>
              <Badge className="text-black font-bold" variant="ghost">
                {singleJob?.jobType}
              </Badge>
            </div>
          </div>
          <div>
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`rounded-lg ${
                isApplied
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-[#6B3AC2] hover:bg-[#552d9b]"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply"}
            </Button>
          </div>
        </div>

        <h1 className="border-b-2 border-b-gray-400 font-medium py-4">
          {singleJob?.description}
        </h1>

        <div className="my-4">
          <h1 className="font-bold my-1">
            Role:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.position} Open Positions
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Location:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Salary:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.salary} LPA
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Experience:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.experienceLevel} Year
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Total Applicants:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.applications?.length || 0}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Job Type:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.jobType}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Description;
