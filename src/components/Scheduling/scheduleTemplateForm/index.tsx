import React, { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ScheduleBoxWrapper } from '@components/Appointments/CommonMaterialComponents';
import { yupResolver } from '@hookform/resolvers/yup';
import { dispatch, useAppSelector } from '@redux/hooks';
import { useRouter } from 'next/router';
import { schedulingMiddleware, schedulingSelector } from 'redux/slices/scheduling';
import { scheduleTemplateFormValidationSchema } from 'validation/scheduling/template_form';

import CircularLoading from '@ui-component/circular-loading';

import { ScheduleFormContext } from './context';
import Form from './form';
import { getEmptyTemplateState } from './helpers';

const ScheduleTemplateForm = () => {
  const scheduleTemplate = useAppSelector(schedulingSelector.scheduleSingleTemplate);
  const scheduleTemplateLoading = useAppSelector(schedulingSelector.scheduleCalendarLoading);

  const router = useRouter();
  const scheduleId = (router.query?.scheduleId as string) ?? '';

  const methods = useForm({
    defaultValues: getEmptyTemplateState(),
    mode: 'onSubmit',
    resolver: yupResolver(scheduleTemplateFormValidationSchema),
    criteriaMode: 'all'
  });

  const { reset } = methods;

  useEffect(() => {
    dispatch(schedulingMiddleware.cleanError());
    dispatch(schedulingMiddleware.getServiceTypes());

    return () => {
      dispatch(schedulingMiddleware.cleanError());
      dispatch(schedulingMiddleware.clearSingleSchedule());
    };
  }, []);

  useEffect(() => {
    if (scheduleId) {
      dispatch(schedulingMiddleware.getSingleSchedule(scheduleId));
    }
  }, [scheduleId]);

  useEffect(() => {
    if (scheduleTemplate.timePeriods.length > 0) {
      reset(scheduleTemplate, { keepDirtyValues: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleTemplate]);

  const formContextValues = useMemo(
    () => ({
      scheduleId
    }),
    [scheduleId]
  );

  return (
    <ScheduleBoxWrapper>
      {scheduleTemplateLoading ? (
        <CircularLoading />
      ) : (
        <FormProvider {...methods}>
          <ScheduleFormContext.Provider value={formContextValues}>
            <Form />
          </ScheduleFormContext.Provider>
        </FormProvider>
      )}
    </ScheduleBoxWrapper>
  );
};

export default ScheduleTemplateForm;
