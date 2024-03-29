import React from "react";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Notification from "../../components/Notification/Notification";
export default function TableCartItem({
  cartShopping,
  isCheckedAll,
  checkedItems,
  handleSelectAll,
  handleCheckboxChange,
  handleDecrease,
  handleIncrease,
  handleRemoveCart,
  totalPrice,
}) {
  const navigate = useNavigate();
  const isAnyOutOfStock = cartShopping.some(
    (item) => item.quantityInStock === 0
  );

  const notify = (text) =>
    toast.warning(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });

  const handleProcesChechout = () => {
    let cartItem = localStorage.getItem("cartItem");
    let cartItemList = cartItem != "" ? cartItem.split(",") : null;
    if (cartItemList != null) {
      navigate("/checkout");
    } else {
      notify("You haven't chosen any product to buy yet.");
    }
  };
  return (
    <>
      <Notification />
      <div className="row px-xl-5">
        <div className="col-12 flex justify-between">
          <table className="cart-table bg-white !w-[70%] ml-[15px] rounded-xl table shadow-md">
            <thead className="text-[17px] bg-[#3d464d] text-white">
              <th className="text-center w-13">
                <div className="flex justify-center">
                  <label
                    className="relative flex items-center rounded-full cursor-pointer !mb-1"
                    htmlFor="red"
                  >
                    <input
                      type="checkbox"
                      className={`before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:bg-red-500 checked:before:bg-red-500 hover:before:opacity-10 
                      ${isAnyOutOfStock ? "!cursor-not-allowed	" : ""}`}
                      id="red"
                      onChange={() => handleSelectAll()}
                      checked={isCheckedAll}
                      disabled={isAnyOutOfStock}
                    />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        stroke-width="1"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                </div>
              </th>
              <th>Products</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </thead>
            <tbody>
              {cartShopping.map((item) => (
                <tr>
                  <td className="align-middle text-center">
                    <div className="inline-flex items-center">
                      <label
                        className={`relative flex items-center p-3 rounded-full cursor-pointer ${
                          item.quantityInStock === 0 ? "hidden" : ""
                        }`}
                        htmlFor="red"
                      >
                        <input
                          type="checkbox"
                          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-red transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:bg-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                          id="red"
                          value={item.cartId}
                          checked={checkedItems[item.cartId] || false}
                          onChange={(e) => handleCheckboxChange(e)}
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            stroke-width="1"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      </label>
                      <p
                        className={`bg-gray-500 text-white p-2 rounded-[20px] ${
                          item.quantityInStock > 0 ? "hidden" : ""
                        }`}
                      >
                        Out of stock
                      </p>
                    </div>
                  </td>
                  <td>
                    <Link
                      to={`/detail/${item.proId}`}
                      className="flex items-center text-[#3d464d] hover:text-[#3d464d] hover:no-underline"
                    >
                      <img
                        src={item.proImg}
                        alt=""
                        className="w-[100px] mr-3"
                      />
                      <div>
                        <span
                          className={`font-medium ${
                            item.quantityInStock === 0 ? "text-red-500" : ""
                          }`}
                        >
                          {item.proName}
                        </span>
                        <br />
                        <span>Size {item.size}</span>
                      </div>
                    </Link>
                  </td>
                  <td className="align-middle text-lg">
                    ${item.price / item.quantity}
                  </td>
                  <td className="align-middle">
                    <div className="d-flex align-items-center">
                      <div className="input-group quantity !w-[130px]">
                        <div className="input-group-btn">
                          <button
                            className="btn btn-primary btn-minus"
                            onClick={() =>
                              handleDecrease(
                                item.proId,
                                item.quantity,
                                item.size
                              )
                            }
                            disabled={item.quantityInStock === 0}
                          >
                            <i className="fa fa-minus"></i>
                          </button>
                        </div>
                        <input
                          type="text"
                          className="form-control bg-secondary border-0 text-center"
                          value={item.quantity}
                          disabled={item.quantityInStock === 0}
                        />
                        <div className="input-group-btn">
                          <button
                            className="btn btn-primary btn-plus"
                            onClick={() =>
                              handleIncrease(item.proId, item.size)
                            }
                            disabled={item.quantityInStock === 0}
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle text-lg max-w-5">
                    ${item.price}
                  </td>
                  <td className="align-middle">
                    <Button
                      text={<i className="fa solid fa-trash"></i>}
                      className="btn mt-0"
                      handleClickBtn={() => handleRemoveCart(item.proId)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bg-white w-[25%] mr-[15px] p-4 h-fit rounded-xl shadow-md">
            <div className="flex justify-between font-semibold text-2xl text-[#3D464D]">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
            <Button
              text="Proceed To Checkout"
              className="btn-common-lg btn-primary font-medium w-full"
              handleClickBtn={() => handleProcesChechout()}
            />
          </div>
        </div>
      </div>
    </>
  );
}
