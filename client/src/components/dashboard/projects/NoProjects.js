import React from "react";
import { Link } from "react-router-dom";

export const NoProjects = () => {
  return (
    <div>
      <div>
        <h4>Get Started</h4>
        <p className="m2">
          You don't have any projects yet - create your first one.
        </p>
        <Link to="/new-project" type="button" className="btn btn-success">
          <span className="mdi mdi-plus-circle-outline"></span> Create Project
        </Link>
      </div>
    </div>
  );
};

export default NoProjects;
