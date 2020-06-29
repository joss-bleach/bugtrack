import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// MaterialUI Components
import Footer from "../../components/Footer/Footer";

// Styled Component
import styles from "../../assets/jss/material-kit-pro-react/views/componentsSections/footerStyle";

const useStyles = makeStyles(styles);

export const PageFooter = () => {
  const classes = useStyles();
  return (
    <Footer
      content={
        <div>
          <div className={classes.right}>
            &copy; {1900 + new Date().getYear()} Fulcrum
          </div>
        </div>
      }
    />
  );
};

export default PageFooter;
