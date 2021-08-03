import React, { Fragment } from "react";
import { Breadcrumbs, BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { NavLink, withRouter } from "react-router-dom";

import "./BreadCrumb.css";

const displayBreadCrumbs = (breadCrumbs) => {
  if (breadCrumbs) {
    return breadCrumbs.map((breadCrumb) => {
      return (
        <BreadcrumbsItem key={breadCrumb.path} to={breadCrumb.path}>
          {" "}
          {breadCrumb.crumbTitle}{" "}
        </BreadcrumbsItem>
      );
    });
  }
};

const BreadCrumb = (props) => {
  const breadCrumbs = displayBreadCrumbs(props.breadCrumbs);

  return (
    <Fragment>
      <div className="breadcrumbs">
        {breadCrumbs}
        <Breadcrumbs
          separator={<span className="separator"></span>}
          item={NavLink}
          finalItem={"span"}
          finalProps={{
            style: { color: "#17224E" },
          }}
        />
      </div>
    </Fragment>
  );
};

export default withRouter(BreadCrumb);
