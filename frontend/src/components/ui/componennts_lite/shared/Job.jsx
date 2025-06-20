


import React from 'react'
import { Button } from '../../button'
import { BookMarked } from 'lucide-react'
import { Avatar, AvatarImage } from '../../avatar'
import { Badge } from '../../badge'
import { useNavigate } from 'react-router'

const Job = ({job}) => {
  const[isBookmarked,setIsBookmarked] = React.useState(false);
  const navigate = useNavigate()
  const jobId = "hikhkdkskkakldk"

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer hover:shadow-2xl hover:shadow-blue-200 hover:p-6 transition-all duration-300">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">3 days ago</p>
        <Button className="rounded-full">
          <BookMarked />
        </Button>
      </div>

      <div className="flex items-center gap-3 my-4">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="text-lg font-semibold">{job?.company?.name}</h1>
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
