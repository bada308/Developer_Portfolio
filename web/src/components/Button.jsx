import React from "react";

import "./button.css";

const Button = ({ type, onClick, disabled, text, className }) => {
  return (
    <div className="Button">
      <button
        type={type}
        className={className}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
};

Button.defaultProps = {
  disabled: false,
};
export default Button;
