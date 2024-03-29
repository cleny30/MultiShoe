import React, { Fragment } from "react";
import { SIDEBAR_FILTER, PRICERANGE } from "../../constants/common";

export default function SideBar({ res, handleCheckboxChange }) {
  return (
    <>
      <div className="col-lg-3 col-md-4">
        {/* <!-- Popularity Start --> */}
        <h5 className="section-title position-relative text-uppercase mb-3">
          <span className="bg-secondary pr-3">Filter by price</span>
        </h5>
        <div className="bg-light p-4 mb-30">
          <form>
            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
              <input
                type="checkbox"
                name="price-radio"
                className="custom-control-input"
                id="sort"
                value="discount"
                onChange={(e) => handleCheckboxChange(e, "sort")}
              />
              <label className="custom-control-label" htmlFor="sort">
                On Sale
              </label>
              <span className="badge border font-weight-normal">
                {res.saleAmount}
              </span>
            </div>
          </form>
        </div>
        {/* <!-- Popularity Start --> */}
        {SIDEBAR_FILTER.map((init) => (
          <Fragment key={init.TITLE}>
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Filter by {init.TITLE}</span>
            </h5>
            <div className="bg-light p-4 mb-30">
              <form>
                {res[init.DATA] ? (
                  res[init.DATA].map((item) => (
                    <div
                      key={`${init.ID}${item[`${init.ATR}Id`]}`}
                      className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
                    >
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        value={`${item[`${init.ATR}Id`]}`}
                        id={`${init.ID}${item[`${init.ATR}Id`]}`}
                        onChange={(e) =>
                          handleCheckboxChange(e, `${init.DATA}`)
                        }
                      />
                      <label
                        className="custom-control-label"
                        htmlFor={`${init.ID}${item[`${init.ATR}Id`]}`}
                      >
                        {item[init.LABEL]}
                      </label>
                      <span className="badge border font-weight-normal">
                        {item.amountProduct}
                      </span>
                    </div>
                  ))
                ) : (
                  <p>No data available for {init.TITLE}</p>
                )}
              </form>
            </div>
          </Fragment>
        ))}

        {/* <!-- Price Start --> */}
        <h5 className="section-title position-relative text-uppercase mb-3">
          <span className="bg-secondary pr-3">Filter by price</span>
        </h5>
        <div className="bg-light p-4 mb-30">
          <form>
            <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
              <input
                type="radio"
                name="price-radio"
                className="custom-control-input"
                defaultChecked
                id="price-all"
                value="-1"
                onChange={(e) => handleCheckboxChange(e, "price")}
              />
              <label className="custom-control-label" htmlFor="price-all">
                All Price
              </label>
            </div>
            {PRICERANGE.map((item) => (
              <div
                key={"ID " + item.INDEX}
                className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3"
              >
                <input
                  type="radio"
                  className="custom-control-input"
                  id={`price-${item.INDEX}`}
                  name="price-radio"
                  value={item.VALUE}
                  onChange={(e) => handleCheckboxChange(e, "price")}
                />
                <label
                  className="custom-control-label"
                  htmlFor={`price-${item.INDEX}`}
                >
                  {item.LABEL}
                </label>
              </div>
            ))}
          </form>
        </div>
        {/* <!-- Price End --> */}
      </div>
    </>
  );
}
