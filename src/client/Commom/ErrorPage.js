import React from "react";
import { NavLink } from "react-router-dom";
import "./errorPage.css";
function ErrorPage() {
  // console.log(error);
  return (
    <div className="errorContainer">
      <h1 className="fs-4">Oops, something went wrong!</h1>
      <NavLink to="/">
        <button className="btn btn-primary">Go Home</button>
      </NavLink>
    </div>
  );
}

export default ErrorPage;
