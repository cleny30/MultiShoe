import React from "react";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";

const Suggest = ({ res, owlCarouselOptions }) => {
  return (
    <>
      {" "}
      <div className="container-fluid py-5">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">You May Also Like</span>
        </h2>
        <div className="row px-xl-5">
          <div className="col">
            <OwlCarousel
              className="owl-carousel related-carousel d-flex"
              {...owlCarouselOptions}
            >
              {res.pro_cate.map((item) => (
                <div key={item.proId} className="product-item bg-light">
                  <div className="product-img position-relative overflow-hidden">
                    <img
                      className="img-fluid w-100"
                      src={item.proImg[0]}
                      alt=""
                    />
                    <div className="product-action">
                      <Link className="btn btn-outline-dark btn-square" to="#">
                        <i className="fa fa-sync-alt"></i>
                      </Link>
                      <Link
                        className="btn btn-outline-dark btn-square"
                        to={`/detail/${item.proId}`}
                      >
                        <i className="fa fa-search"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="text-center py-4">
                    <Link
                      className="h6 text-decoration-none text-truncate"
                      to={`/detail/${item.proId}`}
                    >
                      {item.proName}
                    </Link>

                    <div className="d-flex align-items-center justify-content-center mt-2">
                      {item.discount > 0 ? (
                        <>
                          <h5>
                            $
                            {Math.round(
                              item.price - (item.price * item.discount) / 100,
                              2
                            )}
                          </h5>
                          <h6 className="text-muted ml-2">
                            <del>${item.price}</del>
                          </h6>
                        </>
                      ) : (
                        <h5>${item.price}</h5>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default Suggest;
