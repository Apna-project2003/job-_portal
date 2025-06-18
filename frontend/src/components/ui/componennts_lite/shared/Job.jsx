

import React from 'react'
import { Button } from '../../button'
import { BookMarked } from 'lucide-react'
import { Avatar, AvatarImage } from '../../avatar'
import { Badge } from '../../badge' // ✅ Make sure this path is correct

const Job = () => {
  return (
    
         <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer hover:shadow-2xl hover:shadow-blue-200 hover:p-3">
      <div className="flex items-center justify-between"><p className="text-sm text-gray-600">3 days ago</p>
        <Button className="rounded-full">
          <BookMarked />
        </Button>

        

        </div>
        

      {/* <div className="flex justify-between items-start">
        
      </div> */}

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://c8.alamy.com/comp/2BJW0NX/job-logo-symbol-vector-design-illustration-2BJW0NX.jpg" />
          </Avatar>
        </Button>
      <div>
            <h1 className="text-lg font-semibold">Company Name</h1>
            <p className="text-sm text-gray-600">India</p>
          </div>
        </div>
       
         
          <div>
            <div>
            <h2 className="font-bold text-lg my-1">Job Title</h2>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel iste quos optio,
              adipisci iusto non numquam repellendus cupiditate aut sunt quaerat blanditiis delectus rem?
            </p>
          </div>

          <div className="flex gap-2 flex-wrap mt-4">
            <Badge className="text-blue-600 font-bold" variant="ghost">10 Position</Badge>
            <Badge className="text-[#FA4F09] font-bold" variant="ghost">20 LPA</Badge>
            <Badge className="text-[#6B3AC2] font-bold" variant="ghost">Remote</Badge>
            <Badge className="text-black font-bold" variant="ghost">Full Time</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className=" bg-[#FA4F09] font-bold rounded-sm"  >Details</Button>
              <Button variant="outline" className="bg-[#6B3AC2] text-white font-bold rounded-sm">Save for Later</Button>

          </div>
        </div>
      </div>
    
    
   
  )
}

export default Job


