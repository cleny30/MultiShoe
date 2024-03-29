import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { getUsername } from "../../utils/common";
import { useSelector, useDispatch } from "react-redux";
import ErrorMess from "../../components/ErrorMess";
import { fetchCart, handleAddCartAsync } from "../CartShopping/cartSlice";
import Swal from "sweetalert2";
import Popup from "../../components/Popup";

const Detail = ({ res, socialNetworks }) => {
  const userName = getUsername(useSelector((state) => state));
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState();
  const [amount, setAmount] = useState(res.product.quantity);
  const cartShopping = useSelector((state) => state.cart.carts.result) || [];
  const dispatch = useDispatch();

  const handleIncrease = () => {
    const updatedQuantity = quantity + 1;
    setQuantity(updatedQuantity > amount ? amount : updatedQuantity);
  };

  const handleDecrease = () => {
    const updatedQuantity = quantity - 1;
    setQuantity(updatedQuantity < 1 ? 1 : updatedQuantity);
  };

  const handleQuantityChange = (e) => {
    let updatedQuantity = parseInt(e.target.value, 10) || 0;
    updatedQuantity = updatedQuantity > amount ? amount : updatedQuantity;
    updatedQuantity = updatedQuantity < 1 ? 1 : updatedQuantity;
    setQuantity(updatedQuantity);
  };

  const handleAddToCart = () => {
    if (userName != null) {
      if (size === undefined || size == 0) {
        setSize(0);
      } else if (currentCartquantity + quantity > res.product.quantity) {
        openPopup();
      } else {
        dispatch(
          handleAddCartAsync(res.product.proId, userName, quantity, size)
        );
        Swal.fire({
          position: "center",
          imageUrl: "https://cdn-icons-png.flaticon.com/512/3684/3684620.png",
          imageWidth: 280,
          icon: "success",
          title: "The product had been to cart",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      sessionStorage.setItem(
        "alert",
        "You must be login to add product to cart!"
      );
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    dispatch(fetchCart(userName));
    setAmount(res.product.quantity);
  }, [res, dispatch]);

  // check quantity cart before add
  const currentCartquantity = cartShopping.reduce((quantity, current) => {
    if (current.proId === res.product.proId) {
      return quantity + current.quantity;
    } else {
      return quantity;
    }
  }, 0);
  // set popup error
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <Popup
        isOpen={isPopupOpen}
        handleClosePopup={closePopup}
        text={`You already have ${currentCartquantity} item in your cart. Unable to add the selected quantity to the cart as it would exceed your purchase limit.`}
      />

      <div className="col-lg-5 mb-30">
        <div
          id="product-carousel"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner bg-light detail-img">
            <div>
              {res.product.proImg.map((img) => (
                <div
                  key={img}
                  className={`carousel-item ${
                    img === res.product.proImg[0] ? "active" : ""
                  }`}
                >
                  <img
                    className="pro-detail-img"
                    src={img}
                    alt={`Image ${img + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#product-carousel"
            data-slide="prev"
          >
            <i className="fa fa-2x fa-angle-left text-dark"></i>
          </a>
          <a
            className="carousel-control-next"
            href="#product-carousel"
            data-slide="next"
          >
            <i className="fa fa-2x fa-angle-right text-dark"></i>
          </a>
        </div>
      </div>

      <div className="col-lg-7 h-auto mb-30">
        <div className="h-100 bg-light p-30">
          <h3>{res.product.proName}</h3>
          <div className="d-flex mb-3"></div>
          {res.product.discount > 0 ? (
            <div>
              <h3 className="text-muted ml-2">
                <del className="discounted-price">${res.product.price}</del>
              </h3>
              <h2 className="font-weight-semi-bold mb-4">
                $
                {res.product.price -
                  (res.product.price * res.product.discount) / 100}
              </h2>
            </div>
          ) : (
            <h2 className="font-weight-semi-bold mb-4">${res.product.price}</h2>
          )}

          <div className="d-flex">
            <strong className="text-strong-bold text-dark mr-3">Origin:</strong>
            <p className="mr-4"> {res.product.origin}</p>

            <strong className="text-strong-bold text-dark mr-3">Brand:</strong>
            <p> {res.brandModel.brandName}</p>
          </div>
          <p className="mb-4">
            The product {res.product.proName} is designed with high quality, our
            shoes offer a smooth and comfortable experience, suitable for
            various occasions. Whether you're on the go or at work, these shoes
            are an excellent choice for both fashion enthusiasts and those in
            need of reliable footwear for daily activities.
          </p>
          <div className="d-flex mb-3">
            <strong className="text-dark mr-3">Sizes:</strong>
            <form>
              {Array.isArray(res.product.size) &&
                res.product.size.map((size, i) => (
                  <div
                    key={i}
                    className="custom-control custom-radio custom-control-inline"
                  >
                    <input
                      type="radio"
                      className="custom-control-input"
                      id={size}
                      value={size}
                      name="size"
                      onChange={(e) => setSize(e.target.value)}
                    />
                    <label className="custom-control-label" htmlFor={size}>
                      {" "}
                      {size}
                    </label>
                  </div>
                ))}
            </form>
          </div>
          {size == 0 && <ErrorMess text="Please select the Size" />}
          <div className="d-flex align-items-center mb-3">
            {res.product.quantity > 0 && res.product.isAvailable === true ? (
              <React.Fragment>
                <div className="buy-button mr-3 flex items-center mb-2">
                  <div>
                    <Button
                      className="btn-primary"
                      handleClickBtn={() => handleDecrease()}
                      text={<i className="fa fa-minus"></i>}
                    />
                  </div>
                  <Input
                    className="bg-secondary border-0 text-center mb-2"
                    value={quantity}
                    id="quan_input"
                    handleChange={(e) => handleQuantityChange(e)}
                  />
                  <div className="">
                    <Button
                      className="btn-primary"
                      handleClickBtn={() => handleIncrease()}
                      text={<i className="fa fa-plus"></i>}
                    />
                  </div>
                </div>

                <span
                  className="btn btn-outline-dark btn-square"
                  data-pro_quan_available={res.product.quantity}
                  data-pro_id={res.product.proId}
                  id="ProductDetail_quan"
                  data-quan_input="1"
                  onClick={handleAddToCart}
                >
                  <i className="fa fa-shopping-cart"></i>
                </span>

                {res.product.quantity === 1 ? (
                  <div
                    className="number-product ml-3"
                    id="p-quan-avai"
                    data-product_quan={res.product.quantity}
                  >
                    {res.product.quantity} product available
                  </div>
                ) : (
                  <div
                    className="number-product ml-3"
                    id="p-quan-avai"
                    data-product_quan={res.product.quantity}
                  >
                    {res.product.quantity} products available
                  </div>
                )}
              </React.Fragment>
            ) : (
              <div className="number-product ml-3 text-danger ">
                <strong>Product is unavailable</strong>
              </div>
            )}
          </div>

          <div className="d-flex pt-2">
            <div className="d-inline-flex">
              {socialNetworks.map((network) => (
                <Link
                  key={network.link}
                  className="text-dark px-2"
                  to={network.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={network.icon}></i>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
