import React from 'react';
import useTimePeriodsContext from '@components/Scheduling/scheduleTemplateForm/hooks/useTimePeriodsContext';
import { Grid } from '@mui/material';
import { CypressIds } from 'constants/cypressIds';
import { margins } from 'themes/themeConstants';
import { v4 } from 'uuid';

import { PlusIconButton } from '@ui-component/common/buttons';

import { getDefaultTimePeriodState } from '../../../helpers';
import useAddNewScheduleButtonStatus from '../../../hooks/useAddNewScheduleButtonStatus';

const AddNewScheduleTemplateButton = () => {
  const plusIconButtonCyId = CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_BUTTON_PLUS;

  const { append } = useTimePeriodsContext();

  const onAddNewScheduleTemplateClick = () => {
    append({ ...getDefaultTimePeriodState(), id: v4() });
  };

  const isPlusButtonDisabled = useAddNewScheduleButtonStatus();

  return (
    <Grid item xs={12} sx={{ my: margins.topBottom16 }}>
      <PlusIconButton
        dataCy={plusIconButtonCyId}
        isPlusButtonDisabled={isPlusButtonDisabled}
        onClick={onAddNewScheduleTemplateClick}
      />
    </Grid>
  );
};

export default AddNewScheduleTemplateButton;
