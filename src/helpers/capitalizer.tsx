const capitalizer = (title: string) => {
  const capitalizedAlertTitle = title.replace(/^./, title[0].toUpperCase());

  return capitalizedAlertTitle;
};

export default capitalizer;
