

import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Header from './Header'
import Categories from './Categories'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from './hooks/useGetAllJobs'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
 

 
const Home = () => {
   useGetAllJobs();

   const { user } = useSelector((store) => store.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user && user?.role === "Recruiter") {
      navigate("/admin/companies");
    }
  }, []);
  
  return (
    <div>
   <Navbar/>
   <Header/>
      <Categories/>
      <LatestJobs/>
      <Footer/>
     
    </div>
  )
}

export default Home
