import { CLEAR_PROJECT, GET_PROJECTS, PROJECT_ERROR } from "../actions/types";

const initialState = {
  projects: [],
  loading: true,
  errors: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: payload,
        loading: false,
      };
    case PROJECT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROJECT:
      return {
        ...state,
        projects: [],
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
}
