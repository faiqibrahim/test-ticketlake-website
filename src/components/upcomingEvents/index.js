// Library
import React, {Component} from 'react';
// Component
import CardSlider from '../../commonComponents/cardSlider';
import TwoShadedButton from '../../commonComponents/twoShadedButton';
import HeroBanner from '../../commonComponents/heroBanner';
import FullImageCard from '../../commonComponents/fullImageCard';
import {getAllCategories} from "../../redux/category/category-actions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {sliderSettings, buttonSettings} from "../../utils/config";


// Main Slider Settings
const mainSliderSettings = {
    ...sliderSettings,
    slidesToShow: 2,
    initialSlide: 0,
    centerMode: false,
    centerPadding: "50px",
    isUpcoming:true
};

const sliderButtonSettings = {
    ...buttonSettings,
    mainPreviousClass: 'fc-cont  lc-prev',
    mainNextClass: 'fc-cont  lc-next',
    previousIcon: 'fa fa-angle-left',
    nextIcon: 'fa fa-angle-right',
};

class UpcomingEvents extends Component {

    componentDidMount() {
        this.props.getAllCategories();
    }

    render() {

        const cardDisplay = this.props.categories.map((item, i) => (
            // i && i<3 ?
            <div key={i} className={"col-md-12"}>
                <FullImageCard
                    fullImageClass={"fullImageCard"}
                    items={item.name}
                    tags={item.tags}
                    key={i}
                    cardImage={item.imageKey && item.imageKey.imageUrl}
                    cardLink={"/events/listing?id=" + item._id}
                />
            </div> //: null
        ));

        return (
            <div className="explore-events-wrp">
                <HeroBanner
                    backgroundImage={window.location.origin + '/images/upcoming_events.png'}
                    transformStyle={'translateZ(0px) translateY(-38.1485px)'}>
                    <div className="container custom-container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="colomn-text fl-wrap pad-top-column-text_s">
                                    <div className="colomn-text-title">
                                        <h3>Explore Events</h3>
                                        <p>Explore some of the best categories from ticketlake.</p>
                                        <TwoShadedButton
                                            buttonLink={'/events/listing'}
                                            buttonText={'View All Events'}
                                            float={true}
                                        />

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="light-carousel-wrap fl-wrap">
                                    <div className="light-carousel">
                                        <CardSlider settings={mainSliderSettings} buttons={sliderButtonSettings}>
                                            {cardDisplay}
                                        </CardSlider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </HeroBanner>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.category.categories
    }
};

const connectedComponent = connect(mapStateToProps, {getAllCategories})(UpcomingEvents);
export default withRouter(connectedComponent);
