import React from "react";
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons

// MaterialUI Components
import Header from "../../components/Header/Header";
import Button from "../../components/CustomButtons/Button";

// Assets
import Logo from "../../assets/img/logo/logo-white.png";

// Redux

// Styled Component
import navbarsStyle from "../../assets/jss/material-kit-pro-react/views/componentsSections/navbarsStyle";
const useStyles = makeStyles(navbarsStyle);

export const Navigation = () => {
  const classes = useStyles();
  return (
    <div id="navbar" className={classes.navbar}>
      <Header
        brand={<img src={Logo} style={{ height: "40px" }} alt="Fulcrum Logo" />}
        color="dark"
        links={
          <List className={classes.list + " " + classes.mlAuto}>
            <ListItem className={classes.listItem}>
              <Button
                onClick={(e) => e.preventDefault()}
                color="transparent"
                className={classes.navLink}
              >
                <Link style={{ color: "white" }} to="/register">
                  Sign Up
                </Link>
              </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Button
                onClick={(e) => e.preventDefault()}
                color="transparent"
                link="/login"
                className={classes.navLink}
              >
                <Link style={{ color: "white" }} to="/login">
                  Log In
                </Link>
              </Button>
            </ListItem>
          </List>
        }
      />
    </div>
  );
};

export default Navigation;
