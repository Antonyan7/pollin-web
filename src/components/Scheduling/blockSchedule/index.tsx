import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScheduleBoxWrapper } from '@components/Appointments/CommonMaterialComponents';
import { SeveritiesType } from '@components/ToastNotification/ToastNotification';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Translation } from 'constants/translations';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware } from 'redux/slices/booking';
import { schedulingMiddleware, schedulingSelector } from 'redux/slices/scheduling';
import { viewsMiddleware } from 'redux/slices/views';
import { borderRadius, margins } from 'themes/themeConstants';
import { BlockSchedulingProps } from 'types/reduxTypes/scheduling';
import { blockScheduleValidationSchema } from 'validation/scheduling/block_schedule_apply';

import { ButtonWithLoading } from '@ui-component/common/buttons';
import { linkDateAndTime } from '@utils/dateUtils';

import AutoCompleteTextField from './fields/AutoCompleteTextField';
import DateField from './fields/DateField';
import TextInputField from './fields/TextInputField';
import TimeField from './fields/TimeField';
import BlockScheduleFormRow from './form/BlockScheduleFormRow';
import { IFieldRowProps } from './form/IFieldRowProps';
import { IBlockScheduleForm, initialValues } from './form/initialValues';

const fieldRows: (IFieldRowProps & { Component: React.ComponentType<IFieldRowProps> })[] = [
  {
    fieldLabel: Translation.PAGE_SCHEDULING_BLOCK_RESOURCE,
    fieldName: 'resourceId',
    Component: AutoCompleteTextField
  },
  {
    fieldLabel: Translation.PAGE_SCHEDULING_BLOCK_DATE_START,
    fieldName: 'startDate',
    Component: DateField
  },
  {
    fieldLabel: Translation.PAGE_SCHEDULING_BLOCK_TIME_START,
    fieldName: 'startTime',
    Component: TimeField
  },
  {
    fieldLabel: Translation.PAGE_SCHEDULING_BLOCK_DATE_END,
    fieldName: 'endDate',
    Component: DateField
  },
  {
    fieldLabel: Translation.PAGE_SCHEDULING_BLOCK_TIME_END,
    fieldName: 'endTime',
    Component: TimeField
  },
  {
    fieldLabel: Translation.PAGE_SCHEDULING_BLOCK_PLACEHOLDER,
    fieldName: 'placeholderLabel',
    Component: TextInputField
  }
];

const BlockTemplates = () => {
  const [t] = useTranslation();
  const scheduleBlockStatus = useAppSelector(schedulingSelector.scheduleBlockStatus);
  const isScheduleLoading = useAppSelector(schedulingSelector.scheduleLoading);

  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: initialValues,
    resolver: yupResolver(blockScheduleValidationSchema)
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = (values: IBlockScheduleForm) => {
    const sendingBlockValues = {
      resourceId: values.resourceId,
      startDate: linkDateAndTime(values.startDate, values.startTime),
      endDate: linkDateAndTime(values.endDate, values.endTime),
      placeholderLabel: values.placeholderLabel
    };

    dispatch(schedulingMiddleware.applyScheduleBlock(sendingBlockValues as BlockSchedulingProps));
  };

  useEffect(() => {
    dispatch(bookingMiddleware.getServiceProviders(1));
  }, []);

  useEffect(() => {
    if (scheduleBlockStatus.success) {
      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.success,
            description: t(Translation.PAGE_SCHEDULING_BLOCK_ALERT_MESSAGE_SUCCESS)
          }
        })
      );
      reset();

      dispatch(schedulingMiddleware.resetBlockStatusState());
    } else if (scheduleBlockStatus.fail) {
      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.error,
            description: t(Translation.PAGE_SCHEDULING_BLOCK_ALERT_MESSAGE_FAIL)
          }
        })
      );
      dispatch(schedulingMiddleware.resetBlockStatusState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleBlockStatus.success, scheduleBlockStatus.fail]);

  return (
    <FormProvider {...methods}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ScheduleBoxWrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {fieldRows.map(({ Component, fieldLabel, fieldName }) => (
                <BlockScheduleFormRow title={t(fieldLabel)} key={fieldName}>
                  <Component fieldLabel={t(fieldLabel)} fieldName={fieldName} />
                </BlockScheduleFormRow>
              ))}
              <Grid item xs={12} display="flex">
                <ButtonWithLoading
                  isLoading={isScheduleLoading}
                  color="primary"
                  type="submit"
                  variant="contained"
                  sx={{
                    marginLeft: margins.auto,
                    borderRadius: borderRadius.radius8
                  }}
                >
                  {t(Translation.PAGE_SCHEDULING_BLOCK_BUTTON_APPLY)}
                </ButtonWithLoading>
              </Grid>
            </Grid>
          </form>
        </ScheduleBoxWrapper>
      </LocalizationProvider>
    </FormProvider>
  );
};

export default BlockTemplates;
