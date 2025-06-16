import React from 'react'
import Navbar from './components/ui/componennts_lite/Navbar';
import { createBrowserRouter } from 'react-router';
import Login from './components/ui/authentication/Login';
import Register from './components/ui/authentication/Register';
import { RouterProvider } from 'react-router-dom';
import Home from './components/ui/componennts_lite/Home';

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
]);
const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  )
}

export default App
