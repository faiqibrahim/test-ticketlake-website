import React from 'react';
import Main from '../homePage';
import axios from "axios";
import {getCountryLabel} from "../../utils/common-utils";
import {connect} from "react-redux";
import {setEventsCountry} from "../../redux/user/user-actions";

const _ = require('lodash');

class Layout extends React.Component {

    componentDidMount() {
        const {setEventsCountry, eventsCountry} = this.props;

        if (_.isNil(eventsCountry.countryCode)) {
            axios
                .get("https://location.hexagram.global/geo-data")
                .then((response) => {
                    const {country: countryCode} = response.data;

                    setEventsCountry({
                        label: getCountryLabel(countryCode),
                        countryCode,
                        storeInSession: true,
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    render() {
        return (
            <>
                <Main/>
            </>
        )
    };
}


const mapStateToProps = (state) => {
    return {
        eventsCountry: state.user.eventsCountry,
    };
};

export default connect(mapStateToProps, {setEventsCountry})(Layout);
