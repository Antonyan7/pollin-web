import { CoreProps } from 'types/reduxTypes/coreStateTypes';

export const getInitialState = (): CoreProps => ({
  clinicConfig: {
    timeZone: '',
    currentDate: new Date().toDateString(),
    workingHours: {
      start: '',
      end: ''
    }
  },
  initializationStatus: {
    firebase: false,
    featureFlags: false
  }
});
