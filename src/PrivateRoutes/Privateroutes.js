import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const Privateroutes = () => {
  const admin = sessionStorage.getItem("admin");

  return <div>{admin ? <Outlet /> : <Navigate to={"/"} />}</div>;
};

export const PrivateLoginRoutes = () => {
  const admin = sessionStorage.getItem("admin");

  return <div>{admin ? <Navigate to={"/admin-dashboard"} /> : <Outlet />}</div>;
};
