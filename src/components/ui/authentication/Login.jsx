import React, { useState } from 'react'
import Navbar from '../componennts_lite/shared/Navbar'
import { Label } from '../label'
import { Input } from '../input'
import { RadioGroup, RadioGroupItem } from '../radio-group'
import { Button } from '../button'
import { Link, Navigate, useNavigate } from 'react-router'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/data.js'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
const Login = () => {

  const[input,setInput]  = useState({
   
    email: "",
    password:"",
    role:"",
  
  
  });
const navigate = useNavigate();
const dispatch = useDispatch();
const {loading} = useSelector(store => store.auth);
  const changeEventHandler = (e) =>{
    setInput({...input, [e.target.name]:e.target.value});
  };


  const changeFilehandler = (e) =>{
    setInput({...input, file:e.target.files?.[0]});
  };


  const submitHandler = async(e) =>{
     e.preventDefault();
    
     
  


    try{
      dispatch(setLoading (true));

const res = await axios.post(`${USER_API_ENDPOINT}/login`, input ,{
  headers: {
    "Content-Type" : "application/json",
  },

  withCredentials:true,
});

if(res.data.success){
  dispatch(setUser(res.data.user));
  navigate("/");
  toast.success(res.data.message);
}
    }catch(error){
      console.log(error);
      const errorMessage = error.response  ? error.response.data.message:"An unexpected error";
      toast.error(errorMessage); 
    }


    finally{
      dispatch(setLoading(false));
    }
  

   
  };
  return (
    <div>
      <Navbar/>
    <div className="flex items-center justify-center max-w-7xl mx-auto">
      <form onSubmit={submitHandler} className="w-1/2 border-gray-500 rounded-md">
        <h1 className="font-bold text-xl mb-5">Login</h1>
        {/* <div className="my-2">
          <Label>Name</Label>
          <Input type="text" placeholder = "Doremon"></Input>
        </div> */}

         <div className="my-2">
          <Label>email</Label>
          <Input type="email"  value={input.email} name="email" onChange={changeEventHandler}  placeholder = "Doremon@gmail.com"></Input>
        </div>

         <div className="my-2">
          <Label>Password</Label>
          <Input type="password"  value={input.password} name="password" onChange={changeEventHandler}  placeholder = "*********"></Input>
        </div>


        

       

         <div className="flex items-center justify-between">
        <Label>Role</Label>  
        <RadioGroup className = "flex items-center gap-4 my-5">
      <div className="flex items-center space-x-2">

        <Input type = "radio"   name="role" value="Student" checked ={input.role ==='Student'} onChange= {changeEventHandler}  className ="cursor-pointer" />
        <Label htmlFor="r1">Student</Label>
      </div>
      <div className="flex items-center gap-3">
         <Input type = "radio"  name="role" value="Recruiter" checked ={input.role ==='Recruiter'} onChange= {changeEventHandler}   className ="cursor-pointer" />
        <Label htmlFor="r2">Recruiter</Label>
      </div>
     
    </RadioGroup>

  

   
        </div>
{
  loading ?( <Button>{"  "} <Loader2 className ="mr-2 h-4 w-4 animate-spin"/>Loading...{"  "}</Button> ): (<Button className="block w-full py-3 my-3 text-white bg-primary hover:bg-primary/90  rounded-md">Login</Button>
)}


        

         <p className="text-gray-500 text-md my-2">
          No accout? <Link to ="/register" className="text-blue-700">Register</Link>
         </p>
      </form>
    </div>
    </div>
  );
};

export default Login
