import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { doRequest, getUsername } from "../../utils/common";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Input from "../../components/Input";
import Texarea from "../../components/Textarea";
import Button from "../../components/Button";
import dataProvince from "../../constants/provinces.json";
import dataDistrict from "../../constants/districts.json";
import dataWard from "../../constants/wards.json";
import { fetchCart } from "../CartShopping/cartSlice";
import List from "../../components/Address/List";
import Create from "../../components/Address/Create";
import Edit from "../../components/Address/Edit";
import NotificationEmptyCart from "./notificationEmptyCart";

export default function Checkout() {
  const userName = getUsername();
  const navigate = useNavigate();

  const [deliveryAddress, setDeliveryAddress] = useState([]);
  const [addressIdSelected, setAddressIdSelected] = useState("");

  const [isCartEmpty, setIscartEmpty] = useState(false);

  const [showChangeAddressForm, setShowChangeAddressForm] = useState(false);
  const [showAddNewAddressForm, setShowAddNewAddressForm] = useState(false);
  const [showUpdateAddressForm, setShowUpdateAddressForm] = useState(false);

  const [idToUpdate, setIdToUpdate] = useState("");

  const [cartIdCheckout, setCartIdCheckout] = useState([]);
  const dispatch = useDispatch();
  const cartShopping = useSelector((state) => state.cart.carts.result) || [];
  let totalPrice = 0;

  const [addressId, setAddressId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [note, setNote] = useState("");

  async function getDeliveryAddress() {
    const response = await doRequest(
      "get",
      `api/DeliveryAddress/GetAddressList?username=${userName}`
    );
    const defaultAddress = response.data.result.find(
      (address) => address.isDefault === true
    );
    setDeliveryAddress(response.data.result);
    setFullName(defaultAddress.fullname);
    setPhoneNumber(defaultAddress.phoneNumber);
    setAddress(
      [defaultAddress.specificAddress, defaultAddress.address].join(", ")
    );
    setAddressIdSelected(defaultAddress.id);
  }

  const handleChangeAddressIdRadio = (e) => {
    setAddressIdSelected(e.target.value);
  };

  const handleChangeAddress = () => {
    const selectedAddress = deliveryAddress.find(
      (p) => p.id == addressIdSelected
    );
    setAddressId(addressIdSelected);
    setFullName(selectedAddress.fullname);
    setPhoneNumber(selectedAddress.phoneNumber);
    setAddress(
      [selectedAddress.specificAddress, selectedAddress.address].join(", ")
    );
    setShowChangeAddressForm(false);
  };

  useEffect(() => {
    let cartItem = localStorage.getItem("cartItem");
    if (userName != null && cartItem != null && cartItem !== "") {
      let cartItemList = cartItem != "" ? cartItem.split(",") : null;
      setCartIdCheckout(cartItemList);
      dispatch(fetchCart(userName));
      getDeliveryAddress();
    } else if (userName == null) {
      sessionStorage.setItem("alert", "You must be login before checkout");
      navigate("/login");
    } else {
      setIscartEmpty(true);
    }
  }, []);

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const openChangeAddressForm = () => {
    setShowChangeAddressForm(true);
  };

  const closeChangeAddressForm = () => {
    setShowChangeAddressForm(false);
    setAddressIdSelected(addressId);
  };

  const openAddNewAddressForm = () => {
    setShowAddNewAddressForm(true);
    closeChangeAddressForm();
  };

  const closeAddNewAddressForm = () => {
    setShowAddNewAddressForm(false);
    openChangeAddressForm();
  };

  const openUpdateAddressForm = (id) => {
    setIdToUpdate(id);
    setShowUpdateAddressForm(true);
    closeChangeAddressForm();
  };

  const closeUpdateAddressForm = () => {
    setShowUpdateAddressForm(false);
    openChangeAddressForm();
  };

  const handleCheckout = async () => {
    const response = await doRequest("post", `api/Order/CheckOut`, {
      data: {
        userName: userName,
        totalPrice: totalPrice,
        orderDes: note || null,
        status: 0,
        address: address,
        phoneNumber: phoneNumber,
        fullName: fullName,
        cartId: localStorage.getItem("cartItem").toString(),
      },
    });
    if (response.data.isSuccess === true) {
      localStorage.removeItem("cartItem");
      sessionStorage.setItem("completeCheckout", true);
      navigate("/postCheckout");
    }
  };
  const ItemToCheckout = cartShopping
    .filter((p) => cartIdCheckout?.includes(p.cartId.toString()))
    .map((item) => {
      totalPrice += item.price;
      return (
        <div className="flex justify-between" key={item.cartId}>
          <span>
            {item.quantity} x {item.proName}
          </span>{" "}
          <span>{item.price}</span>
        </div>
      );
    });
  return (
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
              <span className="breadcrumb-item active">Checkout</span>
            </nav>
          </div>
        </div>
      </div>
      {/* <!-- Breadcrumb End --> */}
      <div className="row px-xl-5 ">
        <div className="col-12 flex justify-between ">
          <div className="bg-white w-[70%] mr-[15px] p-4 h-fit rounded-xl shadow-md text-black">
            <div>
              <div className="ml-auto w-fit">
                <Button
                  className="!text-[#3d464c] !text-[20px] font-bold !bg-[#eeeeee] hover:!bg-[#9b9b98] "
                  text={
                    <>
                      <ion-icon className="" name="location-outline"></ion-icon>{" "}
                      <span className="!text-[16px] ">Change address</span>
                    </>
                  }
                  handleClickBtn={() => openChangeAddressForm()}
                />
              </div>
              <div className="row">
                <div className="col-md-6 form-group">
                  <Input label={"Name"} value={fullName} />
                </div>
                <div className="col-md-6 form-group">
                  <Input label={"Phone number"} value={phoneNumber} />
                </div>
                <div className="col-md-12 ">
                  <Input label={"Address"} value={address} />
                </div>
                <div className="col-md-7 mt-4">
                  <label htmlFor="texarea ">Note:</label>
                  <Texarea
                    cols={100}
                    rows={4}
                    className="border-[#ced4da] border-[1px] outline-none p-2 resize-none w-[100%]"
                    handleChange={(e) => handleNoteChange(e)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white w-[25%] mr-[15px] p-4 h-fit rounded-xl shadow-md">
            <div>
              <div>
                <p className="font-bold text-black">Products</p>
                <div>{ItemToCheckout}</div>
                <hr />
                <div className="flex justify-between">
                  <p className="font-bold text-black">Total price:</p>
                  <span className="font-bold text-black">${totalPrice}</span>
                </div>
              </div>
              <Button
                text="Place Order"
                className="btn-common-lg btn-primary font-medium w-full"
                handleClickBtn={() => handleCheckout()}
              />
            </div>
          </div>
        </div>
      </div>
      {showChangeAddressForm && (
        <List
          addressIdSelected={addressIdSelected}
          closeChangeAddressForm={closeChangeAddressForm}
          deliveryAddress={deliveryAddress}
          handleChangeAddress={handleChangeAddress}
          handleChangeAddressIdRadio={handleChangeAddressIdRadio}
          openAddNewAddressForm={openAddNewAddressForm}
          openUpdateAddressForm={openUpdateAddressForm}
        />
      )}

      {showAddNewAddressForm && (
        <Create
          closeAddNewAddressForm={closeAddNewAddressForm}
          getDeliveryAddress={getDeliveryAddress}
        />
      )}

      {showUpdateAddressForm && (
        <Edit
          idToUpdate={idToUpdate}
          deliveryAddress={deliveryAddress}
          closeUpdateAddressForm={closeUpdateAddressForm}
          getDeliveryAddress={getDeliveryAddress}
        />
      )}

      {isCartEmpty && <NotificationEmptyCart />}
      <Footer userName={userName} />
    </>
  );
}
