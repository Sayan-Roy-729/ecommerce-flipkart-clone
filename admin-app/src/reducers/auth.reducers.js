import { authConstants } from '../actions/constants';

// ! Initial State
const initialState = {
  token: null,
  userId: '',
  authenticate: false,
  authenticating: false,
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

    // Logout Action
    case authConstants.LOGOUT_REQUEST:
      return initialState;

    default:
      return state;
  }
};

export default authReducer;
