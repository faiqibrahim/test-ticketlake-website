// Library
import React, {Component} from 'react';
import {Row, Col, Container} from 'reactstrap';
// Component
import CardWithIcon from '../../commonComponents/cardWithIcon';
import SectionCard from '../../commonComponents/sectionCard';
// Data Array
const cards = [
    {
        id: 1,
        title: 'Celeberiries',
        img: '/images/homePageSection/4949059c51c63d2e5ebd21a320770448@2x.png'
    },
    {
        id: 2,
        title: 'Artists',
        img: '/images/homePageSection/ffe62e515e1a4f681c8ff77769909242@2x.png'
    },
    {
        id: 3,
        title: 'Speakers',
        img: '/images/homePageSection/d81664a73d4e16b7d7a4229220f8d845@2x.png'
    },
    {
        id: 4,
        title: 'Promoted Events',
        img: '/images/homePageSection/28f964533d44b1635eb6bbc7dd4559ca@2x.png'
    },
    {
        id: 5,
        title: 'Organizer Portal',
        img: '/images/homePageSection/2678fff978210c4594adb21d5038dc69@2x.png'
    },
    {
        id: 6,
        title: 'Organizer Portal',
        img: '/images/homePageSection/2678fff978210c4594adb21d5038dc69@2x.png'
    },
    {
        id: 7,
        title: 'Organizer Portal',
        img: '/images/homePageSection/2678fff978210c4594adb21d5038dc69@2x.png'
    }


];

class HomePageSection extends Component {
    render() {

        const cardDisplay = cards.map(card => (
            <div className={'col-md-7ths'}>
                <SectionCard {...card}/>
            </div>
        ));

        return (
            <section>
                <Container>
                    <Row className={'text-center'}>
                        {cardDisplay}
                    </Row>
                </Container>
            </section>
        );
    }
}

export default HomePageSection;