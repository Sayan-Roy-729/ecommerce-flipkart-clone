import { userConstants } from './constants';
import axios from '../helpers/axios';

// ! Sign up
export const signup = (user) => {
  console.log('[User]', user);
  return async (dispatch) => {
    // request action creator (api call)
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    axios({
      method: 'POST',
      url: '/admin/signup',
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      },
    })
      .then((response) => {
        // success action creator
        if (response.status === 201) {
          const message = response.data.message;
          dispatch({
            type: userConstants.USER_REGISTER_SUCCESS,
            payload: { message: message },
          });
        }
        // error action creator
        if (response.status === 400) {
          dispatch({
            type: userConstants.USER_REGISTER_FAILURE,
            payload: { error: response.data.error },
          });
        }
      })
      .catch((error) => {
        // error action creator
        dispatch({
          type: userConstants.USER_REGISTER_FAILURE,
          payload: { error: error },
        });
      });
  };
};
