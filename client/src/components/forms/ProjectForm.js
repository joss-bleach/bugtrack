import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { createProject } from "../../redux/actions/projects";

const ProjectForm = ({ createProject, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    dueDate: "",
  });

  const { title, summary, dueDate } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProject(formData, history);
  };

  return (
    <Fragment>
      <form className="m2" onSubmit={(e) => onSubmit(e)}>
        <fieldset>
          <legend>Create a Project</legend>
          <div className="form-group">
            <label for="title">Enter a Project Title: *</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={title}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label for="summary">Enter a Project Summary: *</label>
            <textarea
              className="form-control"
              id="summary"
              name="summary"
              value={summary}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label for="dueDate">Date Due:</label>
            <input
              type="date"
              className="form-control"
              id="dueDate"
              name="dueDate"
              value={dueDate}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-outline-primary"
              value="submit"
            >
              Create Project
            </button>
          </div>
        </fieldset>
      </form>
      <Link to="/dashboard" className="btn btn-outline-secondary">
        Go Back
      </Link>
    </Fragment>
  );
};

ProjectForm.propTypes = {
  createProject: PropTypes.func.isRequired,
};

export default connect(null, { createProject })(withRouter(ProjectForm));
