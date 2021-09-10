// Library
import React from "react";
import { NavLink } from "react-router-dom";

const twoShadedButton = (props) => {
  const { navState, buttonLink } = props;
  let link = buttonLink;

  if (navState) {
    link = {
      state: navState,
      pathname: link,
    };
  }

  return (
    <NavLink
      to={link}
      className={
        props.float
          ? "btn color-bg btn-new float-btn float-unset"
          : "btn color-bg btn-new "
      }
    >
      {props.buttonText}
      <i
        className={props.buttonIcon ? props.buttonIcon : "fa fa-caret-right"}
      />
    </NavLink>
  );
};

export default twoShadedButton;
