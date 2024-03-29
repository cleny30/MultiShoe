import React from "react";
import PropTypes from "prop-types";

function Texarea({
    placeholder,
    className,
    isRequired,
    id,
    name,
    cols,
    rows,
    value,
    handleChange = () => { },
}) {
    return (
        <textarea
            id={id}
            cols={cols}
            rows={rows}
            className={className}
            name={name}
            value={value}
            required={isRequired}
            placeholder={placeholder}
            onChange={(e) => handleChange(e)}

        ></textarea>
    );
}

Texarea.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    cols: PropTypes.string,
    value: PropTypes.string,
    rows: PropTypes.string,
    isRequired: PropTypes.bool,
    handleChange: PropTypes.func.isRequired,
};

export default Texarea;
