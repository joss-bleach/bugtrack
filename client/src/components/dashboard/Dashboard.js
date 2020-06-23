import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import NoProjects from "./projects/NoProjects";
import ProjectDash from "./projects/ProjectDash";

// Redux
import { connect } from "react-redux";
import Loading from "../layout/Loading";
import { getProjects } from "../../redux/actions/projects";

const Dashboard = ({ getProjects, projects: { projectlist, loading } }) => {
  useEffect(() => {
    getProjects();
  }, []);

  return loading && projectlist === null ? (
    <div className="m2">
      <Loading />
    </div>
  ) : (
    <Fragment>
      <h1 className="m2">My Projects</h1>
      <hr />
      {projectlist.length > 0 ? (
        <Fragment>
          <ProjectDash />
        </Fragment>
      ) : (
        <NoProjects />
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getProjects: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  projects: state.projects,
});

export default connect(mapStateToProps, { getProjects })(Dashboard);
