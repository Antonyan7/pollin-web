import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScheduleBoxWrapper, StyledButton } from '@components/Appointments/CommonMaterialComponents';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Autocomplete, FormControl, Grid, TextField, TextFieldProps, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Translation } from 'constants/translations';
import { useFormik } from 'formik';
import { createOptionsGroup } from 'helpers/berryFunctions';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { schedulingMiddleware } from 'redux/slices/scheduling';
import { BlockSchedulingProps } from 'types/reduxTypes/scheduling';
import { blockScheduleValidationSchema } from 'validation/scheduling/block_schedule_apply';
import { validateInputChange } from 'validation/validationHelpers';

import { linkDateAndTime } from '@utils/dateUtils';

const initialValues = {
  resourceId: '',
  startDate: null,
  startTime: null,
  endDate: null,
  endTime: null,
  placeholderLabel: ''
};

// TODO update component to contain 150 lines
// eslint-disable-next-line max-lines-per-function
const BlockTemplates = () => {
  const [t] = useTranslation();
  const scheduleResources = useAppSelector(bookingSelector.serviceProvidersList);

  useEffect(() => {
    dispatch(bookingMiddleware.getServiceProviders());
  }, []);

  const optionsGroup = createOptionsGroup(scheduleResources);

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

      dispatch(schedulingMiddleware.applyScheduleBlock(sendingBlockValues as BlockSchedulingProps));
      resetForm();
    }
  });
  const desktopDateTimeChange = (date: Date | null, fieldName: string) => {
    if (date && fieldName) {
      blockScheduleForm.setFieldValue(fieldName, date);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ScheduleBoxWrapper>
        <form onSubmit={blockScheduleForm.handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Grid container alignItems="center">
                <Grid item xs={12} lg={4}>
                  <Typography>{t(Translation.PAGE_BLOCK_SCHEDULE_SELECT_RESOURCE)}</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <FormControl fullWidth>
                    <Autocomplete
                      id="resourceId"
                      options={optionsGroup}
                      onChange={(_, value) => {
                        blockScheduleForm.setFieldValue('resourceId', value?.item.id);
                      }}
                      isOptionEqualToValue={(option, value) => option.item.id === value.item.id}
                      getOptionLabel={(option) => option.item.title}
                      groupBy={(option) => option.firstLetter}
                      onBlur={blockScheduleForm.handleBlur('resourceId')}
                      onInputChange={(event, value, reason) =>
                        blockScheduleForm.setFieldValue('resourceId', validateInputChange(event, value, reason))
                      }
                      renderInput={(params: TextFieldProps) => (
                        <TextField
                          {...params}
                          label={t(Translation.PAGE_BLOCK_SCHEDULE_SELECT_RESOURCE)}
                          name="resourceId"
                          required
                          helperText={blockScheduleForm.touched.resourceId ? blockScheduleForm.errors.resourceId : ''}
                          error={Boolean(blockScheduleForm.errors.resourceId) && blockScheduleForm.touched.resourceId}
                        />
                      )}
                      popupIcon={<KeyboardArrowDownIcon />}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container alignItems="center">
                <Grid item xs={12} lg={4}>
                  <Typography>{t(Translation.PAGE_BLOCK_SCHEDULE_DATE_PICKER_START)}</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <FormControl fullWidth>
                    <DesktopDatePicker
                      label={t(Translation.PAGE_BLOCK_SCHEDULE_DATE_PICKER_START)}
                      inputFormat="MM/dd/yyyy"
                      value={blockScheduleForm.values.startDate}
                      onChange={(value): void => {
                        blockScheduleForm.setFieldValue('startDate', value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          name="startDate"
                          id="startDate"
                          onBlur={blockScheduleForm.handleBlur('startDate')}
                          helperText={blockScheduleForm.touched.startDate ? blockScheduleForm.errors.startDate : ''}
                          error={Boolean(blockScheduleForm.errors.startDate) && blockScheduleForm.touched.startDate}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container alignItems="center">
                <Grid item xs={12} lg={4}>
                  <Typography>{t(Translation.PAGE_BLOCK_SCHEDULE_TIME_PICKER_START)}</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <FormControl fullWidth>
                    <TimePicker
                      label={t(Translation.PAGE_BLOCK_SCHEDULE_TIME_PICKER_START)}
                      value={blockScheduleForm.values.startTime}
                      onChange={(date: Date | null) => desktopDateTimeChange(date, 'startTime')}
                      minutesStep={10}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="startTime"
                          id="startTime"
                          onBlur={blockScheduleForm.handleBlur('startTime')}
                          helperText={blockScheduleForm.touched.startTime ? blockScheduleForm.errors.startTime : ''}
                          error={Boolean(blockScheduleForm.errors.startTime) && blockScheduleForm.touched.startTime}
                          fullWidth
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container alignItems="center">
                <Grid item xs={12} lg={4}>
                  <Typography>{t(Translation.PAGE_BLOCK_SCHEDULE_DATE_PICKER_END)}</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <FormControl fullWidth>
                    <DesktopDatePicker
                      label={t(Translation.PAGE_BLOCK_SCHEDULE_DATE_PICKER_END)}
                      inputFormat="MM/dd/yyyy"
                      value={blockScheduleForm.values.endDate}
                      onChange={(date: Date | null) => desktopDateTimeChange(date, 'endDate')}
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          onBlur={blockScheduleForm.handleBlur('endDate')}
                          helperText={blockScheduleForm.touched.endDate ? blockScheduleForm.errors.endDate : ''}
                          error={Boolean(blockScheduleForm.errors.endDate) && blockScheduleForm.touched.endDate}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container alignItems="center">
                <Grid item xs={12} lg={4}>
                  <Typography>{t(Translation.PAGE_BLOCK_SCHEDULE_TIME_PICKER_END)}</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <FormControl fullWidth>
                    <TimePicker
                      label={t(Translation.PAGE_BLOCK_SCHEDULE_TIME_PICKER_END)}
                      value={blockScheduleForm.values.endTime}
                      onChange={(date: Date | null) => desktopDateTimeChange(date, 'endTime')}
                      minutesStep={10}
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          name="endTime"
                          id="endTime"
                          onBlur={blockScheduleForm.handleBlur('endTime')}
                          helperText={blockScheduleForm.touched.endTime ? blockScheduleForm.errors.endTime : ''}
                          error={Boolean(blockScheduleForm.errors.endTime) && blockScheduleForm.touched.endTime}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container alignItems="center">
                <Grid item xs={12} lg={4}>
                  <Typography>{t(Translation.PAGE_BLOCK_SCHEDULE_PLACEHOLDER)}</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      id="placeholderLabel"
                      name="placeholderLabel"
                      fullWidth
                      onBlur={blockScheduleForm.handleBlur('placeholderLabel')}
                      helperText={
                        blockScheduleForm.touched.placeholderLabel ? blockScheduleForm.errors.placeholderLabel : ''
                      }
                      error={
                        Boolean(blockScheduleForm.errors.placeholderLabel) && blockScheduleForm.touched.placeholderLabel
                      }
                      label={t(Translation.PAGE_BLOCK_SCHEDULE_PLACEHOLDER)}
                      value={blockScheduleForm.values.placeholderLabel}
                      onChange={blockScheduleForm.handleChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
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
                  {t(Translation.PAGE_BLOCK_SCHEDULE_BUTTON_APPLY)}
                </StyledButton>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </ScheduleBoxWrapper>
    </LocalizationProvider>
  );
};

export default BlockTemplates;
