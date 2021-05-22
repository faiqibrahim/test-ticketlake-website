// library
import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getAllCategories} from "../../redux/category/category-actions";
import {
    getAllEvents,
    searchEvents,
    getDateFilterEvents,
    getCityFilterEvents,
    getAllFiltersEvents
} from '../../redux/event/event-actions';
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import ReactFlagsSelect from 'react-flags-select';
import queryString from 'query-string';
import {dateSplitter} from '../../utils/common-utils';

// Importing Config
import {filteredCities} from '../../utils/config';

let from = '';
let to = '';

class EventListingFilters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            country: '',
            city: '',
            search: null,
            allSearchedEvents: [],
            date: [new Date(), new Date()],
            from: null,
            to: null
        }
    }

    componentDidMount() {
        const query = queryString.parse(this.props.location.search);
        if (query.category) {
            let state = {...this.state};
            state.categories = [query.category];
            this.setState(state);
        }
        if (query.when) {
            const dates = query.when.split(" ");
            from = `${dates[0]}T00:00:00.000Z`;
            to = `${dates[1]}T11:59:59.000Z`;
            this.setState({from: from, to: to});
            this.setState({date: [from, to]})
        }

        if (query.location) {
            this.setState({city: query.location});
        }
        this.props.getAllCategories();
    }

    onDateChange = (date) => {

        this.setState({date});

        const fromDate = date && date[0] !== null ? date[0] : null;
        const fromDateTime = dateSplitter(fromDate);
        from = `${fromDateTime}T00:00:00.000Z`;

        const toDate = date && date[1] !== null ? date[1] : null;
        const toDateTime = dateSplitter(toDate);
        to = `${toDateTime}T11:59:59.000Z`;

        if (from && to) {
            let dateTimeSearch = true;
            let firstPaginate = true;
            this.props.getDateFilterEvents('true', '1', '12', from, to, dateTimeSearch, firstPaginate, this.state.categories, this.state.city)
        } else {
            return null
        }
    };

    // onCountryChange = (country) => {
    //     this.setState({country});
    // };

    onCategoryChange = (e) => {
        let {target} = e;
        let state = {...this.state};
        let data = [];
        if (target.value === "All") {
            this.props.getAllEvents(() => {
            }, 'true', '1', '12', '', from, to, '', '', '', state.city)
        } else {
            data.push(target.value);
            state[target.name] = data;
            this.setState({...state});
            this.getCategoryFilters(state);
        }
    };

    getCategoryFilters = (state) => {
        if (state.categories !== []) {
            let search = true;
            let firstPaginate = true;
            this.props.getAllEvents(() => {
            }, 'true', '1', '12', state.categories, from, to, search, firstPaginate, '', state.city)
        } else {
            return null;
        }
    };

    onInputChange = (e) => {
        let {target} = e;
        let state = {...this.state};
        state[target.name] = target.value;
        if (target.value === "All") {
            this.props.getAllEvents(() => {
            }, 'true', '1', '12', state.categories, from, to, '', '', '', '')
        } else {
            this.setState(state);
            this.getCityFilters(state);
        }
    };

    getCityFilters = (state) => {
        if (state.city !== '') {
            let citySearch = true;
            let firstPaginate = true;
            this.props.getCityFilterEvents('true', '1', '12', state.city, citySearch, firstPaginate, from, to, state.categories)
        } else {
            return null;
        }
    };

    handleChange = (event) => {
        if (event.target.value.length === 0) {
            this.setState({
                search: '',
            })
        } else {
            this.setState({
                search: event.target.value,
            })
        }
    };

    toggleShowOnMobile = () => {
        const container = document.getElementById('filtersContainer');
        if (container.style.display === '' || container.style.display === 'none') {
            container.style.display = 'block';
        } else {
            container.style.display = 'none';
        }
    };

    onSearchClick = (e) => {
        e.preventDefault();
        this.props.onSearch(this.state.search);
        this.props.getAllFiltersEvents('true', '1', '12', this.state.categories, this.state.city, from, to, this.state.search, 'true');
    };

    render() {
        let cities = filteredCities();
        const {categories} = this.props;
        return (
            <>
                <div className="mobile-list-controls fl-wrap mar-bot-cont" onClick={this.toggleShowOnMobile}>
                    <div className="mlc show-list-wrap-search fl-wrap">
                        <i className="fa fa-filter" style={{color: 'white'}}/> Filter
                    </div>
                </div>
                <div className="list-wrap-search lisfw fl-wrap lws_mobile" id={'filtersContainer'}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5ths">
                                <div className="col-list-search-input-item fl-wrap location autocomplete-container">
                                    <label>Keyword</label>
                                    <input
                                        type="text"
                                        placeholder="I am Looking for.."
                                        className="autocomplete-input filterDropDowns"
                                        id="autocompleteid3"
                                        style={{padding: '12px 10px 11px 10px', height: '31px'}}
                                        // onChange={(e) => this.props.searchEvents(e.target.value, searchFields)}
                                        onChange={this.handleChange}
                                        value={this.state.search}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-5ths">
                                <div className="col-list-search-input-item fl-wrap location autocomplete-container">
                                    <label>Event Category</label>
                                    <select data-placeholder="Category"
                                            name="categories"
                                            onChange={this.onCategoryChange}
                                            className="chosen-select no-search-select filterDropDowns">
                                        <option disabled selected>Select Category</option>
                                        <option>All</option>
                                        {
                                            Array.isArray(categories) && categories.map((x, i) => {
                                                return (
                                                    <option
                                                        key={i}
                                                        selected={(this.state.categories[0] === x._id) ? "selected" : null}
                                                        value={x._id}>{x.name}</option>
                                                )
                                            })
                                        }
                                    </select>

                                </div>
                            </div>
                            <div className="col-md-5ths fullWidthOnSmallScreen">
                                <div className="col-list-search-input-item fl-wrap location autocomplete-container">
                                    <label>City</label>

                                    <select data-placeholder="City"
                                            name="city"
                                            onChange={this.onInputChange}
                                            className="chosen-select no-search-select filterDropDowns">
                                        <option disabled selected>Select City</option>
                                        <option>All</option>
                                        {
                                            Array.isArray(cities) && cities.map((city, i) => {
                                                return (
                                                    <option key={i}
                                                            selected={(this.state.city === city.label) ? 'selected' : null}
                                                            value={city.value}>{city.label}</option>
                                                )
                                            })
                                        }
                                    </select>

                                    {/*<ReactFlagsSelect*/}
                                    {/*className="country"*/}
                                    {/*alignOptions="left"*/}
                                    {/*selectedSize="14"*/}
                                    {/*onSelect={this.onCountryChange}*/}
                                    {/*/>*/}

                                </div>
                            </div>
                            <div className="col-md-5ths">
                                <div className="col-list-search-input-item fl-wrap location autocomplete-container">
                                    <label>Date </label>

                                    <DateRangePicker
                                        onChange={this.onDateChange}
                                        value={this.state.date}
                                        className={{height: '36px'}}
                                    />

                                </div>
                            </div>
                            <div className="col-md-5ths" style={{top: '5px'}}>
                                <div className="col-list-search-input-item fl-wrap">
                                    <button className="header-search-button"
                                            onClick={(e) => this.onSearchClick(e)} style={{height: '42px'}}>
                                        Search
                                        <i className="fas fa-search"/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.category.categories,
        allEvents: state.event.allEvents
    }
};

const connectedComponent = connect(mapStateToProps, {
    getAllCategories,
    getAllEvents,
    searchEvents,
    getDateFilterEvents,
    getCityFilterEvents,
    getAllFiltersEvents
})(EventListingFilters);
export default withRouter(connectedComponent);

