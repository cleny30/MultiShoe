import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { doRequest, getUsername } from "../../utils/common";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Card from "../../components/ProductCard";
import { HOMEFEATURE, DEVICE_TYPE } from "../../constants/common";
export default function Home() {
  const [res, setRes] = useState([]);
  const userName = getUsername();

  async function getData(DEVICE_TYPE) {
    const response = await doRequest(
      "get",
      `api/Home/HomePage?deviceType=${DEVICE_TYPE}`
    );
    setRes(response.data.result);
  }

  useEffect(() => {
    getData(DEVICE_TYPE);
  }, []);

  return useMemo(
    () => (
      <div className="home">
        {res.length !== 0 && (
          <>
            <Header res={res} userName={userName} productList={res.products} />
            {/* <!-- Carousel Start --> */}
            <div className="container-fluid mb-3">
              <div className="row px-xl-5">
                <div className="col-lg-8">
                  <div
                    id="header-carousel"
                    className="carousel slide carousel-fade mb-30 mb-lg-0"
                    data-ride="carousel"
                  >
                    <ol className="carousel-indicators">
                      <li
                        data-target="#header-carousel"
                        data-slide-to="0"
                        className="active"
                      ></li>
                      <li data-target="#header-carousel" data-slide-to="1"></li>
                    </ol>
                    <div className="carousel-inner">
                      <div className="carousel-item position-relative active home-carousel-item">
                        <img
                          className="position-absolute w-100 h-100 home-img-carousel"
                          src={require("../../assets/img/advertising_img/banner-converse1.png")}
                        />
                        <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                          <div className="p-3 home-carousel-caption">
                            <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                              Converse
                            </h1>
                            <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                              The Blank Canvas Monochrome Collection
                            </p>
                            <Link
                              className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                              to="/shop"
                            >
                              Shop Now
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item position-relative home-carousel-item">
                        <img
                          className="position-absolute w-100 h-100 home-img-carousel"
                          src={require("../../assets/img/advertising_img/banner-cover-vans.jpg")}
                        />
                        <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                          <div className="p-3 home-carousel-caption">
                            <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                              Vans{" "}
                              <small className="home-small">
                                "Off The Wall"
                              </small>
                            </h1>
                            <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                              "Off The Wall, On The Streets, In the Mall, On
                              Your Feet. <br />
                              We Gets You To Skate To The VANS SNEAKER BEAT!"
                            </p>
                            <Link
                              className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                              to="/shop"
                            >
                              Shop Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="product-offer mb-30 home-product-offer">
                    <img
                      className="img-fluid"
                      src={require("../../assets/img/advertising_img/banner-cover-converse.jpg")}
                      alt=""
                    />
                    <div className="offer-text">
                      <h6 className="text-white text-uppercase">Save 5%</h6>
                      <h3 className="text-white mb-3">Special Offer</h3>
                      <Link to="/shop" className="btn btn-primary">
                        Shop Now
                      </Link>
                    </div>
                  </div>
                  <div className="product-offer mb-30 home-product-offer">
                    <img
                      className="img-fluid"
                      src={require("../../assets/img/advertising_img/banner-cover-vans1.jpg")}
                      alt=""
                    />
                    <div className="offer-text">
                      <h6 className="text-white text-uppercase">Save 5%</h6>
                      <h3 className="text-white mb-3">Special Offer</h3>
                      <Link to="/shop" className="btn btn-primary">
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Carousel End --> */}

              {/* <!-- Featured Start --> */}
              <div className="container-fluid pt-5">
                <div className="row px-xl-5 pb-3">
                  {HOMEFEATURE.map((data, index) => (
                    <div
                      className="col-lg-3 col-md-6 col-sm-12 pb-1"
                      key={"item-" + index}
                    >
                      <div className="d-flex align-items-center bg-light mb-4 home-feature">
                        <h1 className={data.CLASS}></h1>
                        <h5 className="font-weight-semi-bold m-0">
                          {data.LABEL}
                        </h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* <!-- Featured End --> */}

              {/* <!-- Categories Start --> */}
              <div className="container-fluid pt-5">
                <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
                  <span className="bg-secondary pr-3">Brans</span>
                </h2>
                <div className="row px-xl-5 pb-3">
                  {res.brand.map(function fn(item) {
                    return (
                      <div
                        className="col-lg-3 col-md-4 col-sm-6 pb-1"
                        key={item.brandId}
                      >
                        <Link className="text-decoration-none" to="#">
                          <div className="cat-item d-flex align-items-center mb-4">
                            <div className="overflow-hidden home-brand-logo">
                              <img
                                className="img-fluid"
                                src={item.brandLogo}
                                alt=""
                              />
                            </div>
                            <div className="flex-fill pl-3">
                              <h6>{item.brand_name}</h6>
                              <small className="text-body">
                                {item.amountProduct} Products
                              </small>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* <!-- Categories End --> */}

              {/* <!-- Products Start --> */}
              <div className="container-fluid pt-5 pb-3">
                <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
                  <span className="bg-secondary pr-3">Featured Products</span>
                </h2>
                <div className="row px-xl-5">
                  <Card data={res.feature} userName={userName} />
                </div>
              </div>
            </div>
            {/* <!-- Products End --> */}

            {/* <!-- Offer Start --> */}
            <div className="container-fluid pt-5 pb-3">
              <div className="row px-xl-5">
                <div className="col-md-6">
                  <div className="product-offer mb-30 home-product-offer-2">
                    <img
                      className="img-fluid"
                      src={require("../../assets/img/advertising_img/banner-cover-buzz.png")}
                      alt=""
                    />
                    <div className="offer-text">
                      <h6 className="text-white text-uppercase">Save 5%</h6>
                      <h3 className="text-white mb-3">Special Offer</h3>
                      <Link to="/shop" className="btn btn-primary">
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="product-offer mb-30 home-product-offer-2">
                    <img
                      className="img-fluid"
                      src={require("../../assets/img/advertising_img/banner-cover-buzz1.png")}
                      alt=""
                    />
                    <div className="offer-text">
                      <h6 className="text-white text-uppercase">Save 5%</h6>
                      <h3 className="text-white mb-3">Special Offer</h3>
                      <Link to="/shop" className="btn btn-primary">
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Offer End --> */}

            {/* <!-- Products Start --> */}
            <div className="container-fluid pt-5 pb-3">
              <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
                <span className="bg-secondary pr-3">Sneaker Products</span>
              </h2>
              <div className="row px-xl-5">
                <Card data={res.sneaker} userName={userName} />
              </div>
            </div>
            <div className="container-fluid pt-5 pb-3">
              <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
                <span className="bg-secondary pr-3">Sandal Products</span>
              </h2>
              <div className="row px-xl-5">
                <Card data={res.sandal} userName={userName} />
              </div>
            </div>
            {/* <!-- Products End --> */}

            <Footer userName={userName} />
          </>
        )}
      </div>
    ),
    [res]
  );
}
