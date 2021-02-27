import { userConstants } from '../actions/constants';

const initialState = {
  error: '',
  message: '',
  loading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.USER_REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      return state;
    case userConstants.USER_REGISTER_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
        loading: false,
      };
      return state;
    case userConstants.USER_REGISTER_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      return state;
    default:
      return state;
  }
};

export default userReducer;
