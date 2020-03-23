import { SET_CURRENT_USER, USER_LOADING } from '../actions/types';
import User from '../models/User';

export interface Auth {
  isAuthenticated: boolean;
  user: User;
  loading: boolean;
}

const initialState: Auth = {
  isAuthenticated: false,
  user: {},
  loading: false
};

// TODO: add correct action annotation
export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: Object.keys(action.payload).length > 0,
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
