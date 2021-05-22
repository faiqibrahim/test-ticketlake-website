// Library
import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import {connect} from "react-redux";
import {searchAllPublicEvents} from '../../redux/event/event-actions';
import {withRouter} from "react-router-dom";
import {getCardDates} from "../../utils/common-utils";

const getSuggestionValue = (suggestion) => {
    return {
        eventTitle: suggestion.eventTitle,
        eventLocation: suggestion.venue.city + ", " + suggestion.venue.country,
        eventDate: getCardDates(suggestion.eventDateTimeSlot),
        eventSlotId: suggestion.eventSlotId
    };
}

const renderSuggestion = suggestion => (
    <div className={"suggestion-wrp"}>
        <div className={"suggestion-title"}>
            {suggestion.eventTitle}
        </div>
        <div className={"suggestion-info"}>
            {suggestion.venue.city || suggestion.venue.country ?
                suggestion.venue.city + ", " + suggestion.venue.country
                :
                "N/A"
            }
        </div>
        <div className={"suggestion-info"}>
            {getCardDates(suggestion.eventDateTimeSlot)}
        </div>
    </div>
);

let timeOutRef = null;
class HeaderSearch extends Component {

    constructor() {
        super();
        this.state = {
            value: '',
            suggestions: []
        };
    }

    componentWillUnmount(){
        if(timeOutRef !== null){
            clearTimeout(timeOutRef);
        }
    }

    onChange = (event, {newValue,method}) => {
        if (typeof newValue === 'string') {
            this.setState({
                value: newValue
            });
            return newValue;
        }
        if (newValue && newValue.eventSlotId && method !== "up" && method !== "down") {
            this.props.history.push(`/event/detail/${newValue.eventSlotId}`);
        }
    };



    onSuggestionsFetchRequested = ({value}) => {
        if(timeOutRef !== null){
            clearTimeout(timeOutRef);
        }
        if (value && value.length > 1) {
            timeOutRef = setTimeout(() =>{
                this.props.searchAllPublicEvents(value, null, null, null, null, (data) => {
                    this.setState({suggestions: data})
                });
            },400)
        }
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {

        const {value, suggestions} = this.state;
        const inputProps = {
            placeholder: 'Find Events or Movies',
            value,
            onChange: this.onChange
        };
        const isScrollable = this.props.isScrollable;

        return (
            <div className={"top-search-wrp"}>
                {
                    isScrollable ?
                        <div className={"top-header-search-wrp"}>
                            <div className="top-header-search-input">
                                <Autosuggest
                                    suggestions={suggestions}
                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                    getSuggestionValue={getSuggestionValue}
                                    renderSuggestion={renderSuggestion}
                                    inputProps={inputProps}
                                />
                                <i className="fas fa-search search-icon"/>
                            </div>
                        </div> :
                        <div className={"top-header-search-wrp"}>
                            <div className="top-header-search-input">
                                <Autosuggest
                                    suggestions={suggestions}
                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                    getSuggestionValue={getSuggestionValue}
                                    renderSuggestion={renderSuggestion}
                                    inputProps={inputProps}
                                />
                                <i className="fas fa-search search-icon"/>
                            </div>
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    searchAllPublicEventsData : state.event.searchAllPublicEvents
})

const connectedComponent = connect(mapStateToProps, {
    searchAllPublicEvents
    }
)(HeaderSearch);
export default withRouter(connectedComponent);