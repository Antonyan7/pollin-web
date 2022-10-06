import React, { useEffect } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScheduleBoxWrapper, StyledButton } from '@components/Appointments/CommonMaterialComponents';
import { TimePeriods } from '@components/Scheduling/scheduleTemplates/TimePeriods';
import { Divider, Grid, TextField, Typography } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { Translation } from 'constants/translations';
import { schedulingMiddleware } from 'redux/slices/scheduling';
import { viewsMiddleware } from 'redux/slices/views';
import { ISingleTemplate, ITemplateGroup, PeriodType } from 'types/create-schedule';
import { v4 } from 'uuid';

import { PlusIconButton } from '@ui-component/common/buttons';
import { changeDate } from '@utils/dateUtils';

const getDefaultTimePeriodState = (): ISingleTemplate => ({
  id: v4(),
  days: new Array<number>(),
  startTime: null,
  endTime: null,
  periodType: PeriodType.ServiceType,
  serviceTypes: new Array<string>(),
  placeholderName: ''
});

const getEmptyTemplateState = (): ITemplateGroup => ({
  name: '',
  timePeriods: [getDefaultTimePeriodState()]
});

const CreateTemplate = () => {
  const [t] = useTranslation();

  useEffect(() => {
    dispatch(schedulingMiddleware.getServiceTypes());
  }, []);

  const onCancelClick = () => {
    dispatch(
      viewsMiddleware.setRedirectionState({
        path: '/scheduling/schedule-templates',
        params: '',
        apply: true
      })
    );
  };

  const handleSaveClick = (values: ITemplateGroup) => {
    const body: ITemplateGroup = {
      ...values,
      timePeriods: values.timePeriods.map((item) => {
        const { id, serviceTypes, ...rest } = item;

        const reqBody: ISingleTemplate = rest;

        if (item.periodType === PeriodType.ServiceType) {
          reqBody.serviceTypes = serviceTypes;
        }

        if (rest.startTime && rest.endTime) {
          reqBody.startTime = changeDate(new Date(rest.startTime).toISOString(), new Date(1970, 0, 1));
          reqBody.endTime = changeDate(new Date(rest.endTime).toISOString(), new Date(1970, 0, 1));
        }

        return reqBody;
      })
    };

    dispatch(schedulingMiddleware.createScheduleTemplate(body));
  };

  const methods = useForm({
    defaultValues: getEmptyTemplateState()
  });

  const { append } = useFieldArray({
    control: methods.control,
    name: 'timePeriods'
  });

  const onPlusClick = () => {
    append({ ...getDefaultTimePeriodState(), id: v4() });
  };

  return (
    <ScheduleBoxWrapper>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSaveClick)}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} lg={3}>
              <Typography>{t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_NAME)}</Typography>
            </Grid>
            <Grid item xs={12} lg={9}>
              <TextField
                {...methods.register('name')}
                className="schedule-inputs"
                fullWidth
                placeholder={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_NAME)}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
              <TimePeriods />
            </Grid>
            <Grid item xs={12}>
              <PlusIconButton onClick={onPlusClick} />
            </Grid>
            <Grid item xs={12} container justifyContent="flex-end">
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
      </FormProvider>
    </ScheduleBoxWrapper>
  );
};

export default CreateTemplate;
