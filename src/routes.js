import Home from "./pages/Home";
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import SignUp from "./pages/SignUp";
import Shop from "./pages/Shop";
import Search from "./pages/Search";
import Favorite from "./pages/FavoriteProduct";
import Cart from "./pages/CartShopping";
import Checkout from "./pages/Checkout";
import postCheckout from "./pages/postCheckout";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: Detail,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/shop",
    name: "Shop",
    component: Shop,
  },
  {
    path: "/search/:searchTerm",
    name: "Search",
    component: Search,
  },
  {
    path: "/favorite",
    name: "Favorite",
    component: Favorite,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
  },
  {
    path: "/postCheckout",
    name: "postCheckout",
    component: postCheckout,
  },
];

export { routes };
