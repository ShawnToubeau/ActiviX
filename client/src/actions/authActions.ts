import axios, { AxiosResponse } from 'axios';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types';
import { Dispatch, AnyAction } from 'redux';

// Models
import User from '../models/User';
// Actions
import setAuthToken from '../utils/setAuthToken';
import { routerActions } from 'connected-react-router';

// Sign up user
export const signUpUser = (userData: User) => (dispatch: Dispatch): void => {
  axios
    .post('/users', userData)
    .then((res: AxiosResponse) => {
      // dispatch(routerActions.go('/login'));
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
export const loginUser = (userData: User) => (dispatch: Dispatch): void => {
  axios
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
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
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

// Logout User
export const logoutUser = () => (dispatch: Dispatch): void => {
  // Remove token from localstorage
  localStorage.removeItem('jwtToken');
  // Remove Axios auth header
  setAuthToken(null);
  // Remove user data
  dispatch(setCurrentUser({}));
};
