import configureStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import jwt_decode from 'jwt-decode';
import moxios from 'moxios';
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from '../types';
import {
  signUpUser,
  loginUser,
  setCurrentUser,
  setUserLoading,
  logoutUser
} from './authActions';
import { initialState, Auth } from '../../reducers/authReducer';
import { AnyAction } from 'redux';

const middlewares = [thunk];
const mockStore = configureStore<Auth, ThunkDispatch<Auth, any, AnyAction>>(
  middlewares
);

const mockJWT =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODIyNzFjNDBkMDE2MDAwNDNmYWQ2NSIsIm5hbWUiOiJTaGF3biIsImlhdCI6MTU4NTg1MTk3NSwiZXhwIjoxNjE3NDA4OTAxfQ.2vO3s6L3v_xsIzvsvEPvSR0RXYneLydQLvbF5Dx05-Q';

describe('Auth Action Tests', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('Should dispatch SET_CURRENT_USER action', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          token: mockJWT
        }
      });
    });

    const reduxStore = mockStore(initialState);

    const mockUser = {
      email: 'user@email.com',
      password: 'password'
    };

    const expectedAction = [
      {
        type: SET_CURRENT_USER,
        payload: jwt_decode(mockJWT)
      }
    ];

    return reduxStore.dispatch(loginUser(mockUser)).then(() => {
      expect(reduxStore.getActions()).toEqual(expectedAction);
    });
  });
});
