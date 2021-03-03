import axios from '../helpers/axios';
import { categoryConstants } from './constants';

// ! Get All Categories Action
export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });

    const res = await axios.get('category/getcategory');

    if (res.status === 200) {
      // const { categoryList } = res.data;
      // console.log('[category.action.js]', res.data.categoryList);
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories: res.data.categoryList },
      });
    } else {
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
        payload: { error: (await res).data.error },
      });
    }
  };
};

// ! Send to server Category Data
export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({
      type: categoryConstants.ADD_NEW_CATEGORY_REQUEST,
    });

    const token = localStorage.getItem('token');
    if (!token) {
      dispatch({
        type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
        payload: { error: 'token is not valid' },
      });
    }

    const res = await axios({
      method: 'POST',
      url: 'category/create',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: form,
    });

    if (res.status === 201) {
      dispatch({
        type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
        payload: { category: res.data.category },
      });
    } else {
      dispatch({
        type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

// ! Update the categories
export const updateCategories = (form) => {
  return async (dispatch) => {

    // const token = localStorage.getItem('token');
    // if (!token) {
    //   dispatch({
    //     type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
    //     payload: { error: 'token is not valid' },
    //   });
    // }
    console.log('updatedCategories action');
    const res = await axios({
      method: 'POST',
      url: 'category/update',
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      data: form,
    });

    if (res.status === 201) {
      console.log(res);
    } else {
      console.log(res);
    }
  };
};
