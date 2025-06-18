import React from 'react'
import Navbar from './Navbar'
import { Avatar, AvatarImage } from '../../avatar'
import { Button } from '../../button'
import { Badge } from '../../badge' // Adjust path
import { Contact, Mail, Pen } from 'lucide-react'
import AppliedJob from './AppliedJob'

const Skills = [
  "React", "HTML5 / CSS3", "React.js", "Next.js",
  "Angular", "Vue.js", "SASS / SCSS", "Tailwind CSS"
]

const Profile = () => {
    const isResume = true;
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow shadow-gray-400 hover:shadow-yellow-400">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="cursor-pointer h-24 w-24">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">Aryan Gupta</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus nostrum facere maxime hic incidunt.</p>
            </div>
          </div>
          <Button className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>Aryan61865@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>8109903395</span>
          </div>
        </div>
<div>
    <div className="my-5">
            
          <h2 className="text-lg font-semibold my-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {Skills.length !== 0 ?(Skills.map((item, index) => 
              <Badge key={index}>{item}</Badge>)):(
                <span>NA</span>
            )}
          </div>
        </div>
</div>
        
<div>
    <div className="grid w-full max-w-sm items-center gap-1.5">
        <label className="text-md font-bold">
             Resume
        </label>

        <div>
            {
                isResume ? (<a target="_blank" href={"http://resume.com"} className="text-blue-600 hover:underline cursor-pointer">Download </a>)
                :(<span>No Resume Found</span>

           ) }
        </div>

    </div>
</div>

      </div>
      
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="text-lg my-5 font-bold">Applied Jobs</h1>

        {/* Add Application Table */}
        <AppliedJob />
      </div>
    </div>
  )
}

export default Profile
