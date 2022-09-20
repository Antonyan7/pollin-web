import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SeveritiesType } from '@components/Alert/Alert';
import { ScheduleBoxWrapper, StyledButton } from '@components/Appointments/CommonMaterialComponents';
import { Grid } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Translation } from 'constants/translations';
import { FormikProvider, useFormik } from 'formik';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware } from 'redux/slices/booking';
import { schedulingMiddleware, schedulingSelector } from 'redux/slices/scheduling';
import { resetBlockSuccessStatusState } from 'redux/slices/scheduling/middleware';
import { viewsMiddleware } from 'redux/slices/views';
import { BlockSchedulingProps } from 'types/reduxTypes/scheduling';
import { blockScheduleValidationSchema } from 'validation/scheduling/block_schedule_apply';

import { linkDateAndTime } from '@utils/dateUtils';

import AutoCompleteTextField from './fields/AutoCompleteTextField';
import DateField from './fields/DateField';
import TextInputField from './fields/TextInputField';
import TimeField from './fields/TimeField';
import BlockScheduleFormRow from './form/BlockScheduleFormRow';
import { IFieldRowProps } from './form/IFieldRowProps';
import { initialValues } from './form/initialValues';

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
  const scheduleBlockSuccess = useAppSelector(schedulingSelector.scheduleBlockSuccess);

  useEffect(() => {
    dispatch(bookingMiddleware.getServiceProviders(1));
  }, []);

  useEffect(() => {
    if (scheduleBlockSuccess) {
      dispatch(
        viewsMiddleware.setAlertPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.success,
            description: t(Translation.PAGE_SCHEDULING_BLOCK_ALERT_MESSAGE_SUCCESS)
          }
        })
      );
    }

    dispatch(resetBlockSuccessStatusState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleBlockSuccess]);

  const blockScheduleForm = useFormik({
    initialValues,
    validationSchema: blockScheduleValidationSchema,
    onSubmit: (values, { resetForm }) => {
      const sendingBlockValues = {
        resourceId: 'roviderId2',
        startDate: linkDateAndTime(values.startDate, values.startTime),
        endDate: linkDateAndTime(values.endDate, values.endTime),
        placeholderLabel: values.placeholderLabel
      };

      if (values.startDate && values.endDate && values.placeholderLabel && sendingBlockValues.resourceId) {
        dispatch(schedulingMiddleware.applyScheduleBlock(sendingBlockValues as BlockSchedulingProps));
        resetForm();
      }
    }
  });

  return (
    <FormikProvider value={blockScheduleForm}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ScheduleBoxWrapper>
          <form onSubmit={blockScheduleForm.handleSubmit}>
            <Grid container spacing={4}>
              {fieldRows.map(({ Component, fieldLabel, fieldName }) => (
                <BlockScheduleFormRow title={t(fieldLabel)}>
                  <Component fieldLabel={t(fieldLabel)} fieldName={fieldName} />
                </BlockScheduleFormRow>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Grid container alignItems="center">
                <Grid item xs />
                <Grid item xs />
                <Grid item xs={4} lg={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <StyledButton
                    type="submit"
                    variant="contained"
                    size="large"
                    style={{
                      margin: '30px 0'
                    }}
                  >
                    {t(Translation.PAGE_SCHEDULING_BLOCK_BUTTON_APPLY)}
                  </StyledButton>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </ScheduleBoxWrapper>
      </LocalizationProvider>
    </FormikProvider>
  );
};

export default BlockTemplates;
