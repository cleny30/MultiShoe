import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doRequest, getUsername } from "../../utils/common";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { DEVICE_TYPE } from "../../constants/common";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCart,
  handleRemoveCartAsync,
  handleUpdateCartAsync,
  handleAddCartAsync,
} from "../CartShopping/cartSlice";
import cartEmpty from "../../assets/img/cart-empty.png";
import Popup from "../../components/Popup";
import Notification from "../../components/Notification/Notification";
import { toast } from "react-toastify";
import TableCartItem from "./TableCartItem";
export default function Cart() {
  const [res, setRes] = useState([]);
  const userName = getUsername();
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  async function getData(DEVICE_TYPE) {
    const response = await doRequest(
      "get",
      `api/Home/HomePage?deviceType=${DEVICE_TYPE}`
    );
    setRes(response.data.result);
  }

  const dispatch = useDispatch();
  const cartShopping = useSelector((state) => state.cart.carts.result) || [];
  const [totalPrice, setTotalPrice] = useState(0);

  const handleRemoveCart = (proId) => {
    dispatch(handleRemoveCartAsync(proId, userName));
  };

  const notify = (text) =>
    toast.error(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });

  const handleIncrease = (proId, size) => {
    // Filter the cartShopping array by proId
    const filteredItem = cartShopping.find((item) => item.proId === proId);
    // Check if quantity is less than quantityInStock
    if (filteredItem.quantity < filteredItem.quantityInStock) {
      dispatch(handleAddCartAsync(proId, userName, 1, size));
    } else {
      notify("The quantity in stock is insufficient for this item");
    }
  };

  const handleDecrease = (proId, quatity, size) => {
    if (quatity > 1) {
      dispatch(handleUpdateCartAsync(proId, userName, quatity - 1, size));
    } else if (quatity == 1) {
      openPopup(proId);
    }
  };

  useEffect(() => {
    const initialCheckedItems = {};
    cartShopping.forEach((item) => {
      initialCheckedItems[item.cartId] = false;
    });
    setCheckedItems(initialCheckedItems);
  }, [cartShopping]);
  useEffect(() => {
    dispatch(fetchCart(userName));
    getData(DEVICE_TYPE);
    localStorage.removeItem("cartItem");
  }, [dispatch]);

  // set popup error
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [proIdConfirm, setProIdConfirm] = useState();

  const openPopup = (proId) => {
    setIsPopupOpen(true);
    setProIdConfirm(proId);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const isConfirmfc = () => {
    handleRemoveCart(proIdConfirm);
    closePopup();
  };

  const handleSelectAll = () => {
    const updatedCheckedItems = {};
    const newIsCheckedAll = !isCheckedAll;
    cartShopping.forEach((item) => {
      updatedCheckedItems[item.cartId] = newIsCheckedAll;
    });
    setIsCheckedAll(newIsCheckedAll);
    setCheckedItems(updatedCheckedItems);
  };

  const handleCheckboxChange = (event) => {
    const itemId = event.target.value;
    const isChecked = event.target.checked;
    setCheckedItems((prevState) => {
      const updatedState = {
        ...prevState,
        [itemId]: isChecked,
      };
      const allChecked = Object.values(updatedState).every((item) => item);
      setIsCheckedAll(allChecked);
      return updatedState;
    });
  };
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartShopping.forEach((item) => {
      if (checkedItems[item.cartId]) {
        totalPrice += item.price; // Add the price to the total if checked
      }
    });
    return totalPrice;
  };

  // Call this function whenever checkedItems or cartShopping changes
  useEffect(() => {
    const totalPrice = calculateTotalPrice();
    setTotalPrice(totalPrice);
    // Filter out only the true keys and save to localStorage
    const checkedKeysToSave = Object.keys(checkedItems).filter(
      (key) => checkedItems[key]
    );

    localStorage.setItem("cartItem", checkedKeysToSave.join(","));
  }, [checkedItems, cartShopping]);

  return (
    <div className="overflow-x-hidden">
      <Notification />

      <Popup
        isOpen={isPopupOpen}
        handleClosePopup={closePopup}
        isConfirmPopup={true}
        isConfirmfc={isConfirmfc}
        text={`The current quantity of the product is 1. Do you want to remove it?`}
      />
      {res.length !== 0 && (
        <>
          <Header userName={userName} />
          {/* <!-- Breadcrumb Start --> */}
          <div className="container-fluid">
            <div className="row px-xl-5">
              <div className="col-12">
                <nav className="breadcrumb bg-light mb-30">
                  <Link className="breadcrumb-item text-dark" to="#">
                    Home
                  </Link>
                  <Link className="breadcrumb-item text-dark" to="#">
                    Shop
                  </Link>
                  <span className="breadcrumb-item active">Shopping Cart</span>
                </nav>
              </div>
            </div>
          </div>
          {/* <!-- Breadcrumb End --> */}
          {cartShopping.length == 0 ? (
            <div className="m-auto w-fit text-center">
              <img src={cartEmpty} alt="" />
              <h3>
                Your Cart has empty <br /> Click <Link to="/shop">here</Link> to
                shopping now
              </h3>
            </div>
          ) : (
            <TableCartItem
              cartShopping={cartShopping}
              isCheckedAll={isCheckedAll}
              checkedItems={checkedItems}
              handleSelectAll={handleSelectAll}
              handleCheckboxChange={handleCheckboxChange}
              handleDecrease={handleDecrease}
              handleIncrease={handleIncrease}
              handleRemoveCart={handleRemoveCart}
              totalPrice={totalPrice}
            />
          )}

          <Footer userName={userName} />
        </>
      )}
    </div>
  );
}
