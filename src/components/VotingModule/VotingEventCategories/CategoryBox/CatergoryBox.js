import React from "react";
import { withRouter } from "react-router-dom";

import "./CatergoryBox.css";

const CatergoryBox = (props) => {
  const { image, name, clicked } = props;

  return (
    <div className="CategoryBoxCol" onClick={clicked}>
      <div
        className="boxContent"
        style={image ? { backgroundImage: `url('${image}')` } : null}
      >
        <div className={image ? "boxTitle" : "boxTitleNoImage"}>{name}</div>
        <div className={image ? "overlay" : "overlayNoImage"}></div>
      </div>
    </div>
  );
};

export default withRouter(CatergoryBox);
