import React from "react";
import BreadCrumb from "../../VotingModule/Header/BreadCrumb/BreadCrumb";

const BreadCrumbs = () => {
  const crumbsJSON = [
    { path: "/", crumbTitle: "Home" },
    { path: "/organisers", crumbTitle: "Event Organisers" },
  ];
  return (
    <div className="container-fluid breadcrumbContainer">
      <div className="container">
        <div className="row left">
          <div className="col-md-12">
            <BreadCrumb breadCrumbs={crumbsJSON} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumbs;
