import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Register from './pages/Register.jsx'
import Chat from './pages/Chat.jsx'
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import SetAvatar from './pages/SetAvatar.jsx';

const router = createBrowserRouter([
  { 
    path: '/',
    element : <Chat />
  },
  {
    path:'/register',
    element : <Register />
  },
  {
    path: '/login',
    element:<Login/>
  },
  {
    path: '/setAvatar',
    element: <SetAvatar />,
  },
  {
    path:'*',
    element:<NotFound />
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(

    <RouterProvider router={router} />

)
