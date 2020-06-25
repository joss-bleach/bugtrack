import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_PROJECTS,
  PROJECT_ERROR,
  DELETE_PROJECT,
  GET_PROJECT,
} from "./types";

// Get all user projects
export const getProjects = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/projects/users/me");
    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Project
export const deleteProject = (id) => async (dispatch) => {
  if (
    window.confirm(
      "This action can't be undone. This will remove the selected project and all associated tasks, tests and bugs. Are you sure you'd like to continue?"
    )
  ) {
    try {
      await axios.delete(`/api/projects/${id}`);
      dispatch({
        type: DELETE_PROJECT,
        payload: id,
      });
      dispatch(setAlert("Project Deleted.", "alert-success"));
    } catch (err) {
      dispatch({
        type: PROJECT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// Get Project by Id

export const getProjectById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/projects/${id}`);
    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create Project

export const createProject = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/projects", formData, config);
    if (!edit) {
      dispatch({
        type: GET_PROJECTS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_PROJECT,
        payload: res.data,
      });
    }

    dispatch(
      setAlert(edit ? "Project Updated" : "Project Created", "alert-success")
    );

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "alert-danger")));
    }
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
