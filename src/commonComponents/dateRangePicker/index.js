// Import
import React, {Component} from "react";
import DateRangePickerContainer from 'react-daterange-picker'
import 'react-daterange-picker/dist/css/react-calendar.css' // For some basic styling. (OPTIONAL)


class DateRangePicker extends Component {

    state = {
        date: null
    }
    onSelect = dates => this.setState({dates})

    render() {
        return (
            <div
                tabIndex="0"
                ref={c => this.dropDownList = c}
                onFocus={this.toggleDropdown}
                onBlur={this.toggleDropdown}>
                <DateRangePickerContainer
                    onSelect={this.onSelect}
                    value={this.state.dates}
                > {this.state.date}</DateRangePickerContainer>
            </div>
        )
    }

}


export default DateRangePicker;