import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
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
      eventID: props.match.params.id,
      catalogue: props && props.catalogue,
    };
  }

  componentDidMount() {
    const { eventID } = this.state;

    this.props.getAllVotingCategories(eventID, (error, data) => {
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
    const { eventID } = this.state;
    const { updateCategoryID, history } = this.props;
    if (updateCategoryID) {
      updateCategoryID(categoryId);
    }
    history.push({
      pathname: `/voting/${eventID}/listing/${categoryId}`,
    });
  };

  showTitleHandler = () => {
    const { eventTitle, catalogue, eventID } = this.state;

    return catalogue ? (
      <Link to={`/voting/${eventID}`}>
        <div className="headingSecondary">{eventTitle}</div>
        <div className="subHeadingSecondary">All Categories</div>
      </Link>
    ) : (
      <div className="heading">Categories</div>
    );
  };

  render() {
    if (this.state.loading) return <Loader />;

    const [, , ...categories] = this.state.categories;
    const { eventClosed, catalogue } = this.state;
    const { selectedCategory } = this.props;
    const headerLink = this.showTitleHandler();

    return (
      <Fragment>
        <div className="container categoryContainer">
          <div className="contentBox">
            <div className="Header">{headerLink}</div>
            <div className="categoryBoxRow">
              {categories && categories.length > 0 ? (
                categories.map((category) => {
                  return (
                    <CategoryBox
                      catalogue={catalogue}
                      key={category.id}
                      {...category}
                      clicked={() =>
                        this.categorySelectedHandler(
                          category.id,
                          category.name,
                          eventClosed
                        )
                      }
                      selectedCategory={selectedCategory}
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
