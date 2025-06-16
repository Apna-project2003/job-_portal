// import React, { useState } from 'react';
// import Navbar from '../componennts_lite/Navbar'; // Assuming typo fixed to 'components'
// import { Label } from '../label';
// import { Input } from '../input';
// import { Button } from '../button';
// import { Link } from 'react-router-dom';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     role: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target; // Fixed: Changed 'fullname' to 'name'
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value, // Simplified: Removed file handling since no file input
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData); // Replace with API call later
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col">
//       <Navbar />
//       <div className="flex items-center justify-center flex-grow p-4 sm:p-6">
//         <form
//           onSubmit={handleSubmit}
//           className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 sm:p-10 m-4 transition-all duration-300 hover:shadow-2xl"
//         >
//           <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
//             Login to Your Account
//           </h1>

//           {/* Email Field */}
//           <div className="mb-5">
//             <Label htmlFor="email" className="text-sm font-medium text-gray-700">
//               Email Address
//             </Label>
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               placeholder="john@example.com"
//               value={formData.email}
//               onChange={handleChange}
//               className="mt-1.5 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
//               required
//             />
//           </div>

//           {/* Password Field */}
//           <div className="mb-5">
//             <Label htmlFor="password" className="text-sm font-medium text-gray-700">
//               Password
//             </Label>
//             <Input
//               id="password"
//               name="password"
//               type="password"
//               placeholder="********"
//               value={formData.password}
//               onChange={handleChange}
//               className="mt-1.5 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
//               required
//             />
//           </div>

//           {/* Role Field */}
//           <div className="mb-5">
//             <Label htmlFor="role" className="text-sm font-medium text-gray-700">
//               Role
//             </Label>
//             <select
//               id="role"
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="mt-1.5 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 bg-white"
//               required
//             >
//               <option value="" disabled>
//                 Select a role
//               </option>
//               <option value="Student">Student</option>
//               <option value="Recruiter">Recruiter</option>
//             </select>
//           </div>

//           {/* Buttons and Register Link */}
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
//             <Button
//               type="submit"
//               className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors duration-300 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//             >
//               Login
//             </Button>
//             <p className="text-sm text-gray-600">
//               Don't have an account?{' '}
//               <Link
//                 to="/register"
//                 className="text-green-600 hover:text-green-800 font-medium underline transition-colors duration-200"
//               >
//                 Register
//               </Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;






import React, { useState } from "react";
import Navbar from "../componennts_lite/Navbar";
import { Label } from "../label";
import { Input } from "../input";
import { Navigate, useNavigate } from "react-router-dom";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data.js";



const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "", 
    role: "",
  });
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { loading, user } = useSelector((store) => store.auth);


  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const ChangeFilehandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // dispatch(setLoading(true)); // Start loading


      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        // dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Login failed");
    }
    // finally {
    //   dispatch(setLoading(false)); // End loading
    // }
  };

  // useEffect(() => {
  //   if (user) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-500 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5 text-center text-blue-600">
            Login
          </h1>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="johndoe@gmail.com"
            ></Input>
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="********"
            ></Input>
          </div>
           

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5 ">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

         
            <button
              type="submit"
              className="w-3/4 py-3 my-3 text-white flex items-center justify-center max-w-7xl mx-auto bg-blue-600 hover:bg-blue-800/90 rounded-md"
            >
              Login
            </button>
          

          <div className=" ">
            <p className="text-gray-700  text-center my-2">
              Create new Account{" "}
              <Link to="/register" className="text-blue-700">
                <button className=" w-1/2 py-3 my-3 text-white flex items-center justify-center max-w-7xl mx-auto bg-green-600 hover:bg-green-800/90 rounded-md">
                  Register
                </button>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;