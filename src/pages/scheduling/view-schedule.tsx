import React from 'react';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import ViewScheduleTemplate from '@components/Scheduling/ViewScheduleTemplate';
import ViewSchedulingTemplateStyled from '@components/Scheduling/ViewScheduleTemplateStyle';

const ViewSchedule = () => (
  <ViewSchedulingTemplateStyled>
    <div className="view-scheduling-template">
      <MainBreadcrumb
        currentPage="View Schedule"
        navigation={{
          basePath: '/',
          items: [
            { name: 'Schedule Template', path: '/scheduling/schedule-template' },
            { name: 'View Schedule', path: '/scheduling/view-schedule' }
          ]
        }}
      />
      <ViewScheduleTemplate />
    </div>
  </ViewSchedulingTemplateStyled>
);

export default ViewSchedule;
