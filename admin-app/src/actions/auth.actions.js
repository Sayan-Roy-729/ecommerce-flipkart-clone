import { authConstants } from './constants';
import axios from '../helpers/axios';

// ! Login
export const login = (user) => {
  console.log('[User]', user);
  return async (dispatch) => {
    // request action creator (api call)
    let token;
    let userId;

    dispatch({ type: authConstants.LOGIN_REQUEST });
    axios({
      method: 'POST',
      url: '/admin/signin',
      data: {
        email: user.email,
        password: user.password,
      },
    })
      .then((response) => {
        // success action creator
        if (response.status === 200) {
          token = response.data.token;
          userId = response.data.userId;
          // Store Data into localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
          dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: { token, userId },
          });
        }
        // error action creator
        if (response.status === 401) {
          dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: { error: response.data.error },
          });
        }
      })
      .catch((error) => {
        // error action creator
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error: error },
        });
      });
  };
};

// ! Check user is logged in or not
export const isUserLoggedIn = () => {
  return async (dispatch) => {
    try {
      // Check user and token is valid or not
      const token = localStorage.getItem('token');
      axios({
        method: 'POST',
        url: '/admin/tokenvalidation',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          userId: localStorage.getItem('userId'),
        },
      })
        .then((response) => {
          if (response.status === 200) {
            dispatch({
              type: authConstants.LOGIN_SUCCESS,
              payload: {
                token: token,
                userId: localStorage.getItem('userId'),
              },
            });
          } else {
            localStorage.clear();
            dispatch({
              type: authConstants.LOGIN_FAILURE,
              payload: { error: 'Failed to login' },
            });
          }
        })
        .catch((error) => {});
    } catch (error) {
      localStorage.clear();
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: 'Failed to login' },
      });
    }
  };
};

// ! Sign out
export const signout = () => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGOUT_REQUEST,
    });
    const token = localStorage.getItem('token');
    axios({
      method: 'POST',
      url: '/admin/signout',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.clear();
          dispatch({
            type: authConstants.LOGOUT_SUCCESS,
          });
        } else {
          localStorage.clear();
          dispatch({
            type: authConstants.LOGOUT_FAILURE,
            payload: { error: response.data.error },
          });
        }
      })
      .catch((error) => {
        localStorage.clear();
        dispatch({
          type: authConstants.LOGOUT_FAILURE,
          payload: { error: error },
        });
      });

    // localStorage.clear();
    // dispatch({ type: authConstants.LOGOUT_REQUEST });
  };
};
