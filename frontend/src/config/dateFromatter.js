const dateFormater = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
});

//   const formattedDate = formatter.format(date);

export default dateFormater;
