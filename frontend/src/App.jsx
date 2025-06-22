import React from 'react'
import Navbar from './components/ui/componennts_lite/shared/Navbar';
import { createBrowserRouter } from 'react-router';
import Login from './components/ui/authentication/Login';
import Register from './components/ui/authentication/Register';
import { RouterProvider } from 'react-router-dom';
import Home from './components/ui/componennts_lite/shared/Home';
import PrivacyPolicy from './components/ui/componennts_lite/shared/PrivacyPolicy.jsx';
import TermsofServices from './components/ui/componennts_lite/shared/TermsofServices.jsx';
import Jobs from './components/ui/componennts_lite/shared/Jobs';
import Browse from './components/ui/componennts_lite/shared/Browse';
import Profile from './components/ui/componennts_lite/shared/Profile';
import Description from './components/ui/componennts_lite/shared/Description.jsx';
import Companies from './components/ui/admincomponent/Companies';
import CompanyCreate from './components/ui/admincomponent/CompanyCreate';
import CompanySetup from './components/ui/admincomponent/CompanySetup';

const appRouter = createBrowserRouter([
  {path:"/",
    element:<Home /> 
  },
  {
    path:"/login",
    element:<Login/>
  },
  {path:"/register",
    element:<Register />,
  },
  {
    path:"/PrivacyPolicy",
    element:<PrivacyPolicy/>,
  },
  
{
  path:"/TermsofServices",
  element:<TermsofServices/>
  },

  {
    path:"/Jobs",
  element:<Jobs/>
  },
  {
    path:"/Home",
    element:<Home/>
  },
  {
    path:"/description/:id",
    element:<Description/>
  },
  {
    path:"/Browse",
    element:<Browse/>
  },

  {
    path:"/Profile",
    element:<Profile/>
  },
   {
    path: "/admin/companies",
    element: (
     
        <Companies />
     
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
  
        <CompanyCreate />
   
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      
        <CompanySetup />
    
    ),
  },
  // {
  //   path: "/admin/jobs",
  //   element: (
     
        
  //       <AdminJobs />
     
  //   ),
  // },
  // {
  //   path: "/admin/jobs/create",
  //   element: (
  //     <ProtectedRoute>
        
  //       <PostJob />{" "}
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/admin/jobs/:id/applicants",
  //   element: (
  //     <ProtectedRoute>
  //       <Applicants />
  //     </ProtectedRoute>
  //   ),
  // },
]);
const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
      
    </div>
  )
}

export default App


