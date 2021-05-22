// Library
import React, { Component } from "react";
import { Container } from "reactstrap";
import "antd/dist/antd.css";
// Component
import MovieCategories from "../Categories/MovieCategories";
import {
  movieDetailButtonSettings,
  sliderSettings,
} from "../../../utils/config";
import CardSlider from "../../../commonComponents/cardSlider";

class CategoriesSection extends Component {
  state = {
    width: window.innerWidth,
  };

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.setState({ width: window.innerWidth });
  }

  mainSliderSetting = {
    ...sliderSettings,
    infinite: true,
    variableWidth: true,
    className: "left-slider",
    centerMode: false,
    centerPadding: "0px",
    isCategory: true,
    initialSlide: 0,
    slidesToShow: 7,
  };

  render() {
    let { childs } = this.props;

    const cardDisplay =
      childs &&
      childs.length > 0 &&
      childs.map((data, index) => (
        <MovieCategories
          key={index}
          imageUrl={data.celebrityImageKey && data.celebrityImageKey.imageUrl}
          title={data.celebrityName}
          subTitle={data.celebrityTitle}
        />
      ));

    this.mainSliderSetting.infinite =
      childs && childs.length > sliderSettings.slidesToShow;
    movieDetailButtonSettings.display =
      this.state.width > 1024
        ? childs && childs.length > sliderSettings.slidesToShow
        : true;

    this.mainSliderSetting.centerMode = this.state.width <= 480;
    this.mainSliderSetting.className =
      this.state.width <= 480 ? "center" : "left-slider";
    this.mainSliderSetting.centerPadding = "90px";

    return (
      <section className="Categories-wrp">
        <Container>
          <div className={"category-heading"}>Movie Cast & Crew</div>
          {childs && childs.length > 0 ? (
            <div className="fl-wrap movie-slider-div">
              <div className="listing-carousel  fl-wrap">
                <CardSlider
                  settings={this.mainSliderSetting}
                  buttons={movieDetailButtonSettings}
                >
                  {cardDisplay && cardDisplay}
                </CardSlider>
              </div>
            </div>
          ) : (
            <div>No Data Found!</div>
          )}
        </Container>
      </section>
    );
  }
}

export default CategoriesSection;
