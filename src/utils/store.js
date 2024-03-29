import { configureStore } from "@reduxjs/toolkit";
import favoriteSlice from "../pages/FavoriteProduct/favoriteSlice";
import cartSlice from "../pages/CartShopping/cartSlice";
import headerSlice from "../pages/layout/headerSlice";
export default configureStore({
  reducer: {
    favorite: favoriteSlice,
    cart: cartSlice,
    header: headerSlice
  },
});
