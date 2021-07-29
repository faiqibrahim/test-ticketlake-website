export const seatFormJSON = (props) => {
  const { onTypeChange, onSelectionChange, isTickets, isPasses } = props;

  const typeOptions = [];
  isTickets && typeOptions.push({ value: "ticket", name: "Ticket" });
  isPasses && typeOptions.push({ value: "pass", name: "Pass" });

  return [
    {
      label: "Select Purchase Type",
      name: "purchaseType",
      renderOnKey: null,
      type: "radio",
      radioOptions: typeOptions,
      onChange: ({ target }) => onTypeChange(target.value),
    },
    {
      label: "Seats Selection",
      name: "seatSelection",
      renderOnKey: "purchaseType",
      type: "radio",
      radioOptions: [
        { value: "preferred", name: "Preferred" },
        { value: "auto", name: "Auto" },
      ],
      onChange: ({ target }) => onSelectionChange(target),
    },
  ];
};
