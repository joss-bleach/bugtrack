import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import BugReport from "@material-ui/icons/BugReport";
import Assessment from "@material-ui/icons/Assessment";

// MaterialUI Components
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem.js";
import InfoArea from "../../../../components/InfoArea/InfoArea.js";

// Styled Component
import productStyle from "../../../../assets/jss/material-kit-pro-react/views/landingPageSections/productStyle";
const useStyles = makeStyles(productStyle);

export const SectionFeatures = () => {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={8}>
          <h2 className={classes.title}>Stay on Top</h2>
          <h5 className={classes.description}>
            Easy project management. Keep on top of your freelance web
            development projects. Manage your tasks, tests and bugs.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="Task Management"
              description="Keep on top of your tasks. Set deadlines and priorities and never miss a deadline."
              icon={Assignment}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="Bug Tracking"
              description="Log and fix bugs. Mark priorities and see breakdowns of bugs fixed throughout the project"
              icon={BugReport}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="Test Planning"
              description="Stay on top of your testing. Test cases against expected outcome and report findings back to clients."
              icon={Assessment}
              iconColor="success"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

export default SectionFeatures;
