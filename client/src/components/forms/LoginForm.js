import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { login } from "../../redux/actions/auth";

const LoginForm = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <form onSubmit={(e) => onSubmit(e)} className="m2">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
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
              value={password}
              onChange={(e) => onChange(e)}
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

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(LoginForm);
