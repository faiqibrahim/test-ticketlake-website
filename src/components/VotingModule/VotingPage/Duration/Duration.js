import moment from "moment";

const duration = (props) => {
  const currentDate = new moment();

  const endTime = new moment(props.endTime);

  let duration = moment.duration(endTime.diff(currentDate));

  let durationString = "";

  if (duration._data.days > 0) {
    durationString = `${
      duration._data.days === 1
        ? duration._data.days + "day"
        : duration._data.days + "days"
    }, ${
      duration._data.hours === 1
        ? duration._data.hours + "hour"
        : duration._data.hours + "hours"
    } , ${
      duration._data.minutes === 1
        ? duration._data.minutes + "minute"
        : duration._data.minutes + "minutes"
    }  left`;
  } else if (duration._data.hours > 0) {
    durationString = `00 days, ${
      duration._data.hours === 1
        ? duration._data.hours + "hour"
        : duration._data.hours + "hours"
    } , ${
      duration._data.minutes === 1
        ? duration._data.minutes + "minute"
        : duration._data.minutes + "minutes"
    }  left`;
  } else if (duration._data.minutes > 0) {
    durationString = `00 days, 00 hours, ${
      duration._data.minutes === 1
        ? duration._data.minutes + "minute"
        : duration._data.minutes + "minutes"
    }  left`;
  } else {
    durationString = `00 days, 00 hours, 00 mins left`;
  }

  return durationString;
};
export default duration;
