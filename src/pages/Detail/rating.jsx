import React from "react";
import AddReview from "../../components/AddReview/addReview";
import { useState, useEffect } from "react";
import { Image } from "cloudinary-react";
import { doRequest } from "../../utils/common";
import Swal from "sweetalert2";

const Rating = ({ res, reviews, userName, getProductDetail }) => {
  const [isToggle, setIsToggle] = useState(false);
  const [filteredReviews, setfilteredReviews] = useState("");
  const [isShowUpdateForm, setIsShowUpdateForm] = useState(false);
  const [isShowPopupImage, setIsShowPopupImage] = useState(false);
  const [imgToShow, setImgToShow] = useState("");
  const [toggleTab, setToggleTab] = useState(true);
  const handleDelete = async () => {
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

        await DeleteReview();
        await getProductDetail();
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

  async function DeleteReview() {
    const response = await doRequest(
      "delete",
      `api/Review/DeleteReview?reviewId=${filteredReviews.reviewId}`
    );
    if (response.isSuccess === true) {
      const firstMediaElement = document.querySelector(".media.mb-4");

      // Check if the element exists before attempting to remove it
      if (firstMediaElement) {
        firstMediaElement.remove();
      }
    }
  }

  const ToggleFormUpdate = () => {
    setIsShowUpdateForm(!isShowUpdateForm);
  };

  const ShowPoppupImage = (value) => {
    setIsShowPopupImage(true);
    setImgToShow(value);
  };

  const handleChangeTab = () => {
    setToggleTab(!toggleTab);
  };

  const renderReviewImages = (review) => {
    const imageElements = [];

    for (let i = 1; i <= 3; i++) {
      const imgKey = `img${i}`;

      if (review[imgKey]) {
        imageElements.push(
          <span
            key={imgKey}
            className="w-[100px]"
            onClick={() => ShowPoppupImage(review[imgKey])}
          >
            <Image cloudName="dklkzeill" publicId={review[imgKey]} />
          </span>
        );
      }
    }

    return <div className="gallery flex">{imageElements}</div>;
  };

  useEffect(() => {
    const matchingReview = reviews.find(
      (review) => review.userName === userName
    );

    if (matchingReview) {
      setfilteredReviews(matchingReview);
    } else {
      setfilteredReviews("");
    }
  }, [res, userName]);
  return (
    <>
      <div className="col">
        <div className="bg-light p-30">
          <div className="nav nav-tabs mb-4">
            <span
              className={`nav-item nav-link text-dark cursor-pointer ${toggleTab ? "active" : ""
                }`}
              onClick={() => handleChangeTab()}
            >
              Description
            </span>
            <span
              className={`nav-item nav-link text-dark cursor-pointer ${!toggleTab ? "active" : ""
                }`}
              onClick={() => handleChangeTab()}
            >
              Reviews ({res.reviewCount})
            </span>
          </div>
          <div className="tab-content">
            <div
              className={`tab-pane fade ${toggleTab ? "show active" : ""}`}
              id="tab-pane-1"
            >
              <h4 className="mb-3"> {res.product.proName} Description</h4>
              <p> {res.product.description}</p>
            </div>

            <div
              className={`tab-pane fade ${!toggleTab ? "show active" : ""}`}
              id="tab-pane-2"
            >
              <div className="row">
                <div className="col-md-4">
                  <h4>Customer reviews</h4>
                  <div className="d-flex">
                    <div className="text-primary mb-2">
                      {[...Array(5)].map((_, index) => {
                        const o = index + 1;
                        const difference = o - res.product.ratingAverage;

                        if (difference > 0 && difference <= 0.9) {
                          return (
                            <i key={o} className="fas fa-star-half-alt"></i>
                          );
                        } else if (o <= res.product.ratingAverage) {
                          return <i key={o} className="fas fa-star"></i>;
                        } else {
                          return <i key={o} className="far fa-star"></i>;
                        }
                      })}
                    </div>
                    <h6 className="ml-2">
                      {res.product.ratingAverage} out of 5
                    </h6>
                  </div>
                  <p>({res.reviewCount}) Global ratings</p>
                  <div>
                    {res.ratingDistribution.map((item, index) => (
                      <div key={index} className="d-flex align-items-center">
                        <span className="mr-2">{item.rating} Star</span>
                        <div className="progress-line1 progress">
                          <div
                            className={`progress-bar bg-warning progress-bar-${item.percentage}`}
                            role="progressbar"
                            style={{ width: `${item.percentage}%` }}
                            aria-valuenow={item.percentage}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <span
                          className="ml-2"
                          id="progressbarStar"
                        >{`${item.percentage}%`}</span>
                      </div>
                    ))}
                  </div>

                  <AddReview
                    proId={res.product.proId}
                    filteredReviews={filteredReviews}
                    isShowUpdateForm={isShowUpdateForm}
                    getProductDetail={getProductDetail}
                    ToggleFormUpdate={ToggleFormUpdate}
                  />
                </div>

                <div className="review-scroll col-md-8">
                  {reviews.length !== 0 ? (
                    reviews.map((review, index) => (
                      <div key={index} className="media mb-4">
                        <img
                          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                          alt="Image"
                          className="avatar img-fluid mr-3 mt-1 rounded-circle"
                        />
                        <div className="media-body">
                          <h6>
                            <span
                              className={`${review.userName == userName
                                ? "text-[#eea96a]"
                                : ""
                                }`}
                            >
                              {review.userName}
                            </span>
                            <small>
                              {" - "}
                              <i>
                                {new Date(review.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </i>
                            </small>
                            {review.userName == userName && (
                              <>
                                <span
                                  className="ml-4 cursor-pointer relative"
                                  onClick={() => setIsToggle(!isToggle)}
                                >
                                  <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                                  {isToggle && (
                                    <div className="absolute left-0 border-2 rounded-xl p-2">
                                      <button
                                        className="mb-3 w-16 text-left"
                                        onClick={ToggleFormUpdate}
                                      >
                                        <i className="fa solid fa-pen"></i>
                                        <span className="ml-2">Edit</span>
                                      </button>
                                      <br />
                                      <button
                                        className="w-20 text-left"
                                        onClick={handleDelete}
                                      >
                                        <i className="fa solid fa-trash"></i>
                                        <span className="ml-2">Delete</span>
                                      </button>
                                    </div>
                                  )}
                                </span>
                              </>
                            )}
                          </h6>
                          <div className="text-primary mb-2">
                            {[...Array(5)].map((_, k) => (
                              <i
                                key={k}
                                className={
                                  k < review.rating
                                    ? "fas fa-star"
                                    : "far fa-star"
                                }
                              ></i>
                            ))}
                          </div>
                          <p>{review.content}</p>
                          <div className="media-footer">
                            <div className="gallery flex">
                              {renderReviewImages(review)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="media mb-4 text-center d-flex align-items-center justify-content-center ">
                      <p className="not-review-alert">
                        No Reviews Yet!
                        <br />
                        Be the first to leave a review for this amazing product.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isShowPopupImage && (
        <div className="fixed top-0 left-0 bg-[rgba(0,0,0,.9)] h-[100%] w-[100%] z-[100]">
          <span
            className="absolute top-0 right-[10px] text-[60px] font-bold text-white cursor-pointer z-[100]"
            onClick={() => setIsShowPopupImage(false)}
          >
            &times;
          </span>
          <Image
            className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-[5px] w-[750px]"
            cloudName="dklkzeill"
            publicId={imgToShow}
          />
        </div>
      )}
    </>
  );
};

export default Rating;
