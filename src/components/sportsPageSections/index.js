// Library
import React, {Component} from 'react';
import {Row, Container} from 'reactstrap';
// Component
import SectionCard from '../../commonComponents/sectionCard';
// Data Array
const cards = [
    {
        id: 1,
        title: 'All',
        img: '/images/sportsPageSections/1@2x.png'
    },
    {
        id: 2,
        title: 'Football',
       img: '/images/sportsPageSections/2@2x.png'
    },
    {
        id: 3,
        title: 'Baseball',
        img: '/images/sportsPageSections/3@2x.png'
    },
    {
        id: 4,
        title: 'Basketball',
        img: '/images/sportsPageSections/4@2x.png'
    },
    {
        id: 5,
        title: 'Table Tennis',
        img: '/images/sportsPageSections/5@2x.png'
    },
    {
        id: 6,
        title: 'Tennis',
        img: '/images/sportsPageSections/6@2x.png'
    },
    {
        id: 7,
        title: 'Vollyball',
        img: '/images/sportsPageSections/7@2x.png'
    },
    {
        id: 8,
        title: 'Swimming',
        img: '/images/sportsPageSections/8@2x.png'
    }
];

class SportsPageSection extends Component {
    render() {

        const cardDisplay = cards.map(card => (
            <div className={'col-md-8ths'}>
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

export default SportsPageSection;