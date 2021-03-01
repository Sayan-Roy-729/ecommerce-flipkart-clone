import axios from '../helpers/axios';
import { productConstants } from './constants';

// ! Add new product actions
export const addProduct = (form) => {
  return async (dispatch) => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch({
        type: productConstants.ADD_NEW_PRODUCT_FAILURE,
        payload: { error: 'token is invalid' },
      });
    }

    console.log(form);

    const res = await axios({
      method: 'POST',
      url: 'product/create',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: form,
    });

    if (res.status === 201) {
      dispatch({
        type: productConstants.ADD_NEW_PRODUCT_SUCCESS,
        payload: {
          product: res.data,
        },
      });
    } else {
      dispatch({
        type: productConstants.ADD_NEW_PRODUCT_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};
