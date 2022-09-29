import React from 'react';
import { ScheduleBoxWrapper } from '@components/Appointments/CommonMaterialComponents';
import dynamic from 'next/dynamic';

const DynamicCalendar = dynamic(() => import('@ui-component/weekly-calendar'));

const ViewScheduleTemplate = () => (
  <ScheduleBoxWrapper>
    <DynamicCalendar calendarDate={new Date().toISOString()} />
  </ScheduleBoxWrapper>
);

export default ViewScheduleTemplate;
