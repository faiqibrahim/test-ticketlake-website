import React from "react";

import BannerCard from "../BannerCard/BannerCard";
import classes from "./styles.module.css";

const BannerContent = (props) => {
  const { bannerImage, bannerCardContent, bannerButtons } = props;

  return (
    <div
      className={classes.bannerContainer}
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className={classes.bannerOverLay}></div>
      <BannerCard
        cardContent={bannerCardContent}
        cardImage={bannerImage}
        cardButtons={bannerButtons}
      />
    </div>
  );
};

export default BannerContent;
