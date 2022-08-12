import React from 'react';
import CreateSchedulingTemplateStyled from '@components/Scheduling/createSchedulingStyled';
import CreateTemplate from '@components/Scheduling/createTemplate';

const CreateSchedulingTemplate = () => (
  <CreateSchedulingTemplateStyled>
    <div className="create-scheduling-template">
      <CreateTemplate />
    </div>
  </CreateSchedulingTemplateStyled>
);

export default CreateSchedulingTemplate;
