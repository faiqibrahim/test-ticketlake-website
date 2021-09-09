import React from "react";

import BannerCard from "../BannerCard/BannerCard";
import classes from "./styles.module.css";

const BannerContent = (props) => {
  const { image } = props.bannerContent;

  return (
    <div
      className={classes.bannerContainer}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={classes.bannerOverLay}></div>
      <BannerCard {...props} />
    </div>
  );
};

export default BannerContent;
