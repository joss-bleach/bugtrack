import React, { Fragment } from "react";
import ProjectForm from "../forms/ProjectForm";

export const NewProject = () => {
  return (
    <Fragment>
      <h1 className="m2">New Project</h1>
      <ProjectForm />
    </Fragment>
  );
};

export default NewProject;
