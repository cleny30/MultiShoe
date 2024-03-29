import React, { useState, useEffect } from "react";
import {
  doRequest,
  getUsername,
  uploadImageToCloudinary,
} from "../../utils/common";
import { ERROR_MESSAGE } from "../../constants/common";
import { toast } from "react-toastify";
import Notification from "../Notification/Notification";
import AddReviewForm from "./addReviewForm";
import UpdateReviewForm from "./updateReviewForm";
const AddReview = ({
  proId,
  filteredReviews,
  isShowUpdateForm,
  getProductDetail,
  ToggleFormUpdate,
}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [reviewImg, setReviewImg] = useState([]);
  const userName = getUsername();
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");

  const notify = (text) =>
    toast.success(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    setReviewImg((prevArray) => {
      if (prevArray.length >= 3) {
        prevArray.shift();
      }
      return [...prevArray, selectedFilesArray];
    });
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    // FOR BUG IN CHROME
    event.target.value = "";
  };
  const deleteHandler = (image) => {
    const updatedSelectedImages = selectedImages.filter((e) => e !== image);
    setSelectedImages(updatedSelectedImages);
    setReviewImg((prevReviewImg) => {
      const updatedReviewImg = prevReviewImg.filter((e) => e !== image);
      URL.revokeObjectURL(image);
      return updatedReviewImg;
    });
  };

  const deleteUpdateImage = (image) => {
    URL.revokeObjectURL(image);
    setSelectedImages((prevSelectedImages) =>
      prevSelectedImages.filter((e) => e !== image)
    );
    setReviewImg((prevReviewImg) => {
      const updatedReviewImg = prevReviewImg.filter((e) => e !== image);
      return updatedReviewImg;
    });
  };

  const AddReview = async () => {
    if (content.trim() !== "") {
      let imageIds = [];

      for (const file of Object.values(reviewImg)) {
        if (file.length > 0 && file[0] instanceof File) {
          const imageId = await uploadImageToCloudinary(file[0], "tlpfw5nc");
          imageIds.push(imageId);
        }
      }

      const response = await doRequest("post", "api/Review/AddReview", {
        data: {
          proId: proId,
          userName: userName,
          content: content,
          rating: rating,
          img1: imageIds[0] || null,
          img2: imageIds[1] || null,
          img3: imageIds[2] || null,
        },
        isUploadImg: false,
      });
      notify("Add Review Success!");

      setTimeout(function () {
        reset();
        getProductDetail();
      }, 3000);
    } else {
      setError(ERROR_MESSAGE.REQUIRE);
    }
  };

  const UpdateReview = async () => {
    if (content !== "") {
      ToggleFormUpdate();
      notify("Your review has been updated!");
      let imageIds = [];

      for (const file of Object.values(reviewImg)) {
        if (file.length > 0 && file[0] instanceof File) {
          const imageId = await uploadImageToCloudinary(file[0], "tlpfw5nc");
          imageIds.push(imageId);
        } else {
          imageIds.push(file);
        }
      }

      const response = await doRequest("post", "api/Review/UpdateReview", {
        data: {
          reviewId: filteredReviews.reviewId,
          proId: proId,
          userName: userName,
          content: content,
          rating: rating,
          img1: imageIds[0] || null,
          img2: imageIds[1] || null,
          img3: imageIds[2] || null,
        },
      });

      setTimeout(function () {
        reset();
        getProductDetail();
      }, 3000);
    } else {
      setError(ERROR_MESSAGE.REQUIRE);
    }
  };

  const handleTexareaChange = (e) => {
    setContent(e.target.value);
  };
  const handleRatingChange = (value) => {
    setRating(value);
  };
  const reset = () => {
    setSelectedImages([]);
    setReviewImg([]);
    setContent("");
    setRating(5);
    setError("");
  };
  useEffect(() => {
    if (filteredReviews) {
      let newImgReview = [];
      if (filteredReviews.img1 !== null) {
        newImgReview.push(filteredReviews.img1);
      }
      if (filteredReviews.img2 !== null) {
        newImgReview.push(filteredReviews.img2);
      }
      if (filteredReviews.img3 !== null) {
        newImgReview.push(filteredReviews.img3);
      }
      setReviewImg(newImgReview);
      setContent(filteredReviews.content);
      setRating(filteredReviews.rating);
    }
  }, [filteredReviews]);
  return (
    <>
      <Notification />
      {filteredReviews.userName !== userName ? (
        <AddReviewForm
          rating={rating}
          selectedImages={selectedImages}
          error={error}
          handleRatingChange={handleRatingChange}
          AddReview={AddReview}
          deleteHandler={deleteHandler}
          handleTexareaChange={handleTexareaChange}
          onSelectFile={onSelectFile}
        />
      ) : (
        isShowUpdateForm && (
          <UpdateReviewForm
            UpdateReview={UpdateReview}
            content={content}
            deleteUpdateImage={deleteUpdateImage}
            error={error}
            handleRatingChange={handleRatingChange}
            handleTexareaChange={handleTexareaChange}
            onSelectFile={onSelectFile}
            rating={rating}
            selectedImages={selectedImages}
            reviewImg={reviewImg}
            CloseForm={ToggleFormUpdate}
          />
        )
      )}
    </>
  );
};

export default AddReview;
