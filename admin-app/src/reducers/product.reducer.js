import { productConstants } from '../actions/constants';

const initialState = {
  loading: false,
  error: null,
  product: {},
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case productConstants.ADD_NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productConstants.ADD_NEW_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload.product,
      };
    case productConstants.ADD_NEW_PRODUCT_FAILURE:
      return {
        ...state,
        product: { ...state.product },
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default productReducer;
