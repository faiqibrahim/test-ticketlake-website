// Library
import React, {Component} from 'react';
// Component
import TwoShadedButton from '../../commonComponents/twoShadedButton';
import HeroBanner from '../../commonComponents/heroBanner';

class EventOrganizerBanner extends Component {
    render() {
        return (
            <HeroBanner
                backgroundImage={window.location.origin + '/images/event_organizer.png'}
                transformStyle={'translateZ(0px) translateY(-59.1398px)'}>

                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            {/* column text*/}
                            <div className="colomn-text fl-wrap">
                                <div className="colomn-text-title">
                                    <h3>The owner of the hotel or business ?</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Maecenas in pulvinar neque. Nulla finibus lobortis
                                        pulvinar.</p>

                                    <TwoShadedButton
                                        link={'#'}
                                        buttonText={'Add your hotel'}
                                        buttonIcon={'fa fa-plus'}
                                        float={true}
                                    />
                                </div>
                            </div>
                            {/*column text   end*/}
                        </div>
                    </div>
                </div>
            </HeroBanner>
        );
    }
}

export default EventOrganizerBanner;