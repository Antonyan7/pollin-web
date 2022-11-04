import React, { useEffect } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScheduleBoxWrapper, StyledButton } from '@components/Appointments/CommonMaterialComponents';
import { TimePeriods } from '@components/Scheduling/scheduleTemplates/TimePeriods';
import { yupResolver } from '@hookform/resolvers/yup';
import { Divider, Grid, TextField, Typography } from '@mui/material';
import { coreSelector } from '@redux/slices/core';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { schedulingMiddleware, schedulingSelector } from 'redux/slices/scheduling';
import { borderRadius, heights, margins, paddings } from 'themes/themeConstants';
import { ISingleTemplate, ITemplateGroup, PeriodType } from 'types/create-schedule';
import { v4 } from 'uuid';

import { ButtonWithLoading, PlusIconButton } from '@ui-component/common/buttons';
import { calculateTimeInUTC, changeDateSameTimeString } from '@utils/dateUtils';

import { createTemplateValidationSchema } from '../../validation/scheduling/create_template';

const getDefaultTimePeriodState = (): ISingleTemplate => ({
  id: v4(),
  days: [],
  startTime: null,
  endTime: null,
  periodType: PeriodType.ServiceType,
  serviceTypes: [],
  placeholderName: ''
});

const getEmptyTemplateState = (): ITemplateGroup => ({
  name: '',
  timePeriods: [getDefaultTimePeriodState()]
});

const EditTemplate = () => {
  const scheduleTemplate = useAppSelector(schedulingSelector.scheduleSingleTemplate);
  const { currentDate } = useAppSelector(coreSelector.clinicConfigs);

  const isScheduleLoading = useAppSelector(schedulingSelector.scheduleLoading);
  const [t] = useTranslation();
  const router = useRouter();
  const { scheduleId } = router.query;

  const scheduleTemplateID = scheduleId as string;

  useEffect(() => {
    dispatch(schedulingMiddleware.getServiceTypes());
  }, []);

  useEffect(() => {
    dispatch(schedulingMiddleware.getSingleSchedule(scheduleTemplateID));
  }, [scheduleId, scheduleTemplateID]);

  const onOpenModalClick = () => {
    router.back();
  };

  const handleSaveClick = (values: ITemplateGroup) => {
    const body: ITemplateGroup = {
      name: values.name,
      timePeriods: values.timePeriods.map((item) => {
        const { serviceTypes, ...rest } = item;
        const reqBody: ISingleTemplate = rest;

        if (item.periodType === PeriodType.ServiceType) {
          reqBody.serviceTypes = serviceTypes;
        }

        if (rest.startTime && rest.endTime) {
          reqBody.startTime = changeDateSameTimeString(calculateTimeInUTC(rest.startTime), currentDate);
          reqBody.endTime = changeDateSameTimeString(calculateTimeInUTC(rest.endTime), currentDate);
        }

        return reqBody;
      })
    };

    dispatch(schedulingMiddleware.updateSingleSchedule(scheduleTemplateID, body));
  };

  const methods = useForm<ITemplateGroup>({
    defaultValues: getEmptyTemplateState(),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(createTemplateValidationSchema)
  });
  const { errors } = methods.formState;
  const errorMessage = t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_NAME_ERROR);

  const { reset, formState, setValue, handleSubmit, register } = methods;

  const { append } = useFieldArray({
    control: methods.control,
    name: 'timePeriods'
  });

  const onPlusClick = () => {
    append({ ...getDefaultTimePeriodState(), id: v4() });
  };

  useEffect(() => {
    Object.entries(scheduleTemplate).map(([key, value]) => setValue(key as keyof ITemplateGroup, value));
  }, [scheduleTemplate, setValue]);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
      router.back();
    }
  }, [router, reset, formState]);

  return (
    <ScheduleBoxWrapper>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSaveClick)}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} lg={3}>
              <Typography>{t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_NAME)}</Typography>
            </Grid>
            <Grid item xs={12} lg={9}>
              <TextField
                {...register('name')}
                className="schedule-inputs"
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
            <Grid item xs={12} display="flex">
              <StyledButton
                color="primary"
                onClick={onOpenModalClick}
                variant="outlined"
                size="large"
                sx={{ marginRight: margins.all20, marginLeft: margins.auto }}
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
                  borderRadius: borderRadius.radius8,
                  height: heights.height45
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

export default EditTemplate;
