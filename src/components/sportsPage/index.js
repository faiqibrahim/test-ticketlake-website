// Library
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Container} from 'reactstrap';
// Components

import Loader from "../../commonComponents/loader/";
import Error from '../../commonComponents/error';
import BannerComponent from '../../commonComponents/bannerComponent';
import SportsPageSection from '../../components/sportsPageSections';
import DefaultCard from '../../commonComponents/defaultCard';
// Redux
import {connect} from "react-redux";
import Heading from "../../commonComponents/heading";
// Page settings

const heading = 'Tickets for your Favourite Sports';
const text = 'Explore tickets for 18 Sports with over 242 matches on-going.';
const image = '/images/banner/sports_cover.png';
// data
const array = [
    {id: '1'},
    {id: '2'},
    {id: '3'},
    {id: '4'},
    {id: '5'},
    {id: '6'},
    {id: '7'},
    {id: '8'},
    {id: '9'},
    {id: '10'},
    {id: '11'},
    {id: '12'},
];
class SportsPage extends Component {
    getView = () => {
        return (

                <div id="wrapper">
                    <div className="content">
                        <BannerComponent heading={heading}
                                         para={text}
                                         image={image}/>
                        <SportsPageSection/>
                        <section id="sec2" style={{paddingTop: '30px'}}>
                            <Container>
                                <Heading
                                    style={{marginBottom:'0px', textAlign:'left'}}
                                    heading={"Upcoming Matches"}
                                    text={"Explore great range of sports and purchase bulk tickets."}
                                />
                                <div className={"row"}>
                                    {
                                        array.map( data => {
                                            return(
                                                <DefaultCard
                                                    grid={3}
                                                    image={'/images/sportsPageSections/a5836d5ce1ee09a0870d9ec8292fa9d4@2x.png'}
                                                />
                                            )
                                        })
                                    }


                                </div>
                            </Container>
                        </section>
                    </div>
                </div>

        )
    };


    render() {
        if (this.props.processing) {
            return (

                    <div id="wrapper">
                        <div className="content">
                            <Loader style={{marginBottom: "20%"}}/>
                        </div>
                    </div>

            );
        } else {
            if (this.props.error) {
                return (
                    <Error/>
                )
            } else {
                return (
                    <>
                        {this.getView()}
                    </>
                );
            }
        }
    }

}

const mapStateToProps = (state) => {
    return {
        processing: state.event.processing,
    }
};
const connectedComponent = connect(mapStateToProps)(SportsPage);
export default withRouter(connectedComponent);