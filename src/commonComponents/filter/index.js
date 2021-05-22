import React from 'react';

const filter = (props) => {
    return(
        <div className="col-md-4">
            <div className="mobile-list-controls fl-wrap">
                <div className="mlc show-list-wrap-search fl-wrap"><i className="fal fa-filter" /> Filter</div>
            </div>
            <div className="fl-wrap filter-sidebar_item fixed-bar">
                <div className="filter-sidebar fl-wrap lws_mobile">
                    {/*col-list-search-input-item */}
                    <div className="col-list-search-input-item in-loc-dec fl-wrap not-vis-arrow">
                        <label>City/Category</label>
                        <div className="listsearch-input-item">
                            <select data-placeholder="City" className="chosen-select">
                                <option>All Cities</option>
                                <option>New York</option>
                                <option>London</option>
                                <option>Paris</option>
                                <option>Kiev</option>
                                <option>Moscow</option>
                                <option>Dubai</option>
                                <option>Rome</option>
                                <option>Beijing</option>
                            </select>
                        </div>
                    </div>
                    {/*col-list-search-input-item end*/}
                    {/*col-list-search-input-item */}
                    <div className="col-list-search-input-item fl-wrap location autocomplete-container">
                        <label>Destination</label>
                        <span className="header-search-input-item-icon"><i className="fal fa-map-marker-alt" /></span>
                        <input type="text" placeholder="Destination or Hotel Name" className="autocomplete-input" id="autocompleteid3" defaultValue />
                        <a href="#"><i className="fal fa-dot-circle" /></a>
                    </div>
                    {/*col-list-search-input-item end*/}
                    {/*col-list-search-input-item */}
                    <div className="col-list-search-input-item in-loc-dec date-container  fl-wrap">
                        <label>Date In-Out </label>
                        <span className="header-search-input-item-icon"><i className="fal fa-calendar-check" /></span>
                        <input type="text" placeholder="When" name="dates" defaultValue />
                    </div>
                    {/*col-list-search-input-item end*/}
                    {/*col-list-search-input-item */}
                    <div className="col-list-search-input-item fl-wrap">
                        <div className="quantity-item">
                            <label>Rooms</label>
                            <div className="quantity">
                                <input type="number" min={1} max={3} step={1} defaultValue={1} />
                            </div>
                        </div>
                        <div className="quantity-item">
                            <label>Adults</label>
                            <div className="quantity">
                                <input type="number" min={1} max={5} step={1} defaultValue={1} />
                            </div>
                        </div>
                        <div className="quantity-item">
                            <label>Children</label>
                            <div className="quantity">
                                <input type="number" min={0} max={3} step={1} defaultValue={0} />
                            </div>
                        </div>
                    </div>
                    {/*col-list-search-input-item end*/}
                    {/*col-list-search-input-item */}
                    <div className="col-list-search-input-item fl-wrap">
                        <div className="range-slider-title">Price range</div>
                        <div className="range-slider-wrap fl-wrap">
                            <input className="range-slider" data-from={300} data-to={1200} data-step={50} data-min={50} data-max={2000} data-prefix="$" />
                        </div>
                    </div>
                    {/*col-list-search-input-item end*/}
                    {/*col-list-search-input-item */}
                    <div className="col-list-search-input-item fl-wrap">
                        <label>Star Rating</label>
                        <div className="search-opt-container fl-wrap">
                            {/* Checkboxes */}
                            <ul className="fl-wrap filter-tags">
                                <li className="five-star-rating">
                                    <input id="check-aa2" type="checkbox" name="check" defaultChecked />
                                    <label htmlFor="check-aa2"><span className="listing-rating card-popup-rainingvis" data-starrating2={5}><span>5 Stars</span></span></label>
                                </li>
                                <li className="four-star-rating">
                                    <input id="check-aa3" type="checkbox" name="check" />
                                    <label htmlFor="check-aa3"><span className="listing-rating card-popup-rainingvis" data-starrating2={5}><span>4 Star</span></span></label>
                                </li>
                                <li className="three-star-rating">
                                    <input id="check-aa4" type="checkbox" name="check" />
                                    <label htmlFor="check-aa4"><span className="listing-rating card-popup-rainingvis" data-starrating2={5}><span>3 Star</span></span></label>
                                </li>
                            </ul>
                            {/* Checkboxes end */}
                        </div>
                    </div>
                    {/*col-list-search-input-item end*/}
                    {/*col-list-search-input-item */}
                    <div className="col-list-search-input-item fl-wrap">
                        <label>Facility</label>
                        <div className="search-opt-container fl-wrap">
                            {/* Checkboxes */}
                            <ul className="fl-wrap filter-tags half-tags">
                                <li>
                                    <input id="check-aaa5" type="checkbox" name="check" defaultChecked />
                                    <label htmlFor="check-aaa5">Free WiFi</label>
                                </li>
                                <li>
                                    <input id="check-bb5" type="checkbox" name="check" />
                                    <label htmlFor="check-bb5">Parking</label>
                                </li>
                                <li>
                                    <input id="check-dd5" type="checkbox" name="check" />
                                    <label htmlFor="check-dd5">Fitness Center</label>
                                </li>
                            </ul>
                            {/* Checkboxes end */}
                            {/* Checkboxes */}
                            <ul className="fl-wrap filter-tags half-tags">
                                <li>
                                    <input id="check-ff5" type="checkbox" name="check" />
                                    <label htmlFor="check-ff5">Airport Shuttle</label>
                                </li>
                                <li>
                                    <input id="check-cc5" type="checkbox" name="check" defaultChecked />
                                    <label htmlFor="check-cc5">Non-smoking Rooms</label>
                                </li>
                                <li>
                                    <input id="check-c4" type="checkbox" name="check" defaultChecked />
                                    <label htmlFor="check-c4">Air Conditioning</label>
                                </li>
                            </ul>
                            {/* Checkboxes end */}
                        </div>
                    </div>
                    {/*col-list-search-input-item end*/}
                    {/*col-list-search-input-item  */}
                    <div className="col-list-search-input-item fl-wrap">
                        <button className="header-search-button" >Search <i className="far fa-search" /></button>
                    </div>
                    {/*col-list-search-input-item end*/}
                </div>
            </div>
        </div>
    )
};

export default filter;