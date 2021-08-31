import React, {Component} from 'react';
import moment from 'moment';

class Timer extends Component {

    state = {
        durationInSeconds: 0,
        intervalRef: null
    }

    componentDidMount() {
        const {hours, minutes, seconds, onComplete} = this.props;
        const durationInSeconds = ((hours || 0) * 60 * 60) + ((minutes || 0) * 60) + (seconds || 0);

        const intervalRef = setInterval(() => {
            const {durationInSeconds} = this.state;
            const remainingDuration = durationInSeconds - 1;

            this.setState({durationInSeconds: remainingDuration}, () => {
                if (remainingDuration <= 0) {
                    onComplete && onComplete();
                    clearInterval(intervalRef);
                }
            });

        }, 1000);

        this.setState({durationInSeconds, intervalRef});
    }

    componentWillUnmount() {
        if (this.state.intervalRef) {
            clearInterval(this.state.intervalRef);
        }
    }

    render() {
        const {durationInSeconds} = this.state;

        if (!durationInSeconds) return null;

        const duration = moment.duration(durationInSeconds, 'seconds');
        const hours = duration.hours() ? `${toText(duration.hours())}:` : "";
        const minutes = duration.minutes() ? `${toText(duration.minutes())}:` : "00:";
        const seconds = duration.seconds() ? `${toText(duration.seconds())}` : "";

        const result = hours + minutes + seconds;
        return (
            <span className={this.props.className} style={this.props.style}>{` ${result}`}</span>
        );
    }
}

const toText = (duration) => {
    if (duration < 10)
        return `0${duration}`;
    else
        return `${duration}`;
}

export default Timer;
