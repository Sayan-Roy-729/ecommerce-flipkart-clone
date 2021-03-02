import { productConstants } from '../actions/constants';

const initialState = {
  loading: false,
  error: null,
  product: {},
  products: []
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
    case productConstants.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.products
      }
    default:
      return state;
  }
};

export default productReducer;
