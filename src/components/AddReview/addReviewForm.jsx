// AddReviewForm.js
import React from "react";
import PropTypes from "prop-types";
import Input from "../Input";
import Texarea from "../Textarea";
import ErrorMes from "../ErrorMess";
import Button from "../Button";
const AddReviewForm = ({
  rating,
  selectedImages,
  content,
  error,
  handleRatingChange,
  deleteHandler,
  onSelectFile,
  handleTexareaChange,
  AddReview,
}) => (
  <div className="add-review">
    <div className="mt-5">
      <h4 className="mb-4">Leave a review</h4>
      <div className="d-flex my-3 items-center">
        <p className="mr-2 mt-2">Your Rating * :</p>
        <div className="text-primary1">
          {[5, 4, 3, 2, 1].map((value) => (
            <React.Fragment key={value}>
              <input
                type="radio"
                id={`star${value}`}
                className="rating-radio"
                name="rating"
                value={value}
                checked={value === rating}
                onChange={() => handleRatingChange(value)}
              />
              <label htmlFor={`star${value}`}>&#9733;</label>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="images flex gap-[10px] mb-[10px]">
        {selectedImages &&
          selectedImages.map((image, index) => (
            <div key={image} className="image relative">
              <img src={image} width="50px" alt="upload" />
              <Button
                className="imgUploadDelete"
                handleClickBtn={() => deleteHandler(image)}
                text={"✖"}
              />
            </div>
          ))}
      </div>
      {selectedImages.length < 3 && (
        <label
          id="imgUploadBtn"
          className="btn relative !border-dashed !border-[#ffd333] p-[12px] w-[75px] h-[65px]"
          data-toggle="tooltip"
          title="Add photos"
          htmlFor="inputFile"
        >
          <i className="fa fa-camera text-lg text-[#ffd333] mt-[5px]"></i>
          {selectedImages.length > 0 && (
            <p className="text-sm mb-[6px]" id="countPhotoUpload">
              {selectedImages.length}/3
            </p>
          )}
          <Input
            type="file"
            id="inputFile"
            name="inputFile"
            accept=".jpg, .jpeg, .png"
            isHidden={true}
            handleChange={onSelectFile}
          />
        </label>
      )}
    </div>
    <div className="form-group">
      <label htmlFor="message">Your Review *</label>
      <Texarea
        className="form-control"
        id="message"
        cols="30"
        rows="5"
        name="content"
        value={content}
        handleChange={handleTexareaChange}
      />
      <ErrorMes text={error} />
    </div>
    <div className="form-group mb-0">
      <Button
        className={"btn-primary"}
        text={"Leave Your Review"}
        handleClickBtn={() => AddReview()}
        time={5000}
      />
    </div>
  </div>
);

AddReviewForm.propTypes = {
  rating: PropTypes.number.isRequired,
  selectedImages: PropTypes.array.isRequired,
  content: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  handleRatingChange: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  onSelectFile: PropTypes.func.isRequired,
  handleTexareaChange: PropTypes.func.isRequired,
  AddReview: PropTypes.func.isRequired,
};

export default AddReviewForm;
