const GET_URL = () => {
  const { REACT_APP_ENV } = process.env;
  let url = "";

  switch (REACT_APP_ENV.trim()) {
    case "dev":
      //url = "http://192.168.2.50:5030/";
      url = "https://api.qa.ticketlake.com/";
      break;
    case "qa":
      url = "https://api.ticketlake.qa.com/";
      break;
    case "staging":
      url = "https://stagingapi.ticketlake.com/";
      break;
    case "production":
      url = "https://api.ticketlake.com/";
      break;
    default:
      break;
  }
  return url;
};

export const API_SERVER_URL = GET_URL();
