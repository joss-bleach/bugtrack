import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Loading from "../layout/Loading";
import ProjectTop from "./ProjectTop";

// Redux
import { connect } from "react-redux";
import { getProjectById } from "../../redux/actions/projects";

// Project as prop then seperate into sections
const Project = ({ getProjectById, match }) => {
  useEffect(() => {
    getProjectById(match.params.id);
  }, [getProjectById, match.params.id]);
  return (
    <div>
      <h1>Project</h1>
    </div>
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
