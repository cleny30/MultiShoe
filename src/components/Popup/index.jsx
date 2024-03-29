import PropTypes from "prop-types";
import Button from "../Button";
function Popup({
  text,
  isOpen,
  isConfirmPopup,
  handleClosePopup = () => {},
  isConfirmfc = () => {},
}) {
  return (
    <>
      {isOpen && (
        <div className="fixed z-[999] bg-[rgba(0,0,0,0.19)] w-[100%] h-[100%] top-0 left-0">
          <div className="bg-white absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-[5px] w-[450px] text-center p-8">
            <p className="text-lg">{text}</p>
            {!isConfirmPopup ? (
              <Button
                text="Ok"
                className="w-[80px]"
                handleClickBtn={() => handleClosePopup()}
              />
            ) : (
              <div className="flex gap-10 justify-center">
                <Button
                  text="Ok"
                  className="w-[80px]"
                  handleClickBtn={() => isConfirmfc()}
                />
                <Button
                  text="Cancel"
                  className="w-[80px]"
                  handleClickBtn={() => handleClosePopup()}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
Popup.propTypes = {
  text: PropTypes.string,
  handleClosePopup: PropTypes.func,
  isConfirm: PropTypes.func,
};
export default Popup;
