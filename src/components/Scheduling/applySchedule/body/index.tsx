import React from 'react';

import EndTime from './EndTime';
import RepeatsField from './RepeatsField';
import ResourceField from './ResourceField';
import ScheduleTemplateField from './ScheduleTemplateField';
import SelectedWeekdaysForSchedule from './SelectedWeekdaysForSchedule';
import StartTime from './StartTime';

const FormBody = () => (
  <>
    <ResourceField />
    <ScheduleTemplateField />
    <SelectedWeekdaysForSchedule />
    <RepeatsField />
    <StartTime />
    <EndTime />
  </>
);

export default FormBody;
