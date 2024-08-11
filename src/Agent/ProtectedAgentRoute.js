import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function ProtectedAgentRoute() {
    const { user } = useSelector((state) => state.user);

  return user.role === 'agent' ? <Outlet /> : <Navigate to='/login' />;
}

export default ProtectedAgentRoute