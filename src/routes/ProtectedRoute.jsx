import React from 'react';
import {Navigate, Outlet} from 'react-router-dom'

const useAuth = () => {
  return (localStorage.getItem('isLoggedIn')?.toLowerCase() === 'true')
};

const  ProtectedRoute = () => {

  const isLoggedIn =  useAuth()
  return isLoggedIn ? <Outlet/> : <>{localStorage.clear()} <Navigate to="/login"/></>
}

export default ProtectedRoute;
