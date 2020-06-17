import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const LoginForm = (props) => {
  return (
    <form role="form" className="m2">
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
            <button type="submit" className="btn btn-outline-primary">
              Log In
            </button>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-3 m2">
          <div className="form-check">
            <label className="form-check-label">
              <input className="form-check-input" type="checkbox" value="" />
              Remember Me
            </label>
          </div>
        </div>
        <div className="col-md-3 m2">
          <p>Forgot your password?</p>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <hr />
          <p>
            Not got an account? <Link to="/">Click Here</Link> to sign up.
          </p>
        </div>
      </div>
    </form>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
