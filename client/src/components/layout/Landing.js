import React, { Fragment } from "react";

export const Landing = () => {
  return (
    <div className="form-wrap">
      <h1>Project Management, Made Easy.</h1>
      <h4 className="sub-head">Get Started</h4>
      <form role="form" className="m2">
        <div className="row justify-content-center justify-content-center">
          <div className="col-md-3">
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                className="form-control input-sm floatlabel"
                placeholder="First Name"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <input
                type="text"
                name="lastName"
                className="form-control input-sm floatlabel"
                placeholder="Last Name"
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control input-sm floatlabel"
                placeholder="Email Address"
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control input-sm floatlabel"
                placeholder="Password"
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="password"
                name="password2"
                className="form-control input-sm floatlabel"
                placeholder="Confirm Password"
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="form-group">
              <button type="submit" className="btn btn-outline-primary">
                Sign Up
              </button>
              <hr />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <p>
              Got an account?{" "}
              <a href="#" className="sub-head">
                Click Here
              </a>{" "}
              to sign in.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Landing;
