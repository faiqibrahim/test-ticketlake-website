import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getAllVotingCategories } from "../../../../redux/voting-events/category/category-action";
import VotingHeader from "../../Header/Layout/Layout";

import CategoryBox from "../CategoryBox/CatergoryBox";
import "./EventCategories.css";

class VotingCategories extends Component {
  state = {
    loading: true,
    categories: null,
  };

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const eventId = params.get("eventId");
    const eventTitle = params.get("eventName");

    this.props.getAllVotingCategories(eventId, (error, data) => {
      if (!error) {
        this.setState({
          loading: false,
          categories: this.props.categoryListing,
          eventTitle,
          breadCrumbs: [
            { path: "/", crumbTitle: "Home" },
            { path: "/voting", crumbTitle: "Votings" },
            {
              path: `/voting/${this.props.categoryListing.id}`,
              crumbTitle: eventTitle,
            },
          ],
        });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  categorySelectedHandler = (categoryId, name) => {
    this.props.history.push({
      pathname: this.props.location.pathname + "/categories/" + categoryId,
      search: `categoryName=${name}`,
    });
  };

  render() {
    if (this.state.loading) return <p>Categories Loading!</p>;

    return (
      <Fragment>
        <div className="container">
          <div className="headerContainer">
            <VotingHeader
              pageTitle={this.state.eventTitle}
              breadCrumbs={this.state.breadCrumbs}
            />
          </div>
        </div>
        <hr style={{ margin: "5px 0" }} />
        <div className="container">
          <div className="contentBox">
            <div className="Header">
              <div className="heading">Categories</div>
              <div className="subHeading">
                Please select a category to cast your vote
              </div>
            </div>
            <div className="categoryBoxRow">
              {this.state.categories.map((category) => {
                return (
                  <CategoryBox
                    key={category.id}
                    {...category}
                    clicked={() =>
                      this.categorySelectedHandler(category.id, category.name)
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categoryListing: state.voting.category.categoryListing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllVotingCategories: (id, cb) =>
      dispatch(getAllVotingCategories(id, cb)),
  };
};

const eventCategoryConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(VotingCategories);

export default withRouter(eventCategoryConnected);
