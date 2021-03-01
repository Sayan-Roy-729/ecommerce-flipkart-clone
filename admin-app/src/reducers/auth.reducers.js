import { authConstants } from '../actions/constants';

// ! Initial State
const initialState = {
  token: null,
  userId: '',
  authenticate: false,
  signinError: null,
  authenticating: false,
  loading: false,
  error: null,
  message: ''
};

// ! Authentication Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // API Call Action
    case authConstants.LOGIN_REQUEST:
      return (state = {
        ...state,
        authenticating: true,
      });

    // Successful API Call Action
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        userId: action.payload.userId,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
      return state;

    case authConstants.LOGIN_FAILURE:
      return {
        ...initialState,
        signinError: action.payload.error,
      }

    // Logout Request Action
    case authConstants.LOGOUT_REQUEST:
      return {
        ...state,
        userId: '',
        loading: true,
      };

    // Logout Success Action
    case authConstants.LOGOUT_SUCCESS:
      return {
        ...initialState,
        userId: ''
      };

    // Logout Failure Action
    case authConstants.LOGOUT_FAILURE:
      return {
        ...state,
        userId: '',
        error: action.payload.error,
        loading: false
      };

    default:
      return state;
  }
};

export default authReducer;
