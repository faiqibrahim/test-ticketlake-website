// Library
import React, {Component} from 'react';
// Components
import SectionHeading from '../../commonComponents/sectionHeading';
import AnimatedCards from '../../commonComponents/animatedCard';
import TwoShadedButton from '../../commonComponents/twoShadedButton';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Loader from "../../commonComponents/loader";
import {setPromotedEventsForHome} from '../../redux/event/event-actions';
// Helper
import {isNullOrEmpty, getMaxAndMinPrice} from '../../utils/common-utils';

const pageHeading = "Promoted Events";
const pageDescription = "Navigate through number of outrageous events happening around";

class PromotedEvents extends Component {

    componentWillMount() {
        this.props.setPromotedEventsForHome();
    }

    componentDidUpdate(prevProps){

        if(prevProps.eventsCountry !== this.props.eventsCountry){
            this.props.setPromotedEventsForHome();
        }
    }

    render() {
        let counter = 1;
        let cardClass = '';
        const events = this.props.promotedEventsHome;


        if (this.props.processing) {
            return (
                <section id="sec2" className={'mt-5 promoted-event-wrp'} style={{padding: "0px"}}>
                    <SectionHeading
                        heading={pageHeading}
                        text={pageDescription}
                    />
                    <div className="gallery-items fl-wrap mr-bot spad home-grid">
                        <Loader/>
                    </div>
                </section>

            );
        } else {
            if (isNullOrEmpty(events)) {
                return (
                    <section id="sec2" className={'mt-5 promoted-event-wrp'}>
                        <SectionHeading
                            heading={pageHeading}
                            text={pageDescription}
                        />
                        <div className={"Error-msg-wrp"}>
                            <div className={"Error-heading"}>Sorry, No Event Found.</div>
                            <span className={"Error-sub-heading"}>There are no promoted events .</span>
                        </div>
                    </section>

                );
            } else {
                return (
                    <section id="sec2" className={'mt-5 promoted-event-wrp'}>
                        <div className="">
                            <SectionHeading
                                heading={pageHeading}
                                text={pageDescription}
                            />
                            <div className="gallery-items fl-wrap mr-bot spad home-grid ri">
                                {events.map((neweventList, i) => {
                                        if (counter === 2) {
                                            cardClass = 'gallery-item gallery-item-second';
                                        } else {
                                            cardClass = '';
                                        }
                                        counter++;
                                        return (
                                            <AnimatedCards
                                                cardWidth={neweventList.cardWidth}
                                                cardImage={neweventList.bannerImageKey.imageUrl}
                                                heading={neweventList.heading}
                                                paragraph={neweventList.paragraph}
                                                date={neweventList.eventDateTimeSlot.eventStartTime}
                                                cardClass={cardClass}
                                                cardLink={`event/detail/${neweventList.eventSlotId}`}
                                                key={i}
                                                item={neweventList}
                                                eventTitle={neweventList.eventTitle}
                                                categoriesArr={neweventList.categories}
                                                buttonText={getMaxAndMinPrice(neweventList)}
                                            />
                                        );

                                    }
                                )}


                            </div>

                            <div>
                                <TwoShadedButton
                                    buttonLink={'/events/promoted'}
                                    buttonText={'Explore all Events'}
                                />
                            </div>
                        </div>
                    </section>

                );
            }
        }


    }
}


const mapStateToProps = (state) => {
    return {
        promotedEventsHome: state.event.promotedEventsHome,
        processing: state.event.processing,
        eventsCountry: state.user.eventsCountry,
    }
};

const connectedComponent = connect(mapStateToProps, {
    setPromotedEventsForHome
})(PromotedEvents);
export default withRouter(connectedComponent);