import React from 'react';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import CreateSchedulingTemplateStyled from '@components/Scheduling/createSchedulingStyled';
import CreateTemplate from '@components/Scheduling/createTemplate';

const CreateSchedulingTemplate = () => (
  <CreateSchedulingTemplateStyled>
    <div className="create-scheduling-template">
      <MainBreadcrumb
        currentPage="Create Schedule Templates"
        navigation={{
          basePath: '/',
          items: [{ name: 'Create Schedule Templates', path: '/scheduling/create-template' }]
        }}
      />
      <CreateTemplate />
    </div>
  </CreateSchedulingTemplateStyled>
);

export default CreateSchedulingTemplate;
