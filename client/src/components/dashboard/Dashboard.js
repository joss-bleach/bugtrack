import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import NoProjects from "./projects/NoProjects";
import ProjectItem from "./projects/ProjectItem";

// Redux
import { connect } from "react-redux";
import Loading from "../layout/Loading";
import { getProjects } from "../../redux/actions/project";

const Dashboard = ({ getProjects, project: { projects, loading } }) => {
  useEffect(() => {
    getProjects();
  }, [getProjects]);

  return loading && projects === null ? (
    <div className="m2">
      <Loading />
    </div>
  ) : (
    <Fragment>
      <h1 className="m2">My Projects</h1>
      {projects.length > 0 && (
        <Link to="/new-project" type="button" className="btn btn-success">
          <span className="mdi mdi-plus-circle-outline"></span> New Project
        </Link>
      )}
      <hr />
      {projects.length > 0 ? (
        projects.map((project) => (
          <ProjectItem key={project._id} project={project}></ProjectItem>
        ))
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
  project: state.project,
});

export default connect(mapStateToProps, { getProjects })(Dashboard);
