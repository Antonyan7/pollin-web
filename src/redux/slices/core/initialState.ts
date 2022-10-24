export const getInitialState = () => ({
  clinicConfig: {
    timeZone: '',
    currentDate: new Date().toDateString(),
    workingHours: {
      start: '',
      end: ''
    }
  }
});
