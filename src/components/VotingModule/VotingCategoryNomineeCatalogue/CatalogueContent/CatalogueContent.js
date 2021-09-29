import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";

import Loader from "../../../../commonComponents/loader";
import VotingCategories from "../../VotingEventCategories/EventCategories/EventCategories";
import CategoryNominees from "../../VotingEventNominees/EventNominees/EventNominees";
import EventResults from "../../VotingEventResults/EventResults/EventResults";

import { getVotingEventStatus } from "../../../../redux/voting-events/event/event-actions";

import "./styles.css";

class CatalogueContent extends Component {
  is_Mounted = false;
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      eventID: props.match.params.id,
      categoryID: props.match.params.categoryId,
      categoryListing: null,
      nomineeListing: null,
      catalogue: true,
      selectedCategory: props.match.params.categoryId,
      eventStatus: null,
    };
  }

  componentDidMount() {
    this.is_Mounted = true;
    if (this.is_Mounted) {
      const { getVotingEventStatus } = this.props;
      const { eventID } = this.state;
      getVotingEventStatus(eventID, (error, data) => {
        if (!error && data) {
          this.setState(
            {
              eventStatus: this.props.eventStatus,
            },
            () => {
              this.fetchEventCategories();
              this.fetchCategoryNominees();
            }
          );
        }
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.categoryID !== this.state.categoryID) {
      this.fetchCategoryNominees();
      this.fetchEventCategories();
    }
  }

  fetchEventCategories = () => {
    const { eventID, catalogue, selectedCategory } = this.state;

    this.setState({
      categoryListing: (
        <VotingCategories
          eventID={eventID}
          updateCategoryID={this.updateCategoryID}
          catalogue={catalogue}
          selectedCategory={selectedCategory}
        />
      ),
    });
  };

  fetchCategoryNominees = () => {
    const { categoryID, eventStatus } = this.state;

    const listing = eventStatus ? (
      <EventResults catalogueCategoryID={categoryID} />
    ) : (
      <CategoryNominees catalogueCategoryID={categoryID} />
    );

    this.setState({
      nomineeListing: listing,
    });
  };

  updateCategoryID = (id = null) => {
    this.setState({
      categoryID: id,
      selectedCategory: id,
    });
  };

  render() {
    if (this.state.loading) return <Loader />;
    const { categoryListing, nomineeListing } = this.state;

    return (
      <Container className="catalogueContainer container">
        <Row>
          <Col md={6} className="catalogueCategoryCol">
            <div className="catalogueCategoryContainer">{categoryListing}</div>
          </Col>
          <Col md={6} className="catalogueNomineeCol">
            <div className="catalogueNomineeContainer">{nomineeListing}</div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    eventStatus: state.voting.event.eventStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVotingEventStatus: (eventID, cb) =>
      dispatch(getVotingEventStatus(eventID, cb)),
  };
};

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogueContent);

export default withRouter(connectedComponent);
