import React from 'react';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import CreateSchedulingTemplateStyled from '@components/Scheduling/CreateSchedulingStyled';
import CreateTemplate from '@components/Scheduling/CreateTemplate';

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
