import React, { Fragment } from "react";
import LoginForm from "../forms/LoginForm";

export const Landing = () => {
  return (
    <div className="form-wrap">
      <h1>Log In.</h1>
      <LoginForm />
    </div>
  );
};

export default Landing;
