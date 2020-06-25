import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProjectTop = ({
  project: { _id, title, summary, dateCreated, dueDate, completed },
}) => {
  return (
    <div className="jumbotron m2">
      <h1>Project Summary</h1>
      <p className="lead">{title}</p>
      <p>{summary}</p>
      <hr className="my-4" />
      <p>
        <strong>Created: </strong>
        <Moment format="dddd, Do MMMM YYYY">{dateCreated}</Moment>
      </p>
      {dueDate && (
        <p>
          <strong>Due: </strong>
          <Moment format="dddd, Do MMMM YYYY">{dateCreated}</Moment>
        </p>
      )}
      <p>
        <strong>Progress: </strong>
        {completed === false ? "In Progress" : "Completed"}
      </p>
      <div>
        <button className="btn btn-info">Edit Project</button>
        <button className="btn btn-success">Project Completed</button>
        <button className="btn btn-danger">Delete Project</button>
      </div>
    </div>
  );
};

ProjectTop.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectTop;
