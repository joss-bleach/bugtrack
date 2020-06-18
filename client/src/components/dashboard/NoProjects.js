import React from "react";

export const NoProjects = () => {
  return (
    <div>
      <div>
        <h4>Get Started</h4>
        <p className="m2">
          You don't have any projects yet - create your first one.
        </p>
        <button type="button" className="btn btn-success">
          <span class="mdi mdi-plus-circle-outline"></span> Create Project
        </button>
      </div>
    </div>
  );
};

export default NoProjects;
