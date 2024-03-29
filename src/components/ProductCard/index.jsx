import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from 'react-redux';
import { getUsername } from "../../utils/common";
import { fetchFavorites, handleAddFavoriteAsync } from '../../pages/FavoriteProduct/favoriteSlice'; // Thay đổi đường dẫn đến slice của Redux
import Swal from "sweetalert2";

export default function ProductCard({ data }) {
  const userName = getUsername();
  const favorite = useSelector(state => state.favorite.favorites);
  const dispatch = useDispatch();

  const addProduct = async (e, proId) => {
    if (userName !== null) {
      handleAddFavorite(proId);
      e.target.style.display = "none";
      Swal.fire({
        icon: "success",
        title: "Add favorite sucessfull!",
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      sessionStorage.setItem("alert", "You must be login to add favorite product!")
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    dispatch(fetchFavorites(userName)); // Gọi hàm fetchData từ Redux để lấy dữ liệu yêu thích
  }, [dispatch]);

  const handleAddFavorite = (proId) => {
    dispatch(handleAddFavoriteAsync(proId, userName));
  };

  return (
    <>
      {data.map(function fn(item) {
        return (
          <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={item.proId}>
            <div className="product-item bg-light mb-4">
              <div className="product-img position-relative overflow-hidden">
                <img className="img-fluid w-100" src={item.proImg[0]} alt="" />
                <div className="product-action">
                  {favorite &&
                    !favorite.find(
                      (product) => product.proId == item.proId
                    ) && (
                      <Link className="btn btn-outline-dark btn-square" to="#" onClick={(e) => addProduct(e, item.proId)}>
                        <i className="fa fa-heart cursor-none pointer-events-none"></i>
                      </Link>
                    )}
                  <Link className="btn btn-outline-dark btn-square" to={`/detail/${item.proId}`}>
                    <i className="fa fa-search"></i>
                  </Link>
                </div>
              </div>
              <div className="text-center py-4">
                <Link className="h6 text-decoration-none text-truncate" to="#">
                  {item.proName}
                </Link>

                {item.discount > 0 ? (
                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <h5>${item.price - (item.price * item.discount) / 100}</h5>
                    <h6 className="text-muted ml-2">
                      <del>${item.price}</del>
                    </h6>
                  </div>
                ) : (
                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <h5>${item.price}</h5>
                  </div>
                )}
                <div className="d-flex align-items-center justify-content-center mb-1">
                  <small className="fa fa-star text-primary mr-1"></small>
                  <small className="fa fa-star text-primary mr-1"></small>
                  <small className="fa fa-star text-primary mr-1"></small>
                  <small className="fa fa-star text-primary mr-1"></small>
                  <small className="fa fa-star text-primary mr-1"></small>
                  <small>(99)</small>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
