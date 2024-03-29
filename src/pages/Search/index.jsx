import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doRequest, getUsername } from "../../utils/common";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Card from "../../components/ProductCard";
import SideBar from "../../components/SideBar/SideBar";
import OrderFilter from "../../components/OrderFilter/OrderFilter";
import PageNavigation from "../../components/PageNavigation/PageNavigation";
import { SORT_TYPE } from "../../constants/common";

export default function Shop() {
  const [res, setRes] = useState([]);
  const [pro, setPro] = useState([]);
  const { searchTerm } = useParams();

  const [sort, setSort] = useState(null);
  const [order, setOrder] = useState(0);
  const [category, setCategory] = useState(null);
  const [brand, setBrand] = useState(null);
  const [price, setPrice] = useState(null);

  const [totalPage, setTotalPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const userName = getUsername();

  async function getData() {
    const response = await doRequest(
      "get",
      `api/SearchProduct/?searchTerm=${searchTerm}`
    );
    setRes(response.data.result);

    setTotalPage(Math.ceil(response.data.result.product.length / itemsPerPage));

    setPro(response.data.result.product.slice(startIndex, endIndex));
  }

  const handleCheckboxChange = (event, type) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    switch (type) {
      case "category":
        setCategory((prevSelected) =>
          isChecked
            ? [...(prevSelected || []), value]
            : prevSelected !== null
              ? prevSelected.filter((item) => item !== value)
              : null
        );

        break;
      case "brand":
        setBrand((prevSelected) =>
          isChecked
            ? [...(prevSelected || []), value]
            : prevSelected !== null
              ? prevSelected.filter((item) => item !== value)
              : null
        );
        break;
      case "sort":
        setSort(isChecked ? [value] : null);
        break;
      case "price":
        setPrice(isChecked ? [value] : null);
        break;
      default:
        break;
    }
  };

  const filterProduct = () => {
    let data = res.product;
    let combineProduct = [];

    const calculateDiscountedPrice = (product) =>
      product.price - (product.price * product.discount) / 100;

    if (order !== SORT_TYPE.DEFAULT) {
      data.sort((a, b) => {
        return (
          order * (calculateDiscountedPrice(b) - calculateDiscountedPrice(a))
        );
      });
    }

    if (price !== null && price != -1) {
      const [_priceMin, _priceMax] = JSON.parse(price).map(Number);
      data = data.filter(
        (product) =>
          calculateDiscountedPrice(product) > _priceMin &&
          calculateDiscountedPrice(product) < _priceMax
      );
    }

    if (sort !== null) {
      data = data.filter((product) => product.discount > 0);
    }

    if (category !== null && category.length > 0) {
      const categoryId = category.map(Number);
      data = data.filter((product) => categoryId.includes(product.cateId));
    }

    if (brand !== null && brand.length > 0) {
      const brandId = brand.map(Number);
      data = data.filter((product) => brandId.includes(product.brandId));
    }

    combineProduct = data;

    let currentItems = [];
    if (combineProduct != null && combineProduct != []) {
      currentItems = combineProduct.slice(startIndex, endIndex);
      setTotalPage(Math.ceil(combineProduct.length / itemsPerPage));
      if (combineProduct.length <= itemsPerPage || currentItems.length == 0) {
        setCurrentPage(1);
      }
    }

    setPro(currentItems);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleOrderChange = (newOrder) => {
    setOrder(newOrder);
  };

  const handleChangeItemPerPage = (value) => {
    setItemsPerPage(value);
  };

  useEffect(() => {
    if (res.length == 0) {
      getData();
    }
    filterProduct();
  }, [res, category, brand, sort, price, order, currentPage, itemsPerPage]);
  return (
    <div className="shop">
      {res.length !== 0 && (
        <>
          <Header res={res} userName={userName} productList={res.products} />
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
                  <span className="breadcrumb-item active">Shop List</span>
                </nav>
              </div>
            </div>
          </div>
          {/* <!-- Breadcrumb End --> */}
          {/* <!-- Shop Start --> */}
          <div className="container-fluid">
            <div className="row px-xl-5">
              {/* <!-- Shop Sidebar Start --> */}
              <SideBar res={res} handleCheckboxChange={handleCheckboxChange} />
              {/* <!-- Shop Sidebar End --> */}
              {/* <!-- Shop Product Start --> */}
              <div className="col-lg-9 col-md-8">
                <div className="row pb-3">
                  <OrderFilter
                    order={order}
                    handleOrderChange={handleOrderChange}
                    handleChangeItemPerPage={handleChangeItemPerPage}
                  />
                  {/* Card product list start */}
                  {pro != null && pro.length > 0 ? (
                    <Card data={pro} />
                  ) : (
                    <div className="col-12 text-center mb-5">
                      <h3>There are no products available</h3>
                    </div>
                  )}
                  {/* Card product list end */}
                  <PageNavigation
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                    totalPage={totalPage}
                  />
                </div>
              </div>
              {/* <!-- Shop Product End --> */}
            </div>
          </div>
          {/* <!-- Shop End --> */}
          <Footer userName={userName} />
        </>
      )}
    </div>
  );
}
