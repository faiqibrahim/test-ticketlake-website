// Library
import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import {
  Collapse,
  Navbar,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { getAllCategories } from "../../redux/category/category-actions";
import { setCatSecId } from "../../redux/movies/movie-action";

let navLimit;

class HeaderNavMenu extends Component {
  is_Mounted = false;
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      isClose: false,
      menu: [],
      loaded: false,
      isTop: true,
    };
  }

  setPathToSession = (a, navState) => {
    sessionStorage.setItem("eventsListing", JSON.stringify(navState.state));
    this.props.history.push(navState);
  };

  getSessionState = () => {
    let categories = sessionStorage.getItem("categories");
    if (categories) {
      return JSON.parse(categories);
    }
    return null;
  };

  componentDidMount() {
    this.is_Mounted = true;
    this.props.fetchAllCategories((categories) => {
      sessionStorage.setItem("categories", JSON.stringify(categories));
      if (this.is_Mounted) {
        this.setState({
          menu: categories,
          loaded: true,
        });
      }
    });
    document.addEventListener("scroll", () => {
      const isTop = window.scrollY < 30;
      if (isTop !== this.state.isTop && this.is_Mounted) {
        this.setState({
          isOpen: false,
          isClose: true,
        });
      }
    });
  }

  componentWillUnmount() {
    this.is_Mounted = false;
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
      isClose: true,
    });
  }

  closeMenu(a, navState) {
    sessionStorage.setItem("eventsListing", JSON.stringify(navState.state));
    this.props.history.push(navState);
    this.toggle();
    this.setState({
      isClose: !this.state.isOpen,
    });
  }

  onNavClick = (item) => {
    let obj = {
      parentCategory: item,
      navLink: true,
    };
    sessionStorage.setItem("subCategoryItem", JSON.stringify(item));
    sessionStorage.setItem("eventsListing", JSON.stringify(obj));
  };

  /********************** Mobile Nav Menu *************************/

  lpFunctions = (item, i, link, breadCrumbState) => {
    let breadCrumb = [...breadCrumbState];
    let pathURL = `${link}/?id=${item._id}`;
    breadCrumb.push({ category: item, url: pathURL, mainLink: link });

    let navState = {
      pathname: pathURL,
      state: { parentCategory: item, breadCrumbs: breadCrumb, navLink: true },
    };

    if (item.children.length > 0) {
      return (
        <UncontrolledDropdown key={i} nav inNavbar>
          <DropdownToggle
            nav
            caret
            onClick={() => this.setPathToSession(item._id, navState)}
          >
            {item.name}
          </DropdownToggle>
          <DropdownMenu right className="one p-0 right-menu">
            {item.children.map((item, i) =>
              this.lpFunctions(item, i, link, breadCrumb)
            )}
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    } else {
      // See n-level for bread crumb
      return (
        <DropdownItem
          key={i}
          onClick={() => this.closeMenu(item._id, navState)}
        >
          {item.name}
        </DropdownItem>
      );
    }
  };

  renderDisplayMenu = () => {
    let categoryState = this.getSessionState();

    return (
      categoryState &&
      categoryState.map((item, i) => {
        if (i < navLimit) {
          let { selectedCategories } = this.props;
          let breadCrumbsState = [];

          selectedCategories = selectedCategories.filter(
            (category) => category.title === item.name.trim()
          );
          let link = `/events/listing`;

          if (selectedCategories && selectedCategories.length) {
            link = selectedCategories[0].link;
            breadCrumbsState.push({
              category: item,
              url: `${link}/?id=${item._id}`,
              mainLink: link,
            });
          }

          let pathName = `${link}/?id=${item._id}`;
          let navState = {
            pathname: pathName,
            state: {
              parentCategory: item,
              breadCrumbs: breadCrumbsState,
              navLink: true,
            },
          };
          return item.children.length > 0 ? (
            <UncontrolledDropdown
              key={i}
              nav
              inNavbar
              style={{ background: "#e8e8e8" }}
              className="border-bottom mh"
            >
              <DropdownToggle
                nav
                caret
                onClick={() => this.setPathToSession(item._id, navState)}
              >
                {item.name ? item.name : item.title}
              </DropdownToggle>
              <DropdownMenu right className="one p-0 hee right-menu">
                {item.children.map((item, i) =>
                  this.lpFunctions(item, i, link, breadCrumbsState)
                )}
              </DropdownMenu>
            </UncontrolledDropdown>
          ) : (
            <DropdownItem
              key={i}
              className="border-bottom hee"
              onClick={() => this.closeMenu(item._id, navState)}
            >
              {item.name}
            </DropdownItem>
          );
        } else return null;
      })
    );
  };

  renderMobileMoreCategories = (keyIndex) => {
    let categoryState = this.getSessionState();
    let { selectedCategories } = this.props;
    let breadCrumbsState = [];
    let navJsx = [];

    if (categoryState && categoryState.length >= navLimit) {
      for (let i = navLimit; i < categoryState.length; i++) {
        let item = categoryState[i];
        selectedCategories = selectedCategories.filter(
          (category) => category.title === item.name.trim()
        );
        let link = `/events/listing`;

        if (selectedCategories && selectedCategories.length) {
          link = selectedCategories[0].link;
          breadCrumbsState.push({
            category: item,
            url: `${link}/?id=${item._id}`,
            mainLink: link,
          });
        }

        let pathName = `${link}/?id=${item._id}`;
        let navState = {
          pathname: pathName,
          state: {
            parentCategory: item,
            breadCrumbs: breadCrumbsState,
            navLink: true,
          },
        };

        navJsx.push(
          <Fragment key={i}>
            <DropdownItem
              className="border-bottom hee"
              onClick={() => this.closeMenu(item._id, navState)}
            >
              {item.name}
            </DropdownItem>
          </Fragment>
        );
      }
      return (
        <UncontrolledDropdown
          key={keyIndex}
          nav
          inNavbar
          style={{ background: "#e8e8e8" }}
          className="border-bottom mh"
        >
          <DropdownToggle nav caret>
            More
          </DropdownToggle>
          <DropdownMenu right className="one p-0 hee right-menu">
            {navJsx}
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    }
  };

  /************************** End ********************************/

  onWebsiteMenuChildClick = (item) => {
    const { setCategorySection, history } = this.props;
    setCategorySection(item.parentId);
    history.push(`/movies/sub-category/${item._id}`);
    sessionStorage.setItem("parentCategory", item.parentId);
    sessionStorage.setItem("subCategoryItem", JSON.stringify(item));
    window.location.reload();
  };

  /********************** Website Nav Menu *************************/

  websiteMenuLoop = (item, i, link, breadCrumbState) => {
    let breadCrumb = [...breadCrumbState];
    let pathURL = `${link}/sub-category/?id=${item._id}`;
    breadCrumb.push({ category: item, url: pathURL, mainLink: link });
    if (item.children.length > 0) {
      return (
        <Fragment key={i}>
          <li>
            {/*<a href={`/events/listing/?id=${item._id}`}> {item.name} <i class="fas fa-caret-right"/></a>*/}
            <NavLink
              to={{
                pathname: pathURL,
                state: {
                  parentCategory: item,
                  breadCrumbs: breadCrumb,
                  navLink: true,
                },
              }}
              onClick={() => this.onWebsiteMenuChildClick(item)}
            >
              {item.name}
              <span>
                <i className="fas fa-caret-down" />
              </span>
            </NavLink>
            <ul className="sub-menu-child">
              {item.children.map((item, i) =>
                this.websiteMenuLoop(item, i, link, breadCrumb)
              )}
            </ul>
          </li>
        </Fragment>
      );
    } else {
      return (
        <Fragment key={i}>
          <li key={i}>
            {/*<a href={`/events/listing/?id=${item._id}`}> {item.name} </a>*/}
            <NavLink
              to={{
                pathname: pathURL,
                state: {
                  parentCategory: item,
                  breadCrumbs: breadCrumb,
                  navLink: true,
                },
              }}
              onClick={() => this.onWebsiteMenuChildClick(item)}
            >
              {item.name}
            </NavLink>
          </li>
        </Fragment>
      );
    }
  };

  renderWebsiteDisplayMenu = () => {
    let categoryState = this.getSessionState();
    let { selectedCategories } = this.props;
    let breadCrumbsState = [];

    return (
      categoryState &&
      categoryState.map((item, i) => {
        if (i < navLimit) {
          selectedCategories = selectedCategories.filter(
            (category) => category.title === item.name.trim()
          );
          let link = `/events/listing`;

          if (selectedCategories && selectedCategories.length) {
            link = selectedCategories[0].link;
            breadCrumbsState.push({
              category: item,
              url: `${link}/?id=${item._id}`,
              mainLink: link,
            });
          }

          let pathName = `${link}/?id=${item._id}`;

          return item.children.length > 0 ? (
            <li key={i}>
              {/*<a href={`/events/listing/?id=${item._id}`}> {item.name} <i class="fas fa-caret-down"/></a>*/}
              <NavLink
                to={{
                  pathname: pathName,
                  state: {
                    parentCategory: item,
                    breadCrumbs: breadCrumbsState,
                    navLink: true,
                  },
                }}
                onClick={() => this.onNavClick(item)}
              >
                {item.name}
                <span>
                  <i className="fas fa-caret-down" />
                </span>
              </NavLink>
              <ul className="sub-menu">
                {item.children.map((item, i) =>
                  this.websiteMenuLoop(item, i, link, breadCrumbsState)
                )}
              </ul>
            </li>
          ) : (
            <li key={i}>
              <NavLink
                to={{
                  pathname: pathName,
                  state: {
                    parentCategory: item,
                    breadCrumbs: breadCrumbsState,
                    navLink: true,
                  },
                }}
                onClick={() => this.onNavClick(item)}
              >
                {item.name}
              </NavLink>
            </li>
          );
        } else return null;
      })
    );
  };

  renderWebsiteMoreCategories = (keyIndex) => {
    let categoryState = this.getSessionState();
    let { selectedCategories } = this.props;
    let breadCrumbsState = [];
    let navJsx = [];

    if (categoryState && categoryState.length > navLimit) {
      for (let i = navLimit; i < categoryState.length; i++) {
        let item = categoryState[i];
        selectedCategories = selectedCategories.filter(
          (category) => category.title === item.name.trim()
        );
        let link = `/events/listing`;

        if (selectedCategories && selectedCategories.length) {
          link = selectedCategories[0].link;
          breadCrumbsState.push({
            category: item,
            url: `${link}/?id=${item._id}`,
            mainLink: link,
          });
        }

        let pathName = `${link}/?id=${item._id}`;
        navJsx.push(
          <Fragment key={i}>
            <li>
              <NavLink
                to={{
                  pathname: pathName,
                  state: {
                    parentCategory: item,
                    breadCrumbs: breadCrumbsState,
                    navLink: true,
                  },
                }}
                onClick={() => this.onNavClick(item)}
              >
                {item.name}
              </NavLink>
            </li>
          </Fragment>
        );
      }
      const hrefVal = "#";
      return (
        <li key={keyIndex}>
          <a href={hrefVal}>
            More
            <span>
              <i className="fas fa-caret-down" />
            </span>
          </a>
          <ul className="sub-menu">{navJsx}</ul>
        </li>
      );
    }
  };

  /************************** End **********************************/

  render() {
    let sessionState = this.getSessionState();
    let { selectedCategories } = this.props;
    let { menu } = this.state;

    // Statements to limit Navigations

    const scroll = window.scrollY < 100;
    if (scroll) {
      navLimit = 5;
    } else {
      navLimit = 1;
    }

    const hrefLink = "#";
    return (
      <>
        <div className="navbarHolder">
          <Navbar expand="md" className="website-mobile-menu">
            <div
              className={
                this.state.isOpen
                  ? "nav-button-wrap opened"
                  : "nav-button-wrap color-bg"
              }
            >
              <div onClick={this.toggle} className={"nav-button"}>
                <span />
                <span />
                <span />
              </div>
            </div>

            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav navbar className={"header-mob-nav"}>
                {!this.state.loaded && !sessionState ? (
                  <span style={{ lineHeight: "47px" }}>Loading menu...</span>
                ) : (
                  <>
                    {this.renderDisplayMenu()}
                    {this.renderMobileMoreCategories(
                      menu.length + selectedCategories.length
                    )}
                    <NavItem
                      key={menu.length + selectedCategories.length + 1}
                      className="hee border-bottom"
                    >
                      <NavLink to={"/about-us"} onClick={this.toggle}>
                        About Us
                      </NavLink>
                    </NavItem>
                    <NavItem
                      key={menu.length + selectedCategories.length + 2}
                      className="hee"
                    >
                      <NavLink to="/contact-us" onClick={this.toggle}>
                        Contact
                      </NavLink>
                    </NavItem>
                  </>
                )}
              </Nav>
            </Collapse>
          </Navbar>

          <div className={"nav-holder main-menu website-menu"}>
            {!this.state.loaded && !sessionState ? (
              <span style={{ lineHeight: "47px" }}>Loading menu...</span>
            ) : (
              <nav>
                <ul className="parent-menu">
                  {this.renderWebsiteDisplayMenu()}
                  {this.renderWebsiteMoreCategories(
                    menu.length + selectedCategories.length
                  )}

                  <li key={menu.length + selectedCategories.length + 1}>
                    <a href={hrefLink}>
                      NearBy
                      <span>
                        <i className="fas fa-caret-down" />
                      </span>
                    </a>
                    <ul className="sub-menu">
                      <NavLink to="/events/nearby-events">
                        NearBy Events
                      </NavLink>
                      <NavLink to="/events/nearby-cinemas">
                        NearBy Cinemas
                      </NavLink>
                    </ul>
                  </li>
                  <li key={menu.length + selectedCategories.length + 2}>
                    <NavLink to="/about-us">About Us</NavLink>
                  </li>
                  <li key={menu.length + selectedCategories.length + 3}>
                    <NavLink to="/contact-us">Contact</NavLink>
                  </li>
                  <li key={menu.length + selectedCategories.length + 4}>
                    <NavLink to="/voting">Voting</NavLink>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCategories: (cb) => dispatch(getAllCategories(cb, "v2")),
    setCategorySection: (categoryId) =>
      dispatch(setCatSecId({ categoryId, sectionId: null })),
  };
};

const mapStateToProps = (state) => {
  return {
    categories: state.category.categories,
    selectedCategories: state.category.selectedCategories,
  };
};

const connected = connect(mapStateToProps, mapDispatchToProps)(HeaderNavMenu);
export default withRouter(connected);
