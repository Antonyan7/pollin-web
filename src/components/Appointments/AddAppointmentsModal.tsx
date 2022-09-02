import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { StyledButton } from '@components/Appointments/CommonMaterialComponents';
import { roundUpTo } from '@constants';
import {
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  TextField,
  TextFieldProps,
  useTheme
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { FormikProvider, useFormik } from 'formik';
import { createOptionsGroup } from 'helpers/berryFunctions';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { AppointmentsModalProps } from 'types/appointments';
import { AppointmentsProps, CreateAppointmentProps } from 'types/reduxTypes/appointments';
import { addAppointmentsValidationSchema, validateInputChange } from 'validation/appointments/add_appointment';

import { PickerDateIcon } from '@ui-component/common/TimeDateIcons';

// TODO update component to contain 150 lines
// eslint-disable-next-line max-lines-per-function
const AddAppointmentsModal = ({
  openAppointmentsModal,
  onCloseAppointmentsModal,
  setOpenAppointmentsModal,
  bookAppointmentDate
}: AppointmentsModalProps) => {
  const theme = useTheme();
  const patientList = useAppSelector(bookingSelector.patientList);
  const serviceTypes = useAppSelector(bookingSelector.serviceTypes);

  const [patientSelectedData, setPatientSelectedData] = useState<AppointmentsProps['patientData']>([]);
  const [appointmentData, setAppointmentData] = useState<AppointmentsProps['appointmentTypeData']>([]);

  const addAppointmentForm = useFormik({
    initialValues: {
      appointmentTypeId: '',
      patientId: '',
      description: '',
      date: bookAppointmentDate?.start ? new Date(bookAppointmentDate.start) : new Date()
    },
    validationSchema: addAppointmentsValidationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(bookingMiddleware.createAppointment(values as CreateAppointmentProps));
      resetForm();
      setOpenAppointmentsModal(false);
    }
  });

  const closeAppointmentModal = () => {
    setOpenAppointmentsModal(false);
    addAppointmentForm.resetForm();
  };

  const customOnCloseAppointmentsModal = (event: SyntheticEvent<Element, Event>) => {
    onCloseAppointmentsModal(event);
    addAppointmentForm.resetForm();
  };

  const mobileDateTimeChange = useCallback(
    (date: Date | null) => {
      let roundedTime;

      if (date) {
        roundedTime = new Date(Math.ceil(date.getTime() / roundUpTo) * roundUpTo);
      }

      addAppointmentForm.setFieldValue('date', roundedTime);
    },
    [addAppointmentForm]
  );

  useEffect(() => {
    dispatch(bookingMiddleware.getPatientNames());
    dispatch(bookingMiddleware.getServiceTypes());
  }, []);

  useEffect(() => {
    setPatientSelectedData(patientList);
  }, [patientList]);

  useEffect(() => {
    setAppointmentData(serviceTypes);
  }, [serviceTypes]);

  return (
    <FormikProvider value={addAppointmentForm}>
      <Dialog
        open={openAppointmentsModal}
        onClose={customOnCloseAppointmentsModal}
        maxWidth="sm"
        fullWidth
        sx={{ '& .MuiDialog-paper': { p: 0 } }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {openAppointmentsModal && (
            <form onSubmit={addAppointmentForm.handleSubmit}>
              <DialogTitle sx={{ fontWeight: 700 }} id="mui-6">
                Add Appointment
              </DialogTitle>
              <Divider />
              <DialogContent sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Autocomplete
                      id="appointmentTypeId"
                      onChange={(_, value) => {
                        addAppointmentForm.setFieldValue('appointmentTypeId', value?.id);
                      }}
                      onBlur={addAppointmentForm.handleBlur('appointmentTypeId')}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      options={createOptionsGroup(appointmentData)}
                      groupBy={(option) => option.firstLetter}
                      getOptionLabel={(option) => option.title}
                      onInputChange={(event, value, reason) =>
                        addAppointmentForm.setFieldValue('appointmentTypeId', validateInputChange(event, value, reason))
                      }
                      renderInput={(params: TextFieldProps) => (
                        <TextField
                          {...params}
                          label="Appointment type"
                          name="appointmentTypeId"
                          required
                          helperText={
                            addAppointmentForm.touched.appointmentTypeId
                              ? addAppointmentForm.errors.appointmentTypeId
                              : ''
                          }
                          error={
                            Boolean(addAppointmentForm.errors.appointmentTypeId) &&
                            addAppointmentForm.touched.appointmentTypeId
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      id="patientId"
                      options={patientSelectedData}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      getOptionLabel={(option) => option.title}
                      onChange={(_, value) => {
                        addAppointmentForm.setFieldValue('patientId', value?.id);
                      }}
                      onBlur={addAppointmentForm.handleBlur('patientId')}
                      onInputChange={(event, value, reason) => {
                        addAppointmentForm.setFieldValue('patientId', validateInputChange(event, value, reason));
                      }}
                      renderInput={(params: TextFieldProps) => (
                        <TextField
                          {...params}
                          label="Patient"
                          name="patientId"
                          required
                          helperText={addAppointmentForm.touched.patientId ? addAppointmentForm.errors.patientId : ''}
                          error={Boolean(addAppointmentForm.errors.patientId) && addAppointmentForm.touched.patientId}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="description"
                      label="Description (optional)"
                      multiline
                      name="description"
                      rows={4}
                      placeholder="Description (optional)"
                      value={addAppointmentForm.values.description}
                      onChange={addAppointmentForm.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MobileDateTimePicker
                      label="Date & Start Time"
                      value={addAppointmentForm.values.date}
                      onChange={(date: Date | null) => mobileDateTimeChange(date)}
                      renderInput={(params: TextFieldProps) => (
                        <TextField
                          {...params}
                          fullWidth
                          InputProps={{
                            endAdornment: <PickerDateIcon />
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ p: 3 }}>
                <Grid container justifyContent="flex-end" alignItems="center">
                  <Grid item xs={12}>
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
                      <StyledButton theme={theme} variant="contained" type="button" onClick={closeAppointmentModal}>
                        Cancel
                      </StyledButton>
                      <StyledButton theme={theme} type="submit" variant="contained">
                        Add
                      </StyledButton>
                    </Stack>
                  </Grid>
                </Grid>
              </DialogActions>
            </form>
          )}
        </LocalizationProvider>
      </Dialog>
    </FormikProvider>
  );
};

export default AddAppointmentsModal;
