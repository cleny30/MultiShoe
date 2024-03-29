import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { doRequest, getUsername } from "../../utils/common";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Rating from "../Detail/rating";
import Suggest from "../Detail/suggest";
import DetailProduct from "../Detail/detail";
import { socialNetworks } from "../../constants/common";

const ProductDetail = () => {
  const [res, setRes] = useState([]);
  const userName = getUsername();
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

  async function getProductDetail() {
    const response = await doRequest(
      "get",
      `api/ProductDetail/ProductDetail?proId=${id}`
    );
    const sortedReviews = response.data.reviews.sort((a, b) => {
      if (a.userName === userName) return -1;
      if (b.userName === userName) return 1;
      return 0;
    });
    setReviews(sortedReviews);
    setRes(response.data);
  }

  const owlCarouselOptions = {
    loop: true,
    margin: 29,
    nav: false,
    autoplay: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      },
    },
  };

  useEffect(() => {
    getProductDetail();
  }, [id]);
  return useMemo(() => (
    <div className="detail">
      {res.length !== 0 && (
        <>
          <Header res={res} userName={userName} productList={res.productList} />
          {/* Breadcumb Start */}
          <div className="container-fluid">
            <div className="row px-xl-5">
              <div className="col-12">
                <nav className="breadcrumb bg-light mb-10">
                  <Link className="breadcrumb-item" to={"/"}>
                    <p className="text-dark ">Home</p>
                  </Link>
                  <Link className="breadcrumb-item" to={"/"}>
                    <p className="text-dark ">Shop</p>
                  </Link>
                  <span className="breadcrumb-item active">
                    {res.product.proName}
                  </span>
                </nav>
              </div>
            </div>
          </div>
          {/* Breadcumb end */}

          <div className="container-fluid pb-5">
            <div className="row px-xl-5">
              {/* Product's Detail Start */}
              <DetailProduct res={res} socialNetworks={socialNetworks} />
              {/* Product's Detail End */}
              <Rating
                res={res}
                reviews={reviews}
                userName={userName}
                getProductDetail={getProductDetail}
              />
            </div>
          </div>

          <Suggest res={res} owlCarouselOptions={owlCarouselOptions} />
          <Footer userName={userName} />
        </>
      )}
    </div>
  ));
};
export default ProductDetail;
