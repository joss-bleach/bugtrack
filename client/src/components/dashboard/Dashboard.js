import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import NoProjects from "./NoProjects";

// Redux
import { connect } from "react-redux";
import Loading from "../layout/Loading";
import { getProjects } from "../../redux/actions/projects";

const Dashboard = ({ getProjects }) => {
  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div>
      <Fragment>
        <h1 className="m2">My Projects</h1>
        <hr />
        <NoProjects />
      </Fragment>
    </div>
  );
};

Dashboard.propTypes = {
  getProjects: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  projects: state.projects,
});

export default connect(mapStateToProps, { getProjects })(Dashboard);
