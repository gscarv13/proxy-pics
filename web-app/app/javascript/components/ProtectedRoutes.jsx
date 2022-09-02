import React from 'react';
import { Outlet, Navigate } from "react-router";

import { useSelector } from "react-redux";


const ProtectedRoutes = () => {
  const { token } = useSelector((state) => state.requester.value)

  return token !== '' ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes;