import React from 'react';

import Calendar from '@ui-component/weekly-calendar';

const ViewScheduleTemplate = () => (
  <div className="view-scheduling-calendar">
    <Calendar calendarDate={new Date().toISOString()} />
  </div>
);

export default ViewScheduleTemplate;
