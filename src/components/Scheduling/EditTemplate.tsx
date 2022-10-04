import React, { useEffect } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScheduleBoxWrapper, StyledButton } from '@components/Appointments/CommonMaterialComponents';
import { TimePeriods } from '@components/Scheduling/scheduleTemplates/TimePeriods';
import { Divider, Grid, TextField, Typography } from '@mui/material';
import { ModalName } from 'constants/modals';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { schedulingMiddleware, schedulingSelector } from 'redux/slices/scheduling';
import { viewsMiddleware } from 'redux/slices/views';
import { ISingleTemplate, ITemplateGroup, PeriodType } from 'types/create-schedule';
import { v4 } from 'uuid';

import { PlusIconButton } from '@ui-component/common/buttons';
import { toESTIsoString } from '@utils/dateUtils';

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
    dispatch(viewsMiddleware.setModalState({ name: ModalName.CreateTemplateModal, props: {} }));
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
          reqBody.startTime = toESTIsoString(new Date(rest.startTime));
          reqBody.endTime = toESTIsoString(new Date(rest.endTime));
        }

        return reqBody;
      })
    };

    dispatch(schedulingMiddleware.updateSingleSchedule(scheduleTemplateID, body));
  };

  const methods = useForm<ITemplateGroup>({
    defaultValues: getEmptyTemplateState()
  });

  const { reset, handleSubmit, register } = methods;

  const { append } = useFieldArray({
    control: methods.control,
    name: 'timePeriods'
  });

  const onPlusClick = () => {
    append({ ...getDefaultTimePeriodState(), id: v4() });
  };

  useEffect(() => {
    reset(scheduleTemplate);
  }, [reset, scheduleTemplate]);

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
                color="secondary"
                onClick={onOpenModalClick}
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

export default EditTemplate;
