import React, { FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScheduleBoxWrapper } from '@components/Appointments/CommonMaterialComponents';
import { FormControl, Grid } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { bookingMiddleware } from '@redux/slices/booking';
import { schedulingMiddleware, schedulingSelector } from '@redux/slices/scheduling';
import { Translation } from 'constants/translations';
import { weekDays } from 'helpers/constants';
import { viewsMiddleware } from 'redux/slices/views';
import { IAppliedDay, IApplyScheduleDay } from 'types/apply-schedule';
import { IApplyScheduleData, ISingleTemplate } from 'types/create-schedule';
import { IServiceProvider } from 'types/reduxTypes/bookingStateTypes';
import { SchedulingTemplateProps } from 'types/reduxTypes/schedulingStateTypes';

import { SeveritiesType } from '../types';

import ActionsField from './fields/ActionsField';
import ApplyDaysField from './fields/ApplyDaysField';
import DatePickerField from './fields/DatePickerField';
import RepeatsField from './fields/RepeatsField';
import ResourceField from './fields/ResourceField';
import ScheduleTemplateField from './fields/ScheduleTemplateField';
import ApplyScheduleFormRow from './form/ApplyScheduleFormRow';
import { defaultRepeatWeeks, defaultResource, defaultScheduleTemplate } from './defaultValues';

const getUniqueTimePeriodsApplyDates = (scheduleApplyTemplates: { name: string; timePeriods?: ISingleTemplate[] }) => {
  // Logic For Comparing two or more timePeriods
  const timePeriodsApplyDates: number[] = (scheduleApplyTemplates?.timePeriods ?? [])
    .map((item: ISingleTemplate) => item.days)
    .flat();

  return Array.from(new Set(timePeriodsApplyDates));
};

const getApplyDaysToDisplay = (uniqueTimePeriodsApplyDates: number[]): IAppliedDay[] =>
  // Logic For showing apply days checkboxes
  weekDays
    .filter((_, index) => uniqueTimePeriodsApplyDates.includes(index))
    .map((item, index) => ({ dayNum: index, dayLabel: item }));

const ApplyScheduleForm = () => {
  const [t] = useTranslation();
  const scheduleApplyTemplates = useAppSelector(schedulingSelector.scheduleSingleTemplate);
  const scheduleApplyStatus = useAppSelector(schedulingSelector.scheduleApplyStatus);
  const [resource, setResource] = useState<IServiceProvider>({ ...defaultResource });
  const [scheduleTemplate, setScheduleTemplate] = useState<SchedulingTemplateProps>({ ...defaultScheduleTemplate });
  const [isAppliedDays, setIsAppliedDays] = useState<boolean>(false);
  const [repeatWeeks, setRepeatWeeks] = useState<IApplyScheduleDay>({ ...defaultRepeatWeeks });
  const [startDate, setStartDate] = useState<Date | string | null>(null);
  const [endDate, setEndDate] = useState<Date | string | null>(null);
  const [applyDays, setApplyDays] = useState<number[]>([]);
  const [applyDaysListRendering, setApplyDaysListRendering] = useState<IAppliedDay[]>([]);
  const resetFormValues = () => {
    setScheduleTemplate({ ...defaultScheduleTemplate });
    setResource({ ...defaultResource });
    setRepeatWeeks({ ...defaultRepeatWeeks });
    setIsAppliedDays(false);
    setStartDate(null);
    setEndDate(null);
  };
  const handleApplyClick = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const applyScheduleTemplateData: IApplyScheduleData = {
      resourceId: resource.id,
      templateId: scheduleTemplate.id,
      repeatWeeksCount: repeatWeeks.id,
      applyDays,
      startDate,
      endDate
    };

    if (resource.id && scheduleTemplate.id && repeatWeeks && applyDays.length && startDate && endDate) {
      dispatch(schedulingMiddleware.applyScheduleTemplate(applyScheduleTemplateData));
    } else {
      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.error,
            description: t(Translation.PAGE_SCHEDULING_APPLY_ALERT_ERROR)
          }
        })
      );
      dispatch(schedulingMiddleware.resetApplyStatusState());
    }
  };

  useEffect(() => {
    dispatch(schedulingMiddleware.getSchedulingTemplates(1));
    dispatch(bookingMiddleware.getServiceProviders(1));
  }, []);

  useEffect(() => {
    const uniqueTimePeriodsApplyDates = getUniqueTimePeriodsApplyDates(scheduleApplyTemplates);

    setApplyDays(uniqueTimePeriodsApplyDates);
    setApplyDaysListRendering(getApplyDaysToDisplay(uniqueTimePeriodsApplyDates));
    setIsAppliedDays(true);
    // eslint-disable-next-line
  }, [scheduleApplyTemplates]);

  useEffect(() => {
    if (scheduleApplyStatus.success) {
      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.success,
            description: t(Translation.PAGE_SCHEDULING_APPLY_ALERT_SUCCESS)
          }
        })
      );
      resetFormValues();
    } else if (scheduleApplyStatus.fail) {
      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.error,
            description: t(Translation.PAGE_SCHEDULING_APPLY_ALERT_ERROR)
          }
        })
      );
    }

    dispatch(schedulingMiddleware.resetApplyStatusState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleApplyStatus.success, scheduleApplyStatus.fail]);

  return (
    <ScheduleBoxWrapper>
      <form onSubmit={(event: FormEvent<HTMLFormElement>) => handleApplyClick(event)}>
        <Grid container spacing={3}>
          <ApplyScheduleFormRow title={t(Translation.PAGE_SCHEDULING_APPLY_RESOURCE)}>
            <ResourceField
              setResource={setResource}
              resource={resource}
              label={t(Translation.PAGE_SCHEDULING_APPLY_RESOURCE)}
            />
          </ApplyScheduleFormRow>
          <ApplyScheduleFormRow title={t(Translation.PAGE_SCHEDULING_APPLY_TEMPLATE)}>
            <ScheduleTemplateField
              scheduleTemplate={scheduleTemplate}
              setScheduleTemplate={setScheduleTemplate}
              label={t(Translation.PAGE_SCHEDULING_APPLY_TEMPLATE)}
            />
          </ApplyScheduleFormRow>
          {scheduleTemplate.id && isAppliedDays && applyDaysListRendering.length > 0 && (
            <ApplyScheduleFormRow title={t(Translation.PAGE_SCHEDULING_APPLY_APPLIED_DAYS)}>
              <ApplyDaysField
                applyDays={applyDays}
                setApplyDays={setApplyDays}
                applyDaysListRendering={applyDaysListRendering}
              />
            </ApplyScheduleFormRow>
          )}
          <ApplyScheduleFormRow title={t(Translation.PAGE_SCHEDULING_APPLY_REPEATS)}>
            <FormControl fullWidth>
              <RepeatsField
                repeatWeeks={repeatWeeks}
                setRepeatWeeks={setRepeatWeeks}
                label={t(Translation.PAGE_SCHEDULING_APPLY_EVERY)}
              />
            </FormControl>
          </ApplyScheduleFormRow>
          <ApplyScheduleFormRow title={t(Translation.PAGE_SCHEDULING_APPLY_DATE_START)}>
            <DatePickerField
              label={t(Translation.PAGE_SCHEDULING_APPLY_DATE_START)}
              value={startDate}
              setDate={setStartDate}
            />
          </ApplyScheduleFormRow>
          <ApplyScheduleFormRow title={t(Translation.PAGE_SCHEDULING_APPLY_DATE_END)}>
            <DatePickerField
              label={t(Translation.PAGE_SCHEDULING_APPLY_DATE_END)}
              value={endDate}
              setDate={setEndDate}
            />
          </ApplyScheduleFormRow>
          <Grid item xs={12}>
            {' '}
            <ActionsField submitButtonText={t(Translation.PAGE_SCHEDULING_APPLY_BUTTON_APPLY)} />{' '}
          </Grid>
        </Grid>
      </form>
    </ScheduleBoxWrapper>
  );
};

export default ApplyScheduleForm;
