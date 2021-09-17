import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import Loader from "../../../../commonComponents/loader";
import VotingCategories from "../../VotingEventCategories/EventCategories/EventCategories";
import CategoryNominees from "../../VotingEventNominees/EventNominees/EventNominees";
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
    };
  }

  componentDidMount() {
    this.is_Mounted = true;
    if (this.is_Mounted) {
      this.fetchEventCategories();
      this.fetchCategoryNominees();
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
    const { categoryID } = this.state;

    this.setState({
      nomineeListing: <CategoryNominees catalogueCategoryID={categoryID} />,
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
          <Col md={6}>
            <div className="catalogueCategoryContainer">{categoryListing}</div>
          </Col>
          <Col md={6}>
            <div className="catalogueNomineeContainer">{nomineeListing}</div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(CatalogueContent);
