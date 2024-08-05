import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>404</h1>
      <br />
      <h2>Not Found</h2>
      <NavLink to={"/"}>Go To Dashboard</NavLink>
    </div>
  );
};

export default NotFound;
