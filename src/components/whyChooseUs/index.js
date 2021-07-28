// Library
import React, {Component} from 'react';
import {Row, Col, Container} from 'reactstrap';
// Component
import SectionHeading from "../../commonComponents/sectionHeading";
import CardWithIcon from '../../commonComponents/cardWithIcon';
import axios from '../../utils/axios'
import Loader from "../../commonComponents/loader";
// Data Array
const cards = [
    {
        id: 1,
        cardIcon: window.location.origin + "/images/icons/shopping-cart.svg",
        cardIconStyle: {width:'22%'},
        cardLink: '#',
        cardTitle: 'Buy Tickets Online',
        cardDescription: 'You’re always just a few clicks away from securing the perfect seats to the events you love.'
    },
    {
        id: 2,
        cardIcon: window.location.origin + "/images/icons/share.svg",
        cardIconStyle: {width:'22%'},
        cardLink: '#',
        cardTitle: 'Share with anyone',
        cardDescription: 'Transfer your seats to your friends and family for free - so you can get on with making memories that last.'
    },
    {
        id: 3,
        cardIcon: window.location.origin + "/images/icons/discount.svg",
        cardIconStyle: {width:'16%'},
        cardLink: '#',
        cardTitle: 'Discount Coupons',
        cardDescription: 'Ticketlake offers you plenty of coupons to use on live events and makes it easy to buy, sell, and get in.'
    },


];

class WhyChooseUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadedKey: false,
            statistics:[]
        };
    }
    componentDidMount() {
            axios.get(`/statistics/app-stats`)
                .then(response => {
                    this.setState({
                        statistics:response.data.statistics,
                        isLoadedKey: true,
                    })
                })
                .catch(err => {
                    console.error('request faild!', err)
                });
    }

    render() {
        const cardDisplay = cards.map(card => (
            <Col md={4} sm={12} key={card.id}>
                <CardWithIcon {...card}/>
            </Col>
        ));
        return (
            <section className="why-choose-us-wrp">
                <Container className="custom-container">
                    <SectionHeading
                        heading='Why Choose Us'
                        text='Ticketlake gives you access to millions of live events and makes it easy to buy'
                    />
                    <Row>
                        {cardDisplay}
                    </Row>
                    <Row>
                    {this.state.isLoadedKey?
                        <div className=" single-facts fl-wrap">
                            <div className="inline-facts-wrap col-md-3">
                                <div className="inline-facts">
                                    <img src="icons/new-visitors.svg" alt='img'/>
                                    <div className="milestone-counter">
                                        <div className="stats animaper">
                                            <div className="num" data-content="0" data-num="254">{this.state.statistics.newVisitorCount}</div>
                                        </div>
                                    </div>
                                    <h6>New Visitors Every Week</h6>
                                </div>
                            </div>

                            <div className="inline-facts-wrap col-md-3">
                                <div className="inline-facts">
                                    <img src="icons/happy-customers.svg" alt='img'/>
                                    <div className="milestone-counter">
                                        <div className="stats animaper">
                                            <div className="num" data-content="0" data-num="12168">{this.state.statistics.happyCustomers}</div>
                                        </div>
                                    </div>
                                    <h6>Happy Customers</h6>
                                </div>
                            </div>

                            <div className="inline-facts-wrap col-md-3">
                                <div className="inline-facts">
                                    <img src="icons/new-events.svg" alt='img'/>
                                    <div className="milestone-counter">
                                        <div className="stats animaper">
                                            <div className="num" data-content="0" data-num="172">{this.state.statistics.newEventsEveryWeek}</div>
                                        </div>
                                    </div>
                                    <h6>New Events Every Week</h6>
                                </div>
                            </div>

                            <div className="inline-facts-wrap col-md-3">
                                <div className="inline-facts">
                                    <img src="icons/shared-ticket.svg" alt='img'/>
                                    <div className="milestone-counter">
                                        <div className="stats animaper">
                                            <div className="num" data-content="0" data-num="732">{this.state.statistics.sharedTickets}</div>
                                        </div>
                                    </div>
                                    <h6>Shared Tickets</h6>
                                </div>
                            </div>
                        </div>
                        :
                        <div className={"loader-wrp"}>
                            <Loader/>
                        </div>
                    }
                    </Row>
                </Container>
            </section>
        );
    }
}

export default WhyChooseUs;