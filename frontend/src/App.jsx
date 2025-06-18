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
    path:"/Browse",
    element:<Browse/>
  },

  {
    path:"/Profile",
    element:<Profile/>
  }
]);
const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
      
    </div>
  )
}

export default App


