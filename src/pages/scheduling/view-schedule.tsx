import React from 'react';
import { useTranslation } from 'react-i18next';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import ViewScheduleTemplate from '@components/Scheduling/ViewScheduleTemplate';
import ViewSchedulingTemplateStyled from '@components/Scheduling/ViewScheduleTemplateStyle';
import { Translation } from 'constants/translations';

const ViewSchedule = () => {
  const [t] = useTranslation();

  return (
    <ViewSchedulingTemplateStyled>
      <div className="view-scheduling-template">
        <MainBreadcrumb
          currentPage={t(Translation.PAGE_SCHEDULING_VIEW_TITLE)}
          navigation={{
            basePath: '/',
            items: [
              { name: t(Translation.PAGE_SCHEDULING_TEMPLATES_TITLE), path: '/scheduling/schedule-template' },
              { name: t(Translation.PAGE_SCHEDULING_VIEW_TITLE), path: '/scheduling/view-schedule' }
            ]
          }}
        />
        <ViewScheduleTemplate />
      </div>
    </ViewSchedulingTemplateStyled>
  );
};

export default ViewSchedule;
