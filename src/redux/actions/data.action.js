

import axios from "axios";
import { env_vars } from '../../utils/config';



export const uploadFile = (data) => dispatch => {
  //  dispatch(fetchStart());
  return axios.post(`${env_vars.api_url}/tbl_cervixexamination/file-upload`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
};

export const verifyProjectName = (data) => dispatch => {
  //  dispatch(fetchStart());
  return axios.post(`${env_vars.api_url}/deployment/verify`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
};


export const deleteProject = (data) => dispatch => {
  const isAuthenticated = localStorage.getItem('token');
  
  //  dispatch(fetchStart());
  return axios.put(`${env_vars.api_url}/file/delete`, data, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${isAuthenticated}`
    },
  })
};


export const sslCertificate = (data) => dispatch => {
  //  dispatch(fetchStart());
  return axios.post(`${env_vars.api_url}/file/ssl`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
};

