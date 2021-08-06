export function formDataTypes() {
  return {
    mobile: {
      title: "Mobile Number",
      type: "text",
      name: "mobilenumber",
      value: "",
      placeholder: "Please enter your mobile number ",
      required: true,
    },
    channel: {
      title: "Channel",
      type: "text",
      name: "channel",
      value: "",
      placeholder: "Please enter your payment channel",
      required: true,
    },
  };
}
