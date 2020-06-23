import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProjectDash = (props) => {
  return (
    <div>
      <button type="button" className="btn btn-success m2">
        <span className="mdi mdi-plus-circle-outline"></span> Add New Project
      </button>
    </div>
  );
};

ProjectDash.propTypes = {};

export default ProjectDash;
