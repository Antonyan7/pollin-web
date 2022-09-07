import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ICreatedAppointmentBody } from '@axios/managerBooking';
import { StyledButton } from '@components/Appointments/CommonMaterialComponents';
import { roundUpTo } from '@constants';
import { DateSelectArg } from '@fullcalendar/common';
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
  TextFieldProps
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { ModalName } from 'constants/modals';
import { Translation } from 'constants/translations';
import { FormikProvider, useFormik } from 'formik';
import { createOptionsGroup } from 'helpers/berryFunctions';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware, viewsSelector } from 'redux/slices/views';
import { addAppointmentsValidationSchema, validateInputChange } from 'validation/appointments/add_appointment';

import { PickerDateIcon } from '@ui-component/common/TimeDateIcons';

const getInitialValues = (bookAppointmentDate?: DateSelectArg): ICreatedAppointmentBody => ({
  serviceTypeId: '',
  patientId: '',
  description: '',
  date: bookAppointmentDate?.start ? new Date(bookAppointmentDate.start) : new Date()
});

// TODO update component to contain 150 lines
// eslint-disable-next-line max-lines-per-function
const AddAppointmentsModal = () => {
  const patientList = useAppSelector(bookingSelector.patientList);
  const serviceTypes = useAppSelector(bookingSelector.serviceTypes);
  const bookAppointmentDate: DateSelectArg = useAppSelector(viewsSelector.modal).props;
  const [t] = useTranslation();
  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.setModalState({ name: ModalName.NONE, props: {} }));
  }, []);

  const serviceTypeOptions = useMemo(() => createOptionsGroup(serviceTypes), [serviceTypes]);

  const addAppointmentForm = useFormik({
    initialValues: getInitialValues(bookAppointmentDate),
    validationSchema: addAppointmentsValidationSchema,
    onSubmit: (values) => {
      dispatch(bookingMiddleware.createAppointment(values));
      onClose();
    }
  });

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
    // dispatch(bookingMiddleware.getPatientNames());
    dispatch(bookingMiddleware.getServiceTypes());
  }, []);

  return (
    <FormikProvider value={addAppointmentForm}>
      <Dialog open onClose={onClose} maxWidth="sm" fullWidth sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <form onSubmit={addAppointmentForm.handleSubmit}>
            <DialogTitle sx={{ fontWeight: 700 }} id="mui-6">
              {t(Translation.MODAL_APPOINTMENTS_ADD_TITLE)}
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Autocomplete
                    id="serviceTypeId"
                    onChange={(_, value) => {
                      addAppointmentForm.setFieldValue('serviceTypeId', value?.item.id);
                    }}
                    onBlur={addAppointmentForm.handleBlur('serviceTypeId')}
                    isOptionEqualToValue={(option, value) => option.item.id === value.item.id}
                    options={serviceTypeOptions}
                    groupBy={(option) => option.firstLetter}
                    getOptionLabel={(option) => option.item.title}
                    onInputChange={(event, value, reason) =>
                      addAppointmentForm.setFieldValue('serviceTypeId', validateInputChange(event, value, reason))
                    }
                    renderInput={(params: TextFieldProps) => (
                      <TextField
                        {...params}
                        label={t(Translation.MODAL_APPOINTMENTS_ADD_SELECT_SERVICE_TYPE)}
                        name="serviceTypeId"
                        required
                        helperText={
                          addAppointmentForm.touched.serviceTypeId ? addAppointmentForm.errors.serviceTypeId : ''
                        }
                        error={
                          Boolean(addAppointmentForm.errors.serviceTypeId) && addAppointmentForm.touched.serviceTypeId
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    id="patientId"
                    options={patientList}
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
                        label={t(Translation.MODAL_APPOINTMENTS_ADD_SELECT_PATIENT)}
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
                    label={t(Translation.MODAL_APPOINTMENTS_ADD_DESCRIPTION)}
                    multiline
                    name="description"
                    rows={4}
                    placeholder={t(Translation.MODAL_APPOINTMENTS_ADD_DESCRIPTION)}
                    value={addAppointmentForm.values.description}
                    onChange={addAppointmentForm.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MobileDateTimePicker
                    label={t(Translation.MODAL_APPOINTMENTS_ADD_TIME_PICKER)}
                    value={addAppointmentForm.values.date}
                    onChange={(date: Date | null) => mobileDateTimeChange(date)}
                    minutesStep={10}
                    DialogProps={{
                      sx: {
                        '& > div > div > div > div > div + div + div > div > div > div': {
                          '& .Mui-disabled': {
                            display: 'none'
                          }
                        }
                      }
                    }}
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
                    <StyledButton type="button" variant="contained" onClick={onClose}>
                      {t(Translation.MODAL_APPOINTMENTS_ADD_BUTTON_CANCEL)}
                    </StyledButton>
                    <StyledButton variant="contained" type="submit">
                      {t(Translation.MODAL_APPOINTMENTS_ADD_BUTTON_ADD)}
                    </StyledButton>
                  </Stack>
                </Grid>
              </Grid>
            </DialogActions>
          </form>
        </LocalizationProvider>
      </Dialog>
    </FormikProvider>
  );
};

export default AddAppointmentsModal;
