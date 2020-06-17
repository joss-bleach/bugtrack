import React, { useState } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { setAlert } from "../../redux/actions/alert";

export const RegisterForm = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });

  const { firstName, lastName, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Your passwords do not match.", "alert-danger");
    } else {
      console.log("Success");
    }
  };

  return (
    <form className="m2" onSubmit={(e) => onSubmit(e)}>
      <div className="row justify-content-center justify-content-center">
        <div className="col-md-3">
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => onChange(e)}
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
              value={lastName}
              onChange={(e) => onChange(e)}
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
            <input
              type="password"
              name="password2"
              value={password2}
              onChange={(e) => onChange(e)}
              className="form-control input-sm floatlabel"
              placeholder="Confirm Password"
            />
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-outline-primary"
              value="Register"
            >
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
  );
};

RegisterForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(RegisterForm);
