import React from 'react';
import dynamic from 'next/dynamic';

const DynamicCalendar = dynamic(() => import('@ui-component/weekly-calendar'));

const ViewScheduleTemplate = () => (
  <div className="view-scheduling-calendar">
    <DynamicCalendar calendarDate={new Date().toISOString()} />
  </div>
);

export default ViewScheduleTemplate;
