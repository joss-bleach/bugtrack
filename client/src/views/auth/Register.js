import React, { useState } from "react";
import PropTypes from "prop-types";

// Redux

import { connect } from "react-redux";
import { setAlert } from "../../redux/actions/alert";

// @material-ui/core

import { makeStyles } from "@material-ui/core/styles";

// MaterialUI Components

import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";

// Assets

// Styled Components

import loginPageStyle from "../../assets/jss/material-kit-pro-react/views/loginPageStyle";
const useStyles = makeStyles(loginPageStyle);

const Register = (props) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const classes = makeStyles(loginPageStyle);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert("Your Passwords do not Match.", "warning");
    } else {
      console.log(formData);
      console.log("Success");
    }
  };

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={4} md={4}>
          <Card>
            <form onSubmit={(e) => onSubmit(e)}>
              <CardHeader color="primary">
                <h4>Sign Up</h4>
              </CardHeader>
              <CardBody>
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

                <Button simple color="primary" size="lg" type="submit">
                  Sign Up
                </Button>
                <p>Already Got an Account? Click Here to Log In.</p>
              </CardBody>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Register);
