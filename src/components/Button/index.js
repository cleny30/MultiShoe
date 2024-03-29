import PropTypes from "prop-types";
import "./button.css";
import { debounce } from 'lodash';

function Button({ text, className, handleClickBtn, time, ...props }) {
  time = time || 1000;
  const debouncedHandleClickBtn = debounce(() => handleClickBtn(), time, {
    leading: true,
    trailing: false // Set to true if you want to allow execution at the end of the delay as well
  });

  return <button className={`btn-common ${className}`} onClick={debouncedHandleClickBtn}>{text}</button>;
}

Button.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  handleClickBtn: PropTypes.func,
  time: PropTypes.number
};

export default Button;
