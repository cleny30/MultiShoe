import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import cartEmpty from "../../assets/img/cart-empty.png";
import {
  fetchFavorites,
  handleRemoveFavoriteAsync,
} from "../../pages/FavoriteProduct/favoriteSlice"; // Thay đổi đường dẫn đến slice của Redux
import { fetchCart, handleRemoveCartAsync } from "../CartShopping/cartSlice";
import { fetchHeader } from "./headerSlice";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default function Header({ userName }) {
  const [isDropdow, setIsDropdow] = useState(false);
  const [isDropdowMB, setIsDropdowMB] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataSearch, setDataSearch] = useState([]);

  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favorite.favorites);
  const cartShopping = useSelector((state) => state.cart.carts.result) || [];
  const totalCart = cartShopping.reduce((acc, item) => {
    if (item.quantityInStock > 0) {
      return acc + item.price;
    } else {
      return acc;
    }
  }, 0);
  const header = useSelector((state) => state.header.headers);
  useEffect(() => {
    dispatch(fetchFavorites(userName));
    dispatch(fetchCart(userName));
    dispatch(fetchHeader());
  }, [dispatch]);

  const handleRemoveCart = (e, proId) => {
    e.preventDefault();
    dispatch(handleRemoveCartAsync(proId, userName));
  };
  const handleRemoveFavorite = async (e, proId) => {
    e.preventDefault();
    const confirmationResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmationResult.isConfirmed) {
      try {
        await Swal.fire({
          title: "Deleted!",
          text: "Your comment has been deleted.",
          icon: "success",
        });
        dispatch(handleRemoveFavoriteAsync(proId, userName));
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          title: "Error",
          text: "An error occurred while deleting the review or getting product details.",
          icon: "error",
        });
      }
    }
  };

  const handleSearch = () => {
    setDataSearch([]);
    if (searchTerm.length >= 4) {
      const filterDataSearch = header.products.filter((product) =>
        product.proName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDataSearch(filterDataSearch);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("username");
    Cookies.remove("username", { path: "/" });
    window.location.reload();
  };

  // dropdow MB
  useEffect(() => {
    function handleResize() {
      const windowWidth = window.innerWidth;
      setIsDropdowMB(windowWidth < 990);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    handleSearch();
    return () => window.removeEventListener("resize", handleResize);
  }, [searchTerm]);
  return (
    <div>
      <div className="container-fluid">
        <div className="row bg-secondary py-1 px-xl-5">
          <div className="col-lg-6 d-none d-lg-block"></div>
          <div className="col-lg-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-light dropdown-toggle"
                  data-toggle="dropdown"
                >
                  My Account
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  {userName == null ? (
                    <Fragment>
                      <button className="dropdown-item" type="button">
                        <Link to="/login">Sign in</Link>
                      </button>

                      <button className="dropdown-item" type="button">
                        <Link to="/signup">Sign up</Link>
                      </button>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <button className="dropdown-item" type="button">
                        <Link to="/Account/MyAccount">Manage Account</Link>
                      </button>
                      <button className="dropdown-item" type="button">
                        <Link to="/" onClick={() => handleLogout()}>
                          Logout
                        </Link>
                      </button>
                    </Fragment>
                  )}
                </div>
              </div>

              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-light dropdown-toggle"
                  data-toggle="dropdown"
                >
                  EN
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  <button className="dropdown-item" type="button">
                    VN
                  </button>
                </div>
              </div>
            </div>
            <div className="d-inline-flex align-items-center d-block d-lg-none">
              <Link to="#" className=".favoriteHeart btn px-0 ml-2">
                <i className="fas fa-heart text-dark"></i>
                <span className="badge text-dark border border-dark rounded-circle header-span-nav">
                  {/* Favorite Count */}
                  {favorite.length}
                </span>
              </Link>
              <Link to="#" className="btn px-0 ml-2">
                <i className="fas fa-shopping-cart text-dark"></i>
                <span className="badge text-dark border border-dark rounded-circle header-span-nav">
                  0
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
          <div className="col-lg-4">
            <Link to="#" className="text-decoration-none">
              <span className="h1 text-uppercase text-primary bg-dark px-2">
                Multi
              </span>
              <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">
                Shop
              </span>
            </Link>
          </div>
          <div className="col-lg-4 col-6 text-left">
            <form action="">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for products"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="input-group-append">
                  <Link
                    className="input-group-text bg-transparent text-primary no-underline"
                    to={`/Search/${searchTerm}`}
                  >
                    <i className="fa fa-search"></i>
                  </Link>
                </div>
              </div>
            </form>
            <div className="search-results" id="search-results">
              {dataSearch.length > 0 && (
                <div className="sproduct-list d-block" id="product-list">
                  {dataSearch.map((item) => (
                    <Link
                      className="product"
                      to={`/detail/${item.proId}`}
                      key={item.proId}
                    >
                      <img src={item.proImg[0]} alt="" />
                      <div className="p-details">
                        <h2>{item.proName}</h2>
                        {item.discount > 0 ? (
                          <h3>
                            ${item.price - (item.price * item.discount) / 100}
                          </h3>
                        ) : (
                          <h3>${item.price}</h3>
                        )}
                      </div>
                    </Link>
                  ))}
                  <Link
                    className="see-details"
                    to={`/Search/${searchTerm}`}
                    onClick={() => setSearchTerm("")}
                  >
                    <div className="divider"></div>
                    <br />
                    <p>See more details</p>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-4 col-6 text-right">
            <p className="m-0">Customer Service</p>
            <h5 className="m-0">+012 345 6789</h5>
          </div>
        </div>
      </div>
      {/* <!-- Topbar End --> */}

      {/* <!-- Navbar Start --> */}
      <div className="container-fluid bg-dark mb-30">
        <div className="row px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <Link
              className="btn d-flex align-items-center justify-content-between bg-primary w-100 header-category-nav"
              data-toggle="collapse"
              to="#"
              onClick={() => setIsDropdow(!isDropdow)}
            >
              <h6 className="text-dark m-0">
                <i className="fa fa-bars mr-2"></i>Categories
              </h6>
              <i className="fa fa-angle-down text-dark"></i>
            </Link>
            {!isDropdow ? (
              ""
            ) : (
              <nav
                className={`position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light`}
                id="navbar-vertical"
              >
                {header.category.map(function fn(cate) {
                  return (
                    <div className="navbar-nav w-100">
                      <div className="nav-item dropdown dropright">
                        <Link
                          to="#"
                          className="nav-link dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          {cate.cateName}
                          <i
                            className="fa fa-angle-right float-right mt-1"
                            key={cate.cateId}
                          ></i>
                        </Link>
                        <div className="dropdown-menu position-absolute rounded-0 border-0 m-0">
                          {header.brand.map(function fn(brand) {
                            return (
                              <Link
                                to="#"
                                className="dropdown-item"
                                key={brand.brandId}
                              >
                                {brand.brandName}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </nav>
            )}
          </div>
          <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
              <Link to="" className="text-decoration-none d-block d-lg-none">
                <span className="h1 text-uppercase text-dark bg-light px-2">
                  Multi
                </span>
                <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">
                  Shop
                </span>
              </Link>
              <button
                type="button"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarCollapse"
                onClick={() => setIsDropdowMB(!isDropdowMB)}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              {isDropdowMB ? (
                ""
              ) : (
                <div className="navbar-collapse justify-content-between" id="">
                  <div className="navbar-nav mr-auto py-0">
                    <Link to="/" className="nav-item nav-link active">
                      Home
                    </Link>
                    <Link to="/shop" className="nav-item nav-link">
                      Shop
                    </Link>
                    <Link to="/cart" className="nav-item nav-link">
                      Cart
                    </Link>
                    <Link to="/checkout" className="nav-item nav-link">
                      Checkout
                    </Link>
                  </div>
                  <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                    <Link
                      className="favoriteHeart btn px-0 relative"
                      to="/favorite"
                    >
                      <i className="fas fa-heart text-primary"></i>
                      <span
                        className="badge text-secondary border border-secondary rounded-circle"
                        style={{ paddingBottom: "2px" }}
                      >
                        {/* Favorite count */}
                        {favorite.length}
                      </span>
                      {/* favorite product */}
                      <div className="favoriteform w-[450px] h-[700px] bg-white absolute z-[999] right-0">
                        <div className="absolute right-0 top-0 mt-4 mr-3 text-[#3d464d] font-semibold text-sm">
                          &#10005;
                        </div>
                        <p className="text-xl m-4 text-[#3d464d]">
                          Favourite Product
                        </p>
                        <div className="overflow-x-auto h-[580px]">
                          {userName !== null ? (
                            favorite.length > 0 ? (
                              favorite.map((item, index) => {
                                return (
                                  <Link
                                    key={"favorite" + index}
                                    className="flex text-left border-b relative mt-3 text-[#3d464d] hover:text-[#3d464d] hover:no-underline"
                                    to={`/detail/${item.proId}`}
                                  >
                                    <img
                                      src={item.proImg[0]}
                                      alt=""
                                      width={"130px"}
                                      className="m-2 mr-4"
                                    />
                                    <div>
                                      <p className="text-[17px] font-medium mt-1 my-2">
                                        {item.proName}
                                      </p>
                                      <p className="text-[16px] my-2">
                                        Price:
                                        <span className="font-medium text-[#ff7f50] ml-2">
                                          $
                                          {item.price -
                                            (item.price * item.discount) / 100}
                                        </span>
                                        {item.discount > 0 && (
                                          <span className="m-1 text-[12px] line-through">
                                            ${item.price}
                                          </span>
                                        )}
                                      </p>
                                    </div>
                                    <button
                                      className="btn absolute bottom-0 right-0 underline hover:!text-red-400 "
                                      onClick={(e) =>
                                        handleRemoveFavorite(e, item.proId)
                                      }
                                    >
                                      Remove
                                    </button>
                                  </Link>
                                );
                              })
                            ) : (
                              <p>No product available</p>
                            )
                          ) : (
                            <p>
                              Please <Link to="/login">Login</Link> to see your
                              favorite product
                            </p>
                          )}
                        </div>
                        <Link
                          to="/favorite"
                          className="p-2 mt-2 btn-dark block"
                        >
                          View all ({favorite.length})
                        </Link>
                      </div>
                      {/* end favorite product */}
                    </Link>
                    <Link to="/cart" className="cartIcon btn px-0 ml-3">
                      <i className="fas fa-shopping-cart text-primary"></i>
                      <span
                        className="badge text-secondary border border-secondary rounded-circle"
                        style={{ paddingBottom: "2px" }}
                      >
                        {cartShopping.length}
                      </span>
                      {/* cart product */}

                      {cartShopping != [] && (
                        <div className="cartShopping w-[450px] h-[700px] bg-white absolute z-[999] right-0">
                          <div className="absolute right-0 top-0 mt-4 mr-3 text-[#3d464d] font-semibold text-sm">
                            &#10005;
                          </div>
                          <p className="text-xl m-4 text-[#3d464d]">
                            Shopping Cart
                          </p>
                          <div className="overflow-x-auto h-[580px]">
                            {userName !== null ? (
                              <>
                                {cartShopping.length == 0 ? (
                                  <div className="m-auto w-fit text-center">
                                    <img
                                      src={cartEmpty}
                                      alt=""
                                      className="w-[200px] m-auto"
                                    />
                                    <h4>
                                      Your Cart has empty <br /> Click{" "}
                                      <Link to="/shop">here</Link> to shopping
                                      now
                                    </h4>
                                  </div>
                                ) : (
                                  cartShopping.map((item, index) => {
                                    return (
                                      <Link
                                        to={`/detail/${item.proId}`}
                                        key={"cartShopping" + index}
                                        className="flex text-left border-b relative mt-3 text-[#3d464d] hover:text-[#3d464d] hover:no-underline"
                                      >
                                        <img
                                          src={item.proImg}
                                          alt=""
                                          width={"130px"}
                                          className="m-2 mr-4"
                                        />
                                        <div>
                                          <p
                                            className={`text-[17px] font-medium mt-1 my-2`}
                                          >
                                            {item.proName}
                                            <span className="font-medium ml-2">
                                              | Size {item.size}
                                            </span>
                                          </p>
                                          <p className="text-[16px] my-2">
                                            Price:
                                            <span className="font-medium text-[#ff7f50] ml-2">
                                              ${item.price / item.quantity}
                                            </span>
                                          </p>
                                          <p className="text-[16px] ">
                                            Quantity:
                                            <span className="font-medium ml-2">
                                              {item.quantityInStock > 0 ? (
                                                item.quantity
                                              ) : (
                                                <span className="bg-red-400 text-white p-2 rounded-full">
                                                  Out of stock
                                                </span>
                                              )}
                                            </span>
                                          </p>
                                        </div>
                                        <button
                                          className="btn absolute bottom-0 right-0 underline hover:!text-red-400 "
                                          onClick={(e) =>
                                            handleRemoveCart(e, item.proId)
                                          }
                                        >
                                          Remove
                                        </button>
                                      </Link>
                                    );
                                  })
                                )}
                              </>
                            ) : (
                              <p>
                                Please <Link to="/login">Login</Link> to see
                                your cart
                              </p>
                            )}
                          </div>
                          <div className="bg-white shadow-2xl">
                            <div className="flex justify-between font-semibold mx-3 py-[10px] text-lg">
                              <span>Subtotal</span>
                              <span className="text-[#ff7f50]">
                                ${totalCart}
                              </span>
                            </div>
                            <Link to="/cart" className="p-2 btn-dark block">
                              View cart detail ({cartShopping.length})
                            </Link>
                          </div>
                        </div>
                      )}
                      {/* end cart product */}
                    </Link>
                  </div>
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>

      {/* <!-- Navbar End --> */}
    </div>
  );
}
