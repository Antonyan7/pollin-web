import React from 'react';
import { useTranslation } from 'react-i18next';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import CreateSchedulingTemplateStyled from '@components/Scheduling/CreateSchedulingStyled';
import CreateTemplate from '@components/Scheduling/CreateTemplate';
import { Translation } from 'constants/translations';

const CreateSchedulingTemplate = () => {
  const [t] = useTranslation();

  return (
    <CreateSchedulingTemplateStyled>
      <div className="create-scheduling-template">
        <MainBreadcrumb
          currentPage={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_TITLE)}
          navigation={{
            basePath: '/',
            items: [
              {
                name: t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_TITLE),
                path: '/scheduling/create-template'
              }
            ]
          }}
        />
        <CreateTemplate />
      </div>
    </CreateSchedulingTemplateStyled>
  );
};

export default CreateSchedulingTemplate;
