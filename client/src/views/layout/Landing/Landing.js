import React, { Fragment } from "react";
import classNames from "classnames";

// Sections
import SectionFeatures from "./Sections/SectionFeatures";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// MaterialUI Components
import Parallax from "../../../components/Parallax/Parallax";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Button from "../../../components/CustomButtons/Button";

// Assets
import LandingImage from "../../../assets/img/landing/LandingImage.jpg";

// Styled Component
import landingPageStyle from "../../../assets/jss/material-kit-pro-react/views/landingPageStyle";
const useStyles = makeStyles(landingPageStyle);

export const Landing = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Parallax style={{ top: "-70px" }} image={LandingImage} filter="dark">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={6} md={6}>
              <h1 className={classes.title}>Project Management, Made Easy.</h1>
              <h4>
                Supercharge your freelance workflow. Stay on top of your
                projects with easy task management, bug tracking and test
                planning.
              </h4>
              <br />
              <Button color="default" size="lg" href="#">
                Get Started
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <SectionFeatures />
        </div>
      </div>
    </Fragment>
  );
};

export default Landing;
