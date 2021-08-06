const RemainingTime = (props) => {
  let remainingTime = props.remainingTime.remainingTime
    ? props.remainingTime.remainingTime
    : props.remainingTime.nextVoteTime;

  let hours = Math.floor(remainingTime / 60);
  let minutes = remainingTime % 60;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours} hours ${minutes} mins`;
};

export default RemainingTime;
