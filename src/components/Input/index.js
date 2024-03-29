import React, { useState } from "react";
import PropTypes from "prop-types";

function Input({
  label,
  type = "text",
  value,
  placeholder,
  className,
  isRequired,
  id,
  name,
  accept,
  isHidden,
  handleChange = () => { },
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label>{label}</label>
      <div className={`input-common input-group`}>
        <input
          type={
            type !== "password" ? type : showPassword ? "text" : type
          }
          value={value}
          name={name}
          className={`input-element form-control form-control-lg ${className} ${type === 'password' && "!pr-[40px]"}`}
          placeholder={placeholder}
          required={isRequired}
          onChange={(e) => handleChange(e, name)}
          id={id}
          accept={accept}
          hidden={isHidden}
        />
        {type == "password" && (
          <button
            className="toggle-password absolute top-2/4 right-3 -translate-y-2/4 z-50"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <i
              className={`far fa-eye${showPassword ? "-slash" : ""
                } cursor-pointer`}
              id="togglePassword"
            ></i>
          </button>
        )}
      </div>
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  accept: PropTypes.string,
  isHidden: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
};

export default Input;
