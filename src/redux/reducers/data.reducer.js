import { SET_PROJECTS, CLEAR_PROJECTS, SET_PROJECT_NAME, CLEAR_PROJECT_NAME } from "../actions/types";


const INIT_STATE = {
  projects: [],
  searchString: '',
  projectName: '',
  projectId: ''

};

export default (state = INIT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
   
    case SET_PROJECTS: {
      return {
        ...state,
        projects: payload
      };
    }
    case CLEAR_PROJECTS: {
      return {
        ...state,
        projects: []
      };
    }
    case SET_PROJECT_NAME: {
      return {
        ...state,
        projectName: payload.projectName,
        projectId: payload.projectId
      };
    }
    case CLEAR_PROJECT_NAME: {
      return {
        ...state,
        projectName: '',
        projectId: ''
      };
    }
    
    default:
      return state;
  }
};
