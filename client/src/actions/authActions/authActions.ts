import axios, { AxiosResponse } from 'axios';
import jwt_decode from 'jwt-decode';
import { Dispatch, AnyAction } from 'redux';
import { routerActions } from 'connected-react-router';

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from '../types';
import setAuthToken from '../../utils/setAuthToken';

// Interfaces
import User from '../../models/User';

// Sign up user
export const signUpUser = (userData: User) => (dispatch: Dispatch): void => {
  axios
    .post('/users', userData)
    .then((res: AxiosResponse) => {
      // Redirect to login on successful sign up
      dispatch(routerActions.push('/login'));
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Login user
export const loginUser = (userData: User) => (dispatch: Dispatch) => {
  return axios
    .post('/login', userData)
    .then((res: AxiosResponse) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      // Set Axios auth header
      setAuthToken(token);
      const decodedToken = jwt_decode(token);
      // Set user
      dispatch(setCurrentUser(decodedToken));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

// Set user
export const setCurrentUser = (decoded: unknown): AnyAction => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Loading user
export const setUserLoading = (): {} => {
  return {
    type: USER_LOADING
  };
};

// Logout user
export const logoutUser = (): AnyAction => {
  // Remove token from localstorage
  localStorage.removeItem('jwtToken');
  // Remove Axios auth header
  setAuthToken(null);
  // Remove user data
  return {
    type: SET_CURRENT_USER,
    payload: {}
  };
};
