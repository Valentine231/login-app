import React from 'react'
import { 
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider} from 'react-router-dom'
import Login from './component/Login'
import Signin from './component/SignIn'
import MainLayouts from './layout/Mainlayout'

const router = createBrowserRouter( 
  createRoutesFromElements (
    <Route path='/' element={<MainLayouts />}>
    <Route path="/Login" element={<Login />} />,
    <Route path="/signin" element={<Signin />} />
    </Route>
  )
)

const App = () => {
 
  return ( 
    <RouterProvider router={router} />
  )
}

export default App