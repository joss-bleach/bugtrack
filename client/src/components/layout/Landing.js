import React from "react";
import RegisterForm from "../forms/RegisterForm";

export const Landing = () => {
  return (
    <div className="form-wrap">
      <h1>Project Management, Made Easy.</h1>
      <h4 className="sub-head">Get Started</h4>
      <RegisterForm />
    </div>
  );
};

export default Landing;
