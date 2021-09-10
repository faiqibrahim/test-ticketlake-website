// Library
import React from "react";
import { NavLink } from "react-router-dom";

const twoShadedButtonBuy = (props) => {
  const { buttonLink } = props;
  const isBuy = Boolean(buttonLink.match("buy"));

  return (
    <NavLink
      to={isBuy ? "#" : props.buttonLink}
      onClick={() => {
        if (isBuy) window.location = buttonLink;
      }}
      className={
        props.float
          ? "btn color-bg btn-new float-btn float-unset"
          : "btn color-bg btn-new full-width"
      }
    >
      {props.buttonText && props.buttonText}
      <i>
        <b>Buy</b>
      </i>
    </NavLink>
  );
};

export default twoShadedButtonBuy;
