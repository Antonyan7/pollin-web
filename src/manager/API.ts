import bookingManager from '@axios/bookingManager';

import schedulingManager from './schedulingManager';

const API = {
  scheduling: schedulingManager,
  booking: bookingManager
};

export default API;
