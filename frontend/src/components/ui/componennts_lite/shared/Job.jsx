


import React from 'react'
import { Button } from '../../button'
import { BookMarked } from 'lucide-react'
import { Avatar, AvatarImage } from '../../avatar'
import { Badge } from '../../badge'
import { useNavigate } from 'react-router'

const Job = ({job}) => {
 
console.log("Job Object:", job);
console.log("Created By:", job.created_by);


  const {
  title , description,salary,location,jobType,position,company,_id,} = job;

  const[isBookmarked,setIsBookmarked] = React.useState(false);
  const navigate = useNavigate();
  const daysAgo = (mongodbTime) =>{
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiff =currentTime - createdAt;
    return  Math.floor(timeDiff / (1000*3600 * 24)); // milisecond * min * second
  };
  // const jobId = "hikhkdkskkakldk"

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer hover:shadow-2xl hover:shadow-blue-200 hover:p-6 transition-all duration-300">


      {/* Job time and bookmark button */}



      <div className="flex items-center justify-between">
       <p className="text-sm text-gray-600">
  {job?.createdAt ? `${daysAgo(job.createdAt)} days ago` : 'Today'}
</p>

        <Button variant="outlie" className="rounded-full" size="icon"   onClick={() => setIsBookmarked(!isBookmarked)}>
        {isBookmarked ?  <BookMarked />: <BookMarked /> }
        </Button>
      </div>
     




      <div className="flex items-center gap-3 my-4">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="job-search-logo-vector.jpg" />
          </Avatar>
        </Button>
       
        <div>
          <h1 className="text-lg font-semibold">{job.created_by?.name || "Unknown Company"
}</h1>
          <p className="text-sm text-gray-600">India</p>
        </div>
      </div>

      <div>
        <h2 className="font-bold text-lg my-1">{job?.title}</h2>
        <p className="text-sm text-gray-600">
         {job?.description}
        </p>
      </div>

      <div className="flex gap-2 flex-wrap mt-4">
        <Badge className="text-blue-600 font-bold" variant="ghost">{job?.position}</Badge>
        <Badge className="text-[#FA4F09] font-bold" variant="ghost">{job?.jobType}</Badge>
        <Badge className="text-[#6B3AC2] font-bold" variant="ghost">{job?.salary}</Badge>
        {/* <Badge className="text-black font-bold" variant="ghost">Full Time</Badge> */}
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() =>{ navigate(`/description/${job?._id}`);
        }}
          variant="outline"
          className="bg-[#FA4F09] text-white font-bold rounded-sm"
        >
          Details
        </Button>
        <Button
          variant="outline"
          className="bg-[#6B3AC2] text-white font-bold rounded-sm"
        >
          Save for Later
        </Button>
      </div>
    </div>
  )
}

export default Job

