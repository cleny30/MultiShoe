import React from "react";
import { SORT_TYPE, PRODUCT_SHOWING } from "../../constants/common";

export default function OrderFilter({
  order,
  handleOrderChange,
  handleChangeItemPerPage,
}) {
  return (
    <>
      <div className="col-12 pb-1">
        <div className="d-flex align-items-center justify-content-end mb-4">
          <div className="ml-2">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm btn-light dropdown-toggle"
                data-toggle="dropdown"
              >
                Showing
              </button>
              <div className="dropdown-menu dropdown-menu-right">
                {PRODUCT_SHOWING.map((item, index) => (
                  <span
                  key={'item-' + index}
                    className="dropdown-item"
                    onClick={() => handleChangeItemPerPage(item.VALUE)}
                  >
                    {item.VALUE}
                  </span>
                ))}
              </div>
            </div>
            <div className="btn-group ml-2">
              <button
                type="button"
                className="btn btn-sm btn-light dropdown-toggle"
                data-toggle="dropdown"
              >
                Sorting:{" "}
                <span id="sort-order" className="font-weight-bold">
                  {order === SORT_TYPE.DEFAULT
                    ? "Default"
                    : order === SORT_TYPE.HIGHEST
                    ? "Highest"
                    : "Lowest"}
                </span>
              </button>
              <div className="dropdown-menu dropdown-menu-right">
                <span
                  id="sort-Default "
                  className={`dropdown-item ${
                    order === SORT_TYPE.DEFAULT ? "font-weight-bold" : ""
                  }`}
                  onClick={() => {
                    handleOrderChange(SORT_TYPE.DEFAULT);
                  }}
                >
                  Default
                </span>
                <span
                  id="sort-highest"
                  className={`dropdown-item ${
                    order === SORT_TYPE.HIGHEST ? "font-weight-bold" : ""
                  }`}
                  onClick={() => {
                    handleOrderChange(SORT_TYPE.HIGHEST);
                  }}
                  data-order="highest"
                >
                  Highest
                </span>
                <span
                  id="sort-lowest"
                  className={`dropdown-item ${
                    order === SORT_TYPE.LOWEST ? "font-weight-bold" : ""
                  }`}
                  onClick={() => {
                    handleOrderChange(SORT_TYPE.LOWEST);
                  }}
                  data-order="lowest"
                >
                  Lowest
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
