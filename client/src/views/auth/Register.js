import React, { useState } from "react";
import PropTypes from "prop-types";

// MaterialUI Components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";

// Redux

const Register = (props) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Passwords don't match");
    } else {
      console.log(formData);
      console.log("Success");
    }
  };

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={4}>
        <h2>Register</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <CustomInput
            id="float"
            labelText="First Name"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              type: "text",
              name: "firstName",
              value: firstName,
              onChange: (e) => onChange(e),
            }}
          />
          <CustomInput
            id="float"
            labelText="Last Name"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              type: "text",
              name: "lastName",
              value: lastName,
              onChange: (e) => onChange(e),
            }}
          />
          <CustomInput
            id="float"
            labelText="Email Address"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              type: "email",
              name: "email",
              value: email,
              onChange: (e) => onChange(e),
            }}
          />
          <CustomInput
            id="float"
            labelText="Password"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              type: "password",
              name: "password",
              value: password,
              onChange: (e) => onChange(e),
            }}
          />
          <CustomInput
            id="float"
            labelText="Confirm Password"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              type: "password",
              name: "confirmPassword",
              value: confirmPassword,
              onChange: (e) => onChange(e),
            }}
          />
          <Button color="default" size="lg" type="submit">
            Sign Up
          </Button>
        </form>
      </GridItem>
    </GridContainer>
  );
};

Register.propTypes = {};

export default Register;
