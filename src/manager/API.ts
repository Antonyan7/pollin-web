import bookingManager from '@axios/bookingManager';
import patientEmrManager from '@axios/patientEmrManager';

import schedulingManager from './schedulingManager';

const API = {
  scheduling: schedulingManager,
  patients: patientEmrManager,
  booking: bookingManager
};

export default API;
