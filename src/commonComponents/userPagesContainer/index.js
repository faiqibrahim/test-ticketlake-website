// Library
import React from "react";
// Components
import AuthRoutes from "../authRotes";
import ProfileSidebar from "../../components/profileSidebar";
import { NavLink } from "react-router-dom";
import { Breadcrumbs } from "react-breadcrumbs-dynamic";

const userPagesContainer = (props) => {
  const toggleShowOnMobile = () => {
    const container = document.getElementById("filtersContainer");
    if (container.style.display === "" || container.style.display === "none") {
      container.style.display = "block";
    } else {
      container.style.display = "none";
    }
  };
  const tabs = [
    {
      name: "Profile",
      link: "/user/profile",
      isActiveClass: props.page === "profile" ? "user-profile-act" : null,
      icon: "far fa-user",
    },
    {
      name: "Wallet",
      link: "/user/wallet",
      isActiveClass: props.page === "wallet" ? "user-profile-act" : null,
      icon: "fas fa-wallet",
      tag: props.walletBalance,
    },
    {
      name: "Ticket",
      link: "/user/ticket",
      isActiveClass: props.page === "ticket" ? "user-profile-act" : null,
      icon: "far fa-calendar-check",
      tag: props.userTickets,
    },
    {
      name: "Wishlist",
      link: "/user/wishlist",
      isActiveClass: props.page === "wishlist" ? "user-profile-act" : null,
      icon: "far fa-heart",
      tag: props.whishlistTickets,
    },
    {
      name: "Change Password",
      link: "/user/change-password",
      isActiveClass:
        props.page === "change-password" ? "user-profile-act" : null,
      icon: "far fa-keyboard",
    },
  ];
  return (
    <AuthRoutes>
      {props.breadcrumbs}
      <div className="content">
        <section
          className="flat-header color-bg adm-header"
          style={{ background: "#F2F3F8" }}
        >
          <div className="wave-bg wave-bg2" />
          <div className="container custom-container">
            <div className="dasboard-wrap fl-wrap">
              <div className="dasboard-breadcrumbs breadcrumbs">
                <Breadcrumbs item={NavLink} finalItem={"span"} />
              </div>

              <ProfileSidebar showUploadButton={props.showUploadButton} />

              <div className="dasboard-menu">
                <div
                  className="dasboard-menu-btn color3-bg"
                  onClick={() => toggleShowOnMobile()}
                >
                  Dashboard Menu <i className="fal fa-bars" />
                </div>
                <ul className="dasboard-menu-wrap" id={"filtersContainer"}>
                  {tabs.map((item, i) => {
                    const { link } = item;

                    return (
                      <li key={i}>
                        <NavLink to={link} className={item.isActiveClass}>
                          <i className={item.icon} />
                          {item.name}
                          {item.tag === undefined ? null : (
                            <span className={"tag"}>{item.tag}</span>
                          )}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>
        {props.children}

        <div className="limit-box fl-wrap" />
      </div>
    </AuthRoutes>
  );
};

export default userPagesContainer;
