// UpdateReviewForm.js
import React from "react";
import PropTypes from "prop-types";
import Input from "../Input";
import Texarea from "../Textarea";
import ErrorMes from "../ErrorMess";
import Button from "../Button";
import { Image } from "cloudinary-react";
const UpdateReviewForm = ({
  rating,
  reviewImg,
  selectedImages,
  content,
  error,
  handleRatingChange,
  deleteUpdateImage,
  onSelectFile,
  handleTexareaChange,
  UpdateReview,
  CloseForm,
}) => (
  <>
    <div className="fixed top-0 left-0 bg-[rgba(0,0,0,.3)] h-[100%] w-[100%] z-[100]">
      <div className="update-review fixed bg-slate-50 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30 w-[30%] p-4">
        <Button
          className="absolute right-2 top-2 bg-transparent !text-black font-bold"
          handleClickBtn={() => CloseForm()}
          text={"✖"}
        />
        <div className="mt-2">
          <h4 className="mb-4 text-center">Update your review</h4>
          <div className="d-flex my-3 items-center">
            <p className="mr-2 mt-2">Your Rating * :</p>
            <div className="text-primary1">
              {[5, 4, 3, 2, 1].map((value) => (
                <React.Fragment key={value}>
                  <input
                    type="radio"
                    id={`star-update${value}`}
                    className="rating-radio"
                    name="rating-update"
                    value={value}
                    checked={value === rating}
                    onChange={() => handleRatingChange(value)}
                  />
                  <label htmlFor={`star-update${value}`}>&#9733;</label>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="images flex gap-[10px] mb-[10px]">
            {reviewImg &&
              reviewImg.map((image) => (
                <div key={image} className="image relative">
                  {typeof image === "string" && (
                    <>
                      <Image
                        cloudName="dklkzeill"
                        publicId={image}
                        width="100px"
                      />
                      <Button
                        className="imgUploadDelete"
                        handleClickBtn={() => deleteUpdateImage(image)}
                        text={"✖"}
                      />
                    </>
                  )}
                </div>
              ))}
            <div className="images flex gap-[10px] mb-[10px] ">
              {selectedImages &&
                selectedImages.map((image) => (
                  <div key={image} className="image relative">
                    <img src={image} width="100px" alt="upload" />
                    <Button
                      className="imgUploadDelete"
                      handleClickBtn={() => deleteUpdateImage(image)}
                      text={"✖"}
                    />
                  </div>
                ))}
            </div>
          </div>

          {reviewImg.length < 3 && (
            <label
              id="imgUploadBtn"
              className="btn relative !border-dashed !border-[#ffd333] p-[12px] w-[75px] h-[65px]"
              data-toggle="tooltip"
              title="Add photos"
              htmlFor="inputFile"
            >
              <i className="fa fa-camera text-lg text-[#ffd333] mt-[5px]"></i>
              {reviewImg.length > 0 && (
                <p className="text-sm mb-[6px]" id="countPhotoUpload">
                  {reviewImg.length}/3
                </p>
              )}

              <Input
                type="file"
                id="inputFile"
                name="updateFile"
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
            className="btn-primary"
            text="Update"
            handleClickBtn={() => UpdateReview()}
          />
          <Button
            className="ml-2 !bg-[#e2e2e2] !text-black hover:!bg-[#aaa9a9]"
            text="Cancel"
            handleClickBtn={() => CloseForm()}
          />
        </div>
      </div>
    </div>
  </>
);

UpdateReviewForm.propTypes = {
  rating: PropTypes.number.isRequired,
  reviewImg: PropTypes.array.isRequired,
  selectedImages: PropTypes.array.isRequired,
  content: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  handleRatingChange: PropTypes.func.isRequired,
  deleteUpdateImage: PropTypes.func.isRequired,
  onSelectFile: PropTypes.func.isRequired,
  handleTexareaChange: PropTypes.func.isRequired,
  UpdateReview: PropTypes.func.isRequired,
  CloseForm: PropTypes.func.isRequired,
};

export default UpdateReviewForm;
