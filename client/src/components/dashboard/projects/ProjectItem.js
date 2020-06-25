import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";

// Redux
import { connect } from "react-redux";
import { deleteProject } from "../../../redux/actions/project";

const ProjectItem = ({
  deleteProject,
  project: { _id, title, summary, dateCreated, completed },
}) => {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <h6 className="card-subtitle">
          Created: <Moment format="dddd, Do MMMM YYYY">{dateCreated}</Moment>{" "}
        </h6>
        {completed === true ? (
          <p className="badge badge-success m2 p5">Completed!</p>
        ) : (
          <p className="badge badge-info m2 p5">In Progress...</p>
        )}
        <p className="card-text">{summary}</p>
        <Link to={`/project/${_id}`} className="card-link">
          View Project
        </Link>
      </div>
    </div>
  );
};

ProjectItem.propTypes = {
  project: PropTypes.object.isRequired,
  deleteProject: PropTypes.func.isRequired,
};

export default connect(null, { deleteProject })(ProjectItem);
