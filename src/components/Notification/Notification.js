import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Notification({
  position = "top-right",
  autoClose = 5000,
  hideProgressBar = false,
  closeOnClick = true,
  pauseOnHover = true,
  draggable = true,
  theme = "light",
}) {
  return (
    <>
      <ToastContainer
        position={position}
        autoClose={autoClose}
        hideProgressBar={hideProgressBar}
        newestOnTop={closeOnClick}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={draggable}
        pauseOnHover={pauseOnHover}
        theme={theme}
      />
    </>
  );
}

Notification.propTypes = {
  position: PropTypes.string,
  autoClose: PropTypes.number,
  hideProgressBar: PropTypes.bool,
  closeOnClick: PropTypes.bool,
  pauseOnHover: PropTypes.bool,
  draggable: PropTypes.bool,
  theme: PropTypes.string,
};

export default Notification;
