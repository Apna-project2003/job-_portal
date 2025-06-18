import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover";
import { Avatar, AvatarImage } from "../../avatar";
import { Button } from "../../button";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router";
import { useSelector } from "react-redux";

const Navbar = () => {
  
  const{user} = useSelector((store) =>store.auth );


  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Left: Logo */}
        <h1 className="text-2xl font-bold">
         <span className="text-[#6B3AC2]">JOB</span> 
          <span className="text-[#FA4F09]">PORTAL</span>
        </h1>

        {/* Right: Nav Items + Avatar/Login */}
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            <li><Link to={"/Home"}>Home</Link></li>
           <li> <Link to={"/Jobs"}>Jobs</Link></li> 
            <li><Link to={"/Browse"}>Browse</Link></li>
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
             <Link to = {"/login"}> <Button variant="outline" onClick={() => setUser(true)} >
                Login 
              </Button></Link>
             <Link to = {"/register"} > <Button className="bg-purple-600 hover:bg-purple-700" variant="">Register</Button></Link>
            </div>
          ) : (
            <>
              {/* Popover Avatar Dropdown */}
              <Popover>
                <PopoverTrigger asChild>
                  <div className="cursor-pointer">
                    <Avatar className="h-[60px] w-[60px] rounded-full border-2 border-gray-300 overflow-hidden">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        className="w-full h-full object-cover"
                        alt="Avatar"
                      />
                    </Avatar>
                  </div>
                </PopoverTrigger>

                <PopoverContent className="w-[22rem]">
                  <div className="flex gap-4 items-start">
                    <Avatar className="h-[100px] w-[100px] rounded-full border-[6px] border-gray-200 overflow-hidden">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        className="w-full h-full object-cover"
                        alt="Avatar"
                      />
                    </Avatar>

                    <div>
                      <h4 className="font-medium text-lg">Aryan Gupta</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Laborum, mollitia? Minus magni exercitationem nulla mollitia!
                      </p>
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="flex flex-col text-gray-600 mt-4 gap-2">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <User2 className="h-4 w-4" />
                      {/* <Button variant="link" className="p-0 h-auto">
                        Profile
                      </Button> */}
                      <Button variant="link" ><Link to={"/profile"}>Profile</Link></Button>
                    </div>
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => setUser(false)}
                    >
                      <LogOut className="h-4 w-4" />
                      <Button variant="link" className="p-0 h-auto text-red-600">
                        Logout
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
