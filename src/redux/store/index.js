import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import dataReducer from '../reducers/data.reducer';
import uiReducer from '../reducers/ui.reducer';
import authReducer from '../reducers/auth.reducer';

const rootReducer = combineReducers({
  data: dataReducer,
  ui: uiReducer,
  auth: authReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
