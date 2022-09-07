import bookingManager from '@axios/bookingManager';
import patientEmrManager from '@axios/patientEmrManager';

import schedulingManager from './schedulingManager';

const API = {
  scheduling: schedulingManager,
  booking: bookingManager,
  patients: patientEmrManager
};

export default API;
