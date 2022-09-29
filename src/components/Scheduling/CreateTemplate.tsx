import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScheduleBoxWrapper, StyledButton } from '@components/Appointments/CommonMaterialComponents';
import { TimePeriods } from '@components/Scheduling/scheduleTemplates/TimePeriods';
import { Divider, Grid, TextField, Typography } from '@mui/material';
import { Translation } from 'constants/translations';
import { useFormik } from 'formik';
import { schedulingMiddleware } from 'redux/slices/scheduling';
import { viewsMiddleware } from 'redux/slices/views';
import { v4 } from 'uuid';

import { PlusIconButton } from '@ui-component/common/buttons';
import { changeDate } from '@utils/dateUtils';

import { dispatch } from '../../redux/hooks';
import { ISingleTemplate, ITemplateGroup, ServiceTypeOrBlock } from '../../types/create-schedule';

const getDefaultTimePeriodState = (): ISingleTemplate => ({
  id: v4(),
  days: new Array<number>(),
  startTime: null,
  endTime: null,
  periodType: ServiceTypeOrBlock.ServiceType,
  serviceTypes: new Array<string>(),
  placeholderName: ''
});

const getEmptyTemplateState = (): ITemplateGroup => ({
  name: '',
  timePeriods: [getDefaultTimePeriodState()]
});

const CreateTemplate = () => {
  const [templateData, setTemplateData] = useState<ITemplateGroup>(getEmptyTemplateState());
  const [t] = useTranslation();

  useEffect(() => {
    dispatch(schedulingMiddleware.getServiceTypes());
  }, []);

  const onCancelClick = () => {
    dispatch(
      viewsMiddleware.setRedirectionState({
        path: '/scheduling/schedule-template',
        params: '',
        apply: true
      })
    );
  };

  const handleSaveClick = () => {
    const body = {
      ...templateData,
      timePeriods: templateData.timePeriods.map((item) => {
        const { id, ...rest } = item;

        if (rest.startTime && rest.endTime) {
          rest.startTime = changeDate(new Date(rest.startTime).toISOString(), new Date(1970, 0, 1));
          rest.endTime = changeDate(new Date(rest.endTime).toISOString(), new Date(1970, 0, 1));
        }

        return rest;
      })
    };

    dispatch(schedulingMiddleware.createScheduleTemplate(body));
  };

  const onPlusClick = () => {
    setTemplateData({
      ...templateData,
      timePeriods: [...templateData.timePeriods, { ...getDefaultTimePeriodState(), id: v4() }]
    });
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTemplateData({ ...templateData, name: e.target.value });
  };

  const createScheduleForm = useFormik({
    initialValues: getEmptyTemplateState(),
    onSubmit: () => handleSaveClick()
  });

  return (
    <ScheduleBoxWrapper>
      <form onSubmit={createScheduleForm.handleSubmit}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} lg={3}>
            <Typography>{t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_NAME)}</Typography>
          </Grid>
          <Grid item xs={12} lg={9}>
            <TextField
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleNameChange(e)}
              className="schedule-inputs"
              fullWidth
              placeholder={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_NAME)}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <TimePeriods timePeriods={templateData.timePeriods} setTemplateData={setTemplateData} />
          </Grid>
          <Grid item xs={12}>
            <PlusIconButton onClick={onPlusClick} />
          </Grid>
          <Grid item xs={12} display="flex">
            <StyledButton
              color="secondary"
              onClick={onCancelClick}
              variant="outlined"
              size="large"
              sx={{ marginRight: 2, marginLeft: 'auto' }}
            >
              {t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_BUTTON_CANCEL)}
            </StyledButton>
            <StyledButton
              color="secondary"
              variant="contained"
              size="large"
              type="submit"
              sx={{ paddingLeft: 5, paddingRight: 5 }}
            >
              {t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_BUTTON_SAVE)}
            </StyledButton>
          </Grid>
        </Grid>
      </form>
    </ScheduleBoxWrapper>
  );
};

export default CreateTemplate;
