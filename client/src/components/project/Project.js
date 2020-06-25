import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Loading from "../layout/Loading";
import ProjectTop from "./ProjectTop";

// Redux
import { connect } from "react-redux";
import { getProjectById } from "../../redux/actions/project";

// Project as prop then seperate into sections
const Project = ({ getProjectById, match, project: { project, loading } }) => {
  useEffect(() => {
    getProjectById(match.params.id);
  }, [getProjectById, match.params.id]);
  console.log(project);
  return (
    <Fragment>
      {project === null || loading ? (
        <Loading />
      ) : (
        <ProjectTop project={project} />
      )}
    </Fragment>
  );
};

Project.propTypes = {
  getProjectById: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, { getProjectById })(Project);
