import { SET_MOBILE_OPEN, SET_LOADING, STOP_LOADING, SET_ERRORS, CLEAR_ERRORS, SET_CREATE, CLEAR_CREATE} from "../actions/types";


const INIT_STATE = {
  loading: false,
  mobileOpen: false,
  createNew: false
};

export default (state = INIT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING: {
      return {
        ...state,
        loading: true
      };
    }

    case STOP_LOADING: {
      return {
        ...state,
        loading: false
      };
    }

    case SET_ERRORS: {
      return {
        ...state,
        errors: payload
      };
    }

    case CLEAR_ERRORS: {
      return {
        ...state,
        errors: {}
      };
    }
    
    case SET_MOBILE_OPEN: {
      return {
        ...state,
        mobileOpen: payload
      };
    }
    
    
    
    case SET_CREATE: {
      return {
        ...state,
        createNew: true
      };
    }
    
    case CLEAR_CREATE: {
      return {
        ...state,
        createNew: false
      };
    }
    

    default:
      return state;
  }
};
