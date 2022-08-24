import React, { useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Autocomplete, Button, Grid, TextField, TextFieldProps, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useFormik } from 'formik';
import { createOptionsGroup } from 'helpers/berryFunctions';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { schedulingMiddleware } from 'redux/slices/scheduling';
import { BlockSchedulingProps } from 'types/reduxTypes/scheduling';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
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
const BlockTemplates = () => {
  const theme = useTheme();
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
    <>
      {/* TODO add header compoenent */}
      <MainCard content={false}>
        <SubCard>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <form onSubmit={blockScheduleForm.handleSubmit}>
              <Grid container spacing={4} columns={8} alignItems="center">
                <Grid item xs={0.5} />
                <Grid item xs={2}>
                  <Typography>Resource</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Autocomplete
                    id="resourceId"
                    options={optionsGroup}
                    onChange={(_, value) => {
                      blockScheduleForm.setFieldValue('resourceId', value?.id);
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    getOptionLabel={(option) => option.title}
                    groupBy={(option) => option.firstLetter}
                    onBlur={blockScheduleForm.handleBlur('resourceId')}
                    onInputChange={(event, value, reason) =>
                      blockScheduleForm.setFieldValue('resourceId', validateInputChange(event, value, reason))
                    }
                    renderInput={(params: TextFieldProps) => (
                      <TextField
                        {...params}
                        label="Resource"
                        name="resourceId"
                        required
                        helperText={blockScheduleForm.touched.resourceId ? blockScheduleForm.errors.resourceId : ''}
                        error={Boolean(blockScheduleForm.errors.resourceId) && blockScheduleForm.touched.resourceId}
                      />
                    )}
                    popupIcon={<KeyboardArrowDownIcon />}
                  />
                </Grid>
                <Grid item xs={0.5} />
                <Grid item xs={0.5} />
                <Grid item xs={2}>
                  <Typography>Start Date</Typography>
                </Grid>
                <Grid item xs={5}>
                  <DesktopDatePicker
                    label="Start Date"
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
                </Grid>
                <Grid item xs={0.5} />
                <Grid item xs={0.5} />
                <Grid item xs={2}>
                  <Typography>Start Time</Typography>
                </Grid>
                <Grid item xs={5}>
                  <TimePicker
                    label="Start Time"
                    value={blockScheduleForm.values.startTime}
                    onChange={(date: Date | null) => desktopDateTimeChange(date, 'startTime')}
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
                </Grid>
                <Grid item xs={0.5} />
                <Grid item xs={0.5} />
                <Grid item xs={2}>
                  <Typography>End Date</Typography>
                </Grid>
                <Grid item xs={5}>
                  <DesktopDatePicker
                    label="End Date"
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
                </Grid>
                <Grid item xs={0.5} />
                <Grid item xs={0.5} />
                <Grid item xs={2}>
                  {' '}
                  <Typography>End Time</Typography>{' '}
                </Grid>
                <Grid item xs={5}>
                  <TimePicker
                    label="End Time"
                    value={blockScheduleForm.values.endTime}
                    onChange={(date: Date | null) => desktopDateTimeChange(date, 'endTime')}
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
                </Grid>
                <Grid item xs={0.5} />
                <Grid item xs={0.5} />
                <Grid item xs={2}>
                  {' '}
                  <Typography>Placeholder Label</Typography>{' '}
                </Grid>
                <Grid item xs={5}>
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
                    label="Placeholder Label"
                    value={blockScheduleForm.values.placeholderLabel}
                    onChange={blockScheduleForm.handleChange}
                  />
                </Grid>
              </Grid>
              <br />
              <Grid container justifyContent="flex-end">
                <Grid item xs={2}>
                  <Button
                    type="submit"
                    variant="outlined"
                    sx={{ color: theme.palette.dark.dark, background: theme.palette.grey[500], padding: '5px' }}
                  >
                    Apply
                  </Button>
                </Grid>
              </Grid>
            </form>
          </LocalizationProvider>
        </SubCard>
      </MainCard>
    </>
  );
};

export default BlockTemplates;
