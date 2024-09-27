import React from 'react'
import {Navigate, Outlet} from 'react-router-dom';
import useAuthStatus from '../hooks/useAuthStatus.jsx'
import Spinner from './Spinner.jsx'


const PrivateRoute = () => {
  const {loggedIn, checkingStatus} = useAuthStatus()
   if (checkingStatus){
    return <Spinner/>
   }
  return  loggedIn ? <Outlet />: <Navigate to = '/signin'/>

}

export default PrivateRoute
