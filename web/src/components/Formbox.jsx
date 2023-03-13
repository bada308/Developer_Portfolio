import React from "react";

import "./formbox.css";

const Formbox = ({
  htmlFor,
  name,
  type,
  onChange,
  message,
  msgLen,
  placeholder,
}) => {
  return (
    <div className="Formbox">
      <label htmlFor={htmlFor}>{name}</label>
      <input
        id={htmlFor}
        type={type}
        onChange={onChange}
        autoComplete="off"
        placeholder={placeholder}
      ></input>
      {msgLen > 0 && <span>{message}</span>}
    </div>
  );
};

export default Formbox;
