import { CLEAR_DATA, LOGOUT_USER, SET_AUTH_USER, SET_DATA } from "../actions/types";

const INIT_STATE = {
  isAuthenticated: false,
  user: {},
  searchString: '',
};

export default (state = INIT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {

    case SET_AUTH_USER: {
      return {
        ...state,
        user: payload
      };
    }


    case LOGOUT_USER: {
      return {
        ...state,
        user: {},
        isAuthenticated: false
      };
    }

    case SET_DATA: {
      return {
        ...state,
        data: payload
      };
    }
    case CLEAR_DATA: {
      return {
        ...state,
        data: []
      };
    }
  
    default:
      return state;
  }
};
