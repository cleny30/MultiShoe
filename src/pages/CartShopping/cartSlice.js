import { createSlice } from '@reduxjs/toolkit';
import { doRequest } from '../../utils/common';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    carts: [],
    loading: false, // Thêm trạng thái loading để theo dõi quá trình fetching
  },
  reducers: {
    setCart(state, action) {
      state.carts = action.payload;
      state.loading = false; 
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setCart, setLoading } = cartSlice.actions;

export const fetchCart = (username) => async (dispatch) => {
  try {
    dispatch(setLoading(true)); 
    const response = await doRequest(
      'get',
      `api/Cart/GetCartByUserName?username=${username}`
    );
    const carts = response.data;
    dispatch(setCart(carts));
  } catch (error) {
    console.error('Error fetching cart:', error);
    dispatch(setLoading(false)); 
  }
};

export const handleAddCartAsync = (proId, userName, quantity, size) => async (dispatch) => {
  try {
    const response = await doRequest("post", "api/Cart/AddToCart", {
      data: {cartId: 0, userName: userName, proId: proId, proName: "string", proImg: "string", quantity: quantity, price: 0, size: size },
    });
    dispatch(fetchCart(userName));
  } catch (error) {
    console.error('Error adding cart shopping:', error);
  }
};

export const handleRemoveCartAsync = (proId, userName) => async (dispatch) => {
  try {
    const response = await doRequest(
      "delete",
      `api/Cart/DeleteItemInCart?username=${userName}&proId=${proId}`
    );
    dispatch(fetchCart(userName)); 
  } catch (error) {
    console.error('Error removing cart shopping:', error);
  }
};

export const handleUpdateCartAsync = (proId, userName, quatity, size) => async (dispatch) => {
  try {
    const response = await doRequest("post", "/api/Cart/UpdateItemInCart", {
      data: {cartId: 0, userName: userName, proId: proId, proName: "string", proImg: "string", quantity: quatity, price: 0, size: size },
    });
    dispatch(fetchCart(userName));
} catch (error) {
    console.error('Error removing cart shopping:', error);
  }
};

export default cartSlice.reducer;
