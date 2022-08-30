import React, { useEffect, useState } from 'react';
import {
  InternalButton,
  StyledInputLabel,
  StyledSelectButton
} from '@components/Appointments/CommonMaterialComponents';
import { roundUpTo } from '@constants';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  TextFieldProps,
  Tooltip,
  useTheme
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { FormikProvider, useFormik } from 'formik';
import { createOptionsGroup } from 'helpers/berryFunctions';
import { appointmentStatusData } from 'helpers/constants';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { AppointmentDetailsProps, AppointmentsProps } from 'types/reduxTypes/appointments';
import { validateInputChange } from 'validation/appointments/add_appointment';
import { editAppointmentsValidationSchema } from 'validation/appointments/edit_appointment';

import { AppointmentsModalProps, AppointmentsModalTypes } from '../../types/appointments';

import ConfirmAppointmentsModal from './ConfirmAppointmentsModal';

// TODO update component to contain 150 lines
// eslint-disable-next-line max-lines-per-function
const EditAppointmentsModal = ({
  openAppointmentsModal,
  onCloseAppointmentsModal,
  appointmentSlotId,
  setOpenAppointmentsModal: setOpenEditAppointmentsModal
}: AppointmentsModalProps) => {
  const theme = useTheme();
  const appointmentDetails = useAppSelector(bookingSelector.appointmentDetails);
  const appointmentTypeData = useAppSelector(bookingSelector.serviceTypes);
  const patientList = useAppSelector(bookingSelector.patientList);
  const [serviceTypeData, setServiceTypeData] = useState<AppointmentsProps['appointmentTypeData']>([]);
  const [patientSelectedData, setPatientSelectedData] = useState<AppointmentsProps['patientData']>([]);
  const [editableAppointmentData, setEditableAppointmentData] = useState<AppointmentDetailsProps | null>(null);
  const [openConfirmAppointmentsModal, setOpenConfirmAppointmentsModal] = useState<boolean>(false);
  const [cancellationReason, setCancellationReason] = useState<string>('Reason Of the cancellation is the timing');
  const editAppointmentForm = useFormik({
    initialValues: {
      appointmentTypeId: editableAppointmentData ? editableAppointmentData.appointmentType.id : '',
      patientId: editableAppointmentData ? editableAppointmentData.patient.id : '',
      description: editableAppointmentData ? editableAppointmentData.description : '',
      date: editableAppointmentData ? editableAppointmentData.date : new Date(),
      status: editableAppointmentData ? editableAppointmentData.status : ''
    },
    validationSchema: editAppointmentsValidationSchema,
    onSubmit: (values, { resetForm }) => {
      if (values) {
        dispatch(
          bookingMiddleware.updateAppointmentDetails({
            ...appointmentDetails,
            cancellationReason
          } as AppointmentDetailsProps)
        );
      }

      resetForm();
      setOpenEditAppointmentsModal(false);
    }
  });

  useEffect(() => {
    dispatch(bookingMiddleware.getAppointmentDetails(appointmentSlotId as string));
  }, [appointmentSlotId]);

  useEffect(() => {
    dispatch(bookingMiddleware.getServiceTypes());
    dispatch(bookingMiddleware.getPatientNames());
  }, []);

  useEffect(() => {
    setServiceTypeData(appointmentTypeData);
  }, [appointmentTypeData]);

  useEffect(() => {
    setPatientSelectedData(patientList);
  }, [patientList]);

  useEffect(() => {
    setEditableAppointmentData(appointmentDetails);
  }, [appointmentDetails]);

  const mobileDateTimeChange = (date: Date | null) => {
    let roundedTime;

    if (date) {
      roundedTime = new Date(Math.ceil(date.getTime() / roundUpTo) * roundUpTo);
    }

    editAppointmentForm.setFieldValue('date', roundedTime);
  };

  const closeAppointmentsModal = (appointmentModalType: AppointmentsModalTypes) => {
    switch (appointmentModalType) {
      case AppointmentsModalTypes.Confirm:
        setOpenConfirmAppointmentsModal(false);
        break;
      case AppointmentsModalTypes.Edit:
        setOpenEditAppointmentsModal(false);
        editAppointmentForm.resetForm();
        break;
      default:
        setOpenEditAppointmentsModal(true);
    }
  };

  return (
    <FormikProvider value={editAppointmentForm}>
      <Dialog open={openAppointmentsModal} onClose={onCloseAppointmentsModal}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {openAppointmentsModal && (
            <form onSubmit={editAppointmentForm.handleSubmit}>
              <DialogTitle sx={{ fontWeight: 700 }} id="mui-6">
                Edit Appointment
              </DialogTitle>
              <Divider />
              <DialogContent sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Autocomplete
                      id="appointmentTypeId"
                      onChange={(_, value) => {
                        editAppointmentForm.setFieldValue('appointmentTypeId', value?.id);
                      }}
                      onBlur={editAppointmentForm.handleBlur('appointmentTypeId')}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      options={createOptionsGroup(serviceTypeData)}
                      groupBy={(option) => option.firstLetter}
                      getOptionLabel={(option) => option.title}
                      onInputChange={(event, value, reason) =>
                        editAppointmentForm.setFieldValue(
                          'appointmentTypeId',
                          validateInputChange(event, value, reason)
                        )
                      }
                      renderInput={(params: TextFieldProps) => (
                        <TextField
                          {...params}
                          label="Appointment type"
                          name="appointmentTypeId"
                          required
                          helperText={
                            editAppointmentForm.touched.appointmentTypeId
                              ? editAppointmentForm.errors.appointmentTypeId
                              : ''
                          }
                          error={
                            Boolean(editAppointmentForm.errors.appointmentTypeId) &&
                            editAppointmentForm.touched.appointmentTypeId
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
                        editAppointmentForm.setFieldValue('patientId', value?.id);
                      }}
                      onBlur={editAppointmentForm.handleBlur('patientId')}
                      onInputChange={(event, value, reason) => {
                        editAppointmentForm.setFieldValue('patientId', validateInputChange(event, value, reason));
                      }}
                      renderInput={(params: TextFieldProps) => (
                        <TextField
                          {...params}
                          label="Patient"
                          name="patientId"
                          required
                          helperText={editAppointmentForm.touched.patientId ? editAppointmentForm.errors.patientId : ''}
                          error={Boolean(editAppointmentForm.errors.patientId) && editAppointmentForm.touched.patientId}
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
                      value={editAppointmentForm.values.description}
                      onChange={editAppointmentForm.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MobileDateTimePicker
                      label="Date & Start Time"
                      value={editAppointmentForm.values.date}
                      onChange={(date: Date | null) => mobileDateTimeChange(date)}
                      renderInput={(params: TextFieldProps) => (
                        <TextField
                          {...params}
                          fullWidth
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
                  </Grid>
                </Grid>
              </DialogContent>
              <Grid container spacing={3} style={{ padding: '0 24px' }}>
                <Grid item xs={editableAppointmentData?.isVirtual ? 6 : 12}>
                  <FormControl fullWidth>
                    <StyledInputLabel theme={theme} id="status-appointment-label">
                      Status
                    </StyledInputLabel>
                    <StyledSelectButton
                      theme={theme}
                      IconComponent={KeyboardArrowDownIcon}
                      id="status-appointment-label"
                      labelId="status-appointment-label"
                      label="Status"
                      name="status"
                      value={editAppointmentForm.values.status}
                      onChange={editAppointmentForm.handleChange}
                    >
                      {appointmentStatusData.map((statusItem) => (
                        <MenuItem value={statusItem} key={statusItem.toString()}>
                          {statusItem}
                        </MenuItem>
                      ))}
                    </StyledSelectButton>
                  </FormControl>
                </Grid>
                {editableAppointmentData?.isVirtual ? (
                  <Grid item xs={6}>
                    <InternalButton
                      theme={theme}
                      sx={{
                        backgroundColor: theme.palette.dark[100],
                        color: theme.palette.common.white,
                        width: '100%',
                        height: '100%'
                      }}
                    >
                      Join Virtual Appointment
                    </InternalButton>
                  </Grid>
                ) : null}
              </Grid>
              <DialogActions sx={{ p: 3 }}>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Tooltip title="Delete Event">
                      <DeleteIcon
                        sx={{ color: theme.palette.grey[500], cursor: 'pointer' }}
                        onClick={() => setOpenConfirmAppointmentsModal(true)}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <InternalButton theme={theme} onClick={() => closeAppointmentsModal(AppointmentsModalTypes.Edit)}>
                        Cancel
                      </InternalButton>
                      <InternalButton
                        type="submit"
                        theme={theme}
                        sx={{ backgroundColor: theme.palette.dark[100], color: theme.palette.common.white }}
                      >
                        Save
                      </InternalButton>
                    </Stack>
                  </Grid>
                </Grid>
              </DialogActions>
            </form>
          )}
        </LocalizationProvider>
        <ConfirmAppointmentsModal
          openAppointmentsModal={openConfirmAppointmentsModal}
          setOpenAppointmentsModal={setOpenConfirmAppointmentsModal}
          onCloseAppointmentsModal={() => closeAppointmentsModal(AppointmentsModalTypes.Confirm)}
          setCancellationReason={setCancellationReason}
        />
      </Dialog>
    </FormikProvider>
  );
};

export default EditAppointmentsModal;
