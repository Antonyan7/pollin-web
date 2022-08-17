import React, { SyntheticEvent, useEffect, useState } from 'react';
import { InternalButton } from '@components/Appointments/CommonMaterialComponents';
import { roundUpTo } from '@constants';
import DateRangeIcon from '@mui/icons-material/DateRange';
import {
  Autocomplete,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  TextFieldProps,
  useTheme
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { useFormik } from 'formik';
import { dispatch, useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import { createNewAppointment, getAppointmentTypes, getPatientNames } from 'redux/utils/appointments';
import { AppointmentsProps, CreateAppointmentProps } from 'types/reduxTypes/appointments';
import { addAppointmentsValidationSchema, validateInputChange } from 'validation/appointments/add_appointment';

import { redirectTo } from '@utils/redirectTo';

import { AppointmentsModalProps } from '../../types/appointments';

const AddAppointmentsModal = ({
  openAppointmentsModal,
  onCloseAppointmentsModal,
  setOpenAppointmentsModal,
  bookAppointmentDate
}: AppointmentsModalProps) => {
  const theme = useTheme();
  const { patientData, appointmentTypeData } = useAppSelector((state: RootState) => state.appointments);
  const [patientSelectedData, setPatientSelectedData] = useState<AppointmentsProps['patientData']>([]);
  const [appointmentData, setAppointmentData] = useState<AppointmentsProps['appointmentTypeData']>([]);

  const addAppointmentForm = useFormik({
    initialValues: {
      appointmentTypeId: '',
      patientId: '',
      description: '',
      date: new Date()
    },
    validationSchema: addAppointmentsValidationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(createNewAppointment(values as CreateAppointmentProps));
      resetForm();
      setOpenAppointmentsModal(false);
    }
  });

  const appointmentOptionsGroup = appointmentData
    .map((option) => {
      const firstLetter = option.appointmentTypeId[0].toUpperCase();

      return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option
      };
    })
    .sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter));

  const closeAppointmentModal = () => {
    setOpenAppointmentsModal(false);
    addAppointmentForm.resetForm();
    redirectTo('/');
  };

  const customOnCloseAppointmentsModal = (event: SyntheticEvent<Element, Event>) => {
    onCloseAppointmentsModal(event);
    addAppointmentForm.resetForm();
  };

  const mobileDateTimeChange = (date: Date | null) => {
    let roundedTime;

    if (date) {
      roundedTime = new Date(Math.ceil(date.getTime() / roundUpTo) * roundUpTo);
    }

    addAppointmentForm.setFieldValue('date', roundedTime);
  };

  useEffect(() => {
    dispatch(getPatientNames());
    dispatch(getAppointmentTypes());
  }, []);

  useEffect(() => {
    setPatientSelectedData(patientData);
    setAppointmentData(appointmentTypeData);
  }, [patientData, appointmentTypeData]);

  return (
    <Dialog open={openAppointmentsModal} onClose={customOnCloseAppointmentsModal}>
      {openAppointmentsModal && (
        <Box sx={{ width: '500px' }}>
          <DialogTitle>Add Appointment</DialogTitle>
          <Divider />
          <form onSubmit={addAppointmentForm.handleSubmit}>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <Autocomplete
                id="appointmentTypeId"
                onChange={(_, value) => {
                  addAppointmentForm.setFieldValue('appointmentTypeId', value?.appointmentTypeId);
                }}
                onBlur={addAppointmentForm.handleBlur('appointmentTypeId')}
                isOptionEqualToValue={(option, value) => option.appointmentTypeId === value.appointmentTypeId}
                options={appointmentOptionsGroup}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.appointmentTypeId}
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
                      addAppointmentForm.touched.appointmentTypeId ? addAppointmentForm.errors.appointmentTypeId : ''
                    }
                    error={
                      Boolean(addAppointmentForm.errors.appointmentTypeId) &&
                      addAppointmentForm.touched.appointmentTypeId
                    }
                  />
                )}
              />
              <Autocomplete
                id="patientId"
                options={patientSelectedData}
                isOptionEqualToValue={(option, value) => option.patientId === value.patientId}
                getOptionLabel={(option) => option.patientId}
                onChange={(_, value) => {
                  addAppointmentForm.setFieldValue('patientId', value?.patientId);
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
              <Box>
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
              </Box>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <MobileDateTimePicker
                    label="Date & Start Time"
                    value={bookAppointmentDate ?? addAppointmentForm.values.date}
                    onChange={(date: Date | null) => mobileDateTimeChange(date)}
                    renderInput={(params: TextFieldProps) => (
                      <TextField
                        {...params}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <DateRangeIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                </Stack>
              </LocalizationProvider>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <InternalButton theme={theme} type="button" onClick={closeAppointmentModal}>
                  Cancel
                </InternalButton>
                <InternalButton
                  theme={theme}
                  type="submit"
                  sx={{ backgroundColor: theme.palette.dark[100], color: theme.palette.common.white }}
                >
                  Add
                </InternalButton>
              </Box>
            </DialogContent>
          </form>
        </Box>
      )}
    </Dialog>
  );
};

export default AddAppointmentsModal;
