import moment from "moment";

export const duration = (props) => {
  const currentDate = new moment();

  const endTime = new moment(props.endTime);

  let duration = moment.duration(endTime.diff(currentDate));

  let durationString = "";

  let { years, months, days, hours, minutes } = duration._data;

  const daysInYear = 365;
  const daysInMonths = moment().daysInMonth();

  days += daysInMonths * months + daysInYear * years;

  if (days > 0) {
    durationString = `${days === 1 ? days + "day" : days + "days"}, ${
      hours === 1 ? hours + "hour" : hours + "hours"
    } , ${minutes === 1 ? minutes + "minute" : minutes + "minutes"}  left`;
  } else if (hours > 0) {
    durationString = `00 days, ${
      hours === 1 ? hours + "hour" : hours + "hours"
    } , ${minutes === 1 ? minutes + "minute" : minutes + "minutes"}  left`;
  } else if (minutes > 0) {
    durationString = `00 days, 00 hours, ${
      minutes === 1 ? minutes + "minute" : minutes + "minutes"
    }  left`;
  } else {
    durationString = `00 days, 00 hours, 00 mins left`;
    const eventEnd = true;
    return { durationString, eventEnd };
  }

  return durationString;
};
