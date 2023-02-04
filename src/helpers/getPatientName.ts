const getPatientName = (title: string) => {
  let patientName = '';

  if (title) {
    const bracketIndex = title.indexOf('(');
    const hypenIndex = title.indexOf('-');

    patientName = title.slice(0, bracketIndex !== -1 ? bracketIndex : hypenIndex);
  }

  return patientName;
};

export default getPatientName;
