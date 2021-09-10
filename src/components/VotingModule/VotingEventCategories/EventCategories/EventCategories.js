import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getAllVotingCategories } from "../../../../redux/voting-events/category/category-action";
import Loader from "../../../../commonComponents/loader";

import CategoryBox from "../CategoryBox/CatergoryBox";
import "./EventCategories.css";

class VotingCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      categories: [],
      nomineeCount: props.numberOfNominees,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.getAllVotingCategories(id, (error, data) => {
      if (!error && data.length > 0) {
        this.setState({
          loading: false,
          categories: this.props.categoryListing,
          eventTitle: this.props.categoryListing[0],
          eventClosed: this.props.categoryListing[1].endEvent,
        });
      } else {
        this.props.history.push("/voting");
      }
    });
  }

  categorySelectedHandler = (categoryId, name, eventClosed) => {
    if (!eventClosed) {
      this.props.history.push({
        pathname: this.props.location.pathname + "/categories/" + categoryId,
      });
    } else {
      this.props.history.push({
        pathname: this.props.location.pathname + "/event-results/" + categoryId,
      });
    }
  };

  render() {
    if (this.state.loading) return <Loader />;

    const [, , ...categories] = this.state.categories;
    const { eventClosed, nomineeCount } = this.state;

    return (
      <Fragment>
        <div className="container categoryContainer">
          <div className="contentBox">
            <div className="Header">
              <div className="heading">Categories</div>
            </div>
            <div className="categoryBoxRow">
              {categories && categories.length > 0 ? (
                categories.map((category) => {
                  return (
                    <CategoryBox
                      key={category.id}
                      {...category}
                      clicked={() =>
                        this.categorySelectedHandler(
                          category.id,
                          category.name,
                          eventClosed
                        )
                      }
                      nomineeCount={nomineeCount}
                    />
                  );
                })
              ) : (
                <h1>No Category Exists</h1>
              )}
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
