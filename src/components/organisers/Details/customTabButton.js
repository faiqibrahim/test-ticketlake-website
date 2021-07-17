import React from "react";

const CustomButton = (props) => {
  const { value, handleClick, active, styling } = props;
  return (
    <button
      onClick={handleClick}
      className={`customTabBtn ${styling} ${
        active ? "customTabBtnActive" : null
      }`}
    >
      {value}{" "}
    </button>
  );
};

export default CustomButton;
