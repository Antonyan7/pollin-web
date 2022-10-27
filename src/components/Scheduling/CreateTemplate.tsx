import React, { useEffect } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScheduleBoxWrapper, StyledButton } from '@components/Appointments/CommonMaterialComponents';
import { TimePeriods } from '@components/Scheduling/scheduleTemplates/TimePeriods';
import { yupResolver } from '@hookform/resolvers/yup';
import { Divider, Grid, TextField, Typography } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { Translation } from 'constants/translations';
import { standardDate } from 'helpers/constants';
import { schedulingMiddleware, schedulingSelector } from 'redux/slices/scheduling';
import { viewsMiddleware } from 'redux/slices/views';
import { borderRadius, margins, paddings } from 'themes/themeConstants';
import { ISingleTemplate, ITemplateGroup, PeriodType } from 'types/create-schedule';
import { v4 } from 'uuid';

import { ButtonWithLoading, PlusIconButton } from '@ui-component/common/buttons';
import { changeDateSameTimezone } from '@utils/dateUtils';

import { createTemplateValidationSchema } from '../../validation/scheduling/create_template';

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

  const isScheduleLoading = useAppSelector(schedulingSelector.scheduleLoading);

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
          reqBody.startTime = changeDateSameTimezone(rest.startTime, standardDate);
          reqBody.endTime = changeDateSameTimezone(rest.endTime, standardDate);
        }

        return reqBody;
      })
    };

    dispatch(schedulingMiddleware.createScheduleTemplate(body));
  };

  const methods = useForm({
    defaultValues: getEmptyTemplateState(),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(createTemplateValidationSchema)
  });
  const { errors } = methods.formState;
  const errorMessage =
    (errors.name?.type === 'required' && t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_NAME_ERROR)) ||
    (errors.name?.type === 'max' && t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_NAME_LENGTH_ERROR));
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
                color="primary"
                fullWidth
                helperText={errors.name?.message && errorMessage}
                error={Boolean(errors.name?.message)}
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
                color="primary"
                onClick={onCancelClick}
                variant="outlined"
                size="large"
                sx={{ marginRight: margins.right2, marginLeft: margins.auto }}
              >
                {t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_BUTTON_CANCEL)}
              </StyledButton>
              <ButtonWithLoading
                isLoading={isScheduleLoading}
                color="primary"
                variant="contained"
                type="submit"
                sx={{
                  paddingLeft: paddings.left4,
                  paddingRight: paddings.right4,
                  borderRadius: borderRadius.radius8
                }}
              >
                {t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_BUTTON_SAVE)}
              </ButtonWithLoading>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </ScheduleBoxWrapper>
  );
};

export default CreateTemplate;
