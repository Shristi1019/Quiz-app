import React, {createContext, useState} from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import Admin from './Pages/Admin';
import User from './Pages/User';
import Quiz from './Pages/Quiz';
import Preview from './Pages/Preview';
import Signup from './Pages/Signup';
import ResetPassword from './Pages/ResetPassword';


export const UserContext = createContext();


function App() {
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});

  const router = createBrowserRouter([
    {
      path:"/",
      element: <Outlet/>,
      children:[
        {
          path:"",
          element:<HomePage/>
        },
        {
          path:"Login",
          element:<Login/>
        },
        {
          path:"Signup",
          element:<Signup/>
        },
        {
          path:"ResetPassword",
          element:<ResetPassword/>
        },
        {
          path:"Admin",
          element:<Admin/>
        },
        {
          path:"User",
          element:<User/>
        },
        {
          path:"/:id",
          element:<Quiz/>
        },
        {
          path:"Preview",
          element:<Preview/>
        },
        {
          path:"/:id/:index",
          element:<Quiz/>
        },
      ],
    }
  ])
  return (
    <>
    <UserContext.Provider value={{user,setUser,selectedOption,setSelectedOption,questions,setQuestions}}>
      <RouterProvider router={router}/>
    </UserContext.Provider>
    </>
  );
}

export default App;
