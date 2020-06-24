import {
  CLEAR_PROJECT,
  GET_PROJECTS,
  PROJECT_ERROR,
  DELETE_PROJECT,
  GET_PROJECT,
} from "../actions/types";

const initialState = {
  projectlist: [],
  project: null,
  loading: true,
  errors: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROJECTS:
      return {
        ...state,
        projectlist: payload,
        loading: false,
      };
    case GET_PROJECT:
      return {
        ...state,
        project: payload,
        loading: false,
      };
    case PROJECT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projectlist: state.projectlist.filter(
          (project) => project._id !== payload
        ),
        loading: false,
      };
    case CLEAR_PROJECT:
      return {
        ...state,
        projectlist: [],
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
}
