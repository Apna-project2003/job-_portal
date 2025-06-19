
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../../dialog'
import { Label } from '../../label'
import { Button } from '../../button';
import { USER_API_ENDPOINT } from '@/utils/data';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { setUser } from '@/redux/authSlice';
const EditProfileModal = ({ open, setOpen }) => {
    const [loading , setLoading] = useState(false);
    const{user} =useSelector((store)=> store.auth);
    const [input, setInput] = useState({
    fullname: user?.fullname, // Corrected from fullnamename to fullname
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    file: user?.profile?.resume,
  });

  const dispatch = useDispatch();

   const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

   const handleFileChange = async (e) => {
    e.preventDefault();
    // console.log(input);
   
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if (input.file) {
      formData.append("file", input.file);
    }


     try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log("🛰️ Raw response:", res.data);

if (res.data.success) {
        dispatch(setUser(res.data.user));
        // dispatch(setUser({ ...res.data.user, skills: input.skills }));
        toast.success(res.data.message);
          console.log("✅ Profile updated successfully:", res.data.user);
      }

    
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    } 
    
    finally {
      setLoading(false);
    }
    setOpen(false);

    console.log(input);
  };

     const FileChangehandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="hidden">Open</DialogTrigger>

      <DialogContent className="sm:max-w-[500px]"
          onInteractOutside={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form  onSubmit={handleFileChange}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <input
                type="text"
                id="name"
                 value={input.fullname}
                name="fullname"
                  onChange={changeEventHandler}
                className="col-span-3 border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <input
                type="email"
                id="email"
                  value={input.email}
                name="email"
                  onChange={changeEventHandler}
                className="col-span-3 border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">Phone</Label>
              <input
                type="tel"
                id="phone"
                 value={input.phoneNumber} 
                name="phoneNumber"
                   onChange={changeEventHandler}
                className="col-span-3 border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">Bio</Label>
              <textarea
                id="bio"
                name="bio"
                  value={input.bio}
                rows="3"
                 onChange={changeEventHandler}
                className="col-span-3 border border-gray-300 rounded-md p-2 resize-none"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right">Skills</Label>
              <input
                id="skills"
                name="skills"
                 value={input.skills}
                  onChange={changeEventHandler}
                className="col-span-3 border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">Resume</Label>
              <input
                type="file"
                id="file"
                name="file"
                accept="application/pdf"
                 onChange={FileChangehandler}
                className="col-span-3 border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <DialogFooter>
              {loading ? (
                <Button className="w-full my-4">
                  {" "}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
                </Button>
              ) : (
                <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >Save</button>
              )}
            </DialogFooter>

          
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileModal
