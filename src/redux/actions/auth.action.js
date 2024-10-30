
import { LOGOUT_USER, SET_AUTHENTICATED, SET_AUTH_USER, SET_DATA } from "../redux/types";

import axios from "axios";
import { env_vars } from '../../utils/config';
import { checkAuth, removeUserSession, setUserSession } from "../../utils/commonData";
import { updateInUseBy } from "../redux/data.action";


export const loginUser = ({ username, password, loginType }) => dispatch => {
  let localMachine = localStorage.getItem('machinedetails');
  let machinedetails = localMachine ? JSON.parse(localMachine) : {};


  return axios.post(`${env_vars.api_url}/auth/signin?loginType=${loginType}`, {
    username,
    password,
    ...machinedetails
  }).then(response => {
    setUserSession(response.data.token, response.data.user);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    return dispatch(getAuthUser());
  }).catch(err => {
    if (err.response && (err.response.status === 401 || err.response.status === 400)) {
      return { message: err.response.data.message }
    } else {
      return { message: "Something went wrong. Please Try again later" }
    }
  })
};

export const createUpdateUser = (props) => dispatch => {
  return axios.post(`${env_vars.api_url}/tbl_userdetails`, props);
};

export const getAuthUser = (props) => dispatch => {

  return axios.get(`${env_vars.api_url}/auth`)
    .then(res => {
      if (res && res.data) {
        setUserSession(res.data.token, res.data.user);
        dispatch({ type: SET_AUTH_USER, payload: res.data.user })
        dispatch({ type: SET_AUTHENTICATED });
      }

      dispatch(updateInUseBy('remove'))
      // dispatch({ type: SET_DATA, payload: res.data })
      return res.data;
    }).catch(err => {
      if (!checkAuth(err)) {
        removeUserSession()
        dispatch({ type: LOGOUT_USER })
        window.location = '/login?session=expired'
      };
      dispatch({ type: SET_DATA, payload: [] });
      return null
    })
};


export const getPasswordToday = (props) => dispatch => {

  return axios.get(`${env_vars.api_url}/auth/passwordtoday`)
    .then(res => {
      let { passwordToday } = res.data;
      console.log(res.data, 'RESSD')
      return passwordToday;
    }).catch(err => {
      console.log(err)
      return null
    })
};


export const getLicenseCode = (props) => dispatch => {

  return axios.get(`${env_vars.api_url}/auth/gencode`)
    .then(res => {
      let { genCode } = res.data;
      console.log(res.data, 'RESSD')
      return genCode;
    }).catch(err => {
      console.log(err)
      return null
    })
};


export const activateLicenseCode = (props) => dispatch => {

  return axios.post(`${env_vars.api_url}/auth/activatecode`, { key: props })
};



export const getUserAccessTypes = (props) => dispatch => {

  return axios.get(`${env_vars.api_url}/auth/accesstypes`)
};
