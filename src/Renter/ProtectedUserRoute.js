import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function ProtectedUserRoute() {
    const { user } = useSelector((state) => state.user);

  return user.role === 'user' ? <Outlet /> : <Navigate to='/login' />;
}

export default ProtectedUserRoute
