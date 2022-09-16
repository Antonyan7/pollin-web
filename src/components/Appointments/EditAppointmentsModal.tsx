import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IEditAppointmentBody } from '@axios/managerBooking';
import { StyledButton, StyledInputLabel, StyledSelectButton } from '@components/Appointments/CommonMaterialComponents';
import { roundUpTo } from '@constants';
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
  MenuItem,
  Stack,
  TextField,
  TextFieldProps,
  Tooltip
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { ModalName } from 'constants/modals';
import { Translation } from 'constants/translations';
import { FormikProvider, useFormik } from 'formik';
import { createOptionsGroup } from 'helpers/berryFunctions';
import { appointmentStatusData } from 'helpers/constants';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware, viewsSelector } from 'redux/slices/views';
import { AppointmentDetailsProps } from 'types/reduxTypes/booking';
import { validateInputChange } from 'validation/appointments/add_appointment';
import { editAppointmentsValidationSchema } from 'validation/appointments/edit_appointment';

import { PickerDateIcon } from '@ui-component/common/TimeDateIcons';

const getFormState = (details?: AppointmentDetailsProps | null): IFormValues => ({
  appointmentId: details?.appointment.id ?? '',
  description: details?.appointment.description ?? '',
  date: details?.appointment.date ?? new Date(),
  status: details?.appointment.status ?? '',
  serviceType: details?.serviceType?.id ?? ''
});

interface IEditAppointmentModalProps {
  appointmentId: string;
}

interface IFormValues {
  appointmentId: string;
  patientId?: string;
  description: string;
  date: Date;
  status: string;
  serviceType: string;
}

const mergeAppointmentDetails = (details: AppointmentDetailsProps, values: IFormValues): IEditAppointmentBody => ({
  appointment: {
    date: values.date,
    status: values.status,
    description: values.description
  },
  serviceTypeId: values.serviceType
});
// TODO update component to contain 150 lines
// eslint-disable-next-line max-lines-per-function
const EditAppointmentsModal = () => {
  const details: AppointmentDetailsProps = useAppSelector(
    bookingSelector.appointmentDetails
  ) as AppointmentDetailsProps;
  const serviceTypes = useAppSelector(bookingSelector.serviceTypes);

  const { appointmentId }: IEditAppointmentModalProps = useAppSelector(viewsSelector.modal).props;
  const [t] = useTranslation();
  const serviceTypeOptions = useMemo(() => createOptionsGroup(serviceTypes), [serviceTypes]);

  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.setModalState({ name: ModalName.NONE, props: {} }));
  }, []);

  const editAppointmentForm = useFormik({
    initialValues: getFormState(),
    validationSchema: editAppointmentsValidationSchema,
    onSubmit: (values, { resetForm }) => {
      if (values) {
        dispatch(
          bookingMiddleware.editAppointment(appointmentId, mergeAppointmentDetails(details, editAppointmentForm.values))
        );
      }

      resetForm();
      onClose();
    }
  });

  const onSave = useCallback(() => {
    onClose();
    dispatch(
      bookingMiddleware.editAppointment(appointmentId, mergeAppointmentDetails(details, editAppointmentForm.values))
    );
  }, [appointmentId, details, editAppointmentForm, onClose]);

  const defaultServiceTypeOption = useMemo(
    () => serviceTypeOptions.find((option) => option.item.id === editAppointmentForm.values?.serviceType) ?? null,
    [editAppointmentForm.values, serviceTypeOptions]
  );

  const currentOption = useMemo(
    () => serviceTypeOptions.find((option) => option.item.id === editAppointmentForm.values.serviceType),
    [editAppointmentForm.values.serviceType, serviceTypeOptions]
  );

  useEffect(() => {
    dispatch(bookingMiddleware.getServiceTypes());
  }, []);

  useEffect(() => {
    if (appointmentId) {
      dispatch(bookingMiddleware.getAppointmentDetails(appointmentId));
    }
  }, [appointmentId]);

  useEffect(() => {
    if (details) {
      editAppointmentForm.setValues(getFormState(details));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);

  const mobileDateTimeChange = (date: Date | null) => {
    let roundedTime;

    if (date) {
      roundedTime = new Date(Math.ceil(date.getTime() / roundUpTo) * roundUpTo);
    }

    editAppointmentForm?.setFieldValue('date', roundedTime);
  };

  const onRemoveClick = useCallback(() => {
    dispatch(
      viewsMiddleware.setModalState({ name: ModalName.ConfirmAppointmentCancelModal, props: { appointmentId } })
    );
    dispatch(bookingMiddleware.clearAppointmentDetails());
  }, [appointmentId]);

  return editAppointmentForm.values.appointmentId ? (
    <FormikProvider value={editAppointmentForm}>
      <Dialog open onClose={onClose}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <form onSubmit={editAppointmentForm.handleSubmit}>
            <DialogTitle sx={{ fontWeight: 700 }} id="mui-6">
              {t(Translation.MODAL_APPOINTMENTS_EDIT_TITLE)}
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Autocomplete
                    id="serviceType"
                    onChange={(_, value) => {
                      editAppointmentForm.setFieldValue('serviceType', value?.item.id);
                    }}
                    defaultValue={defaultServiceTypeOption}
                    onBlur={editAppointmentForm.handleBlur('serviceType')}
                    isOptionEqualToValue={(option, value) => option.item.id === value?.item.id}
                    options={serviceTypeOptions}
                    groupBy={(option) => option.firstLetter}
                    getOptionLabel={(option) => option.item.title}
                    onInputChange={(event, value, reason) =>
                      editAppointmentForm.setFieldValue('serviceType', validateInputChange(event, value, reason))
                    }
                    renderInput={(params: TextFieldProps) => (
                      <TextField
                        {...params}
                        label={t(Translation.MODAL_APPOINTMENTS_EDIT_SELECT_SERVICE_TYPE)}
                        name="serviceType"
                        required
                        helperText={
                          editAppointmentForm.touched.serviceType ? editAppointmentForm.errors.serviceType : ''
                        }
                        error={
                          Boolean(editAppointmentForm.errors.serviceType) && editAppointmentForm.touched.serviceType
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    id="patientId"
                    disabled
                    defaultValue={details?.patient}
                    options={[details.patient]}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params: TextFieldProps) => (
                      <TextField
                        {...params}
                        label={t(Translation.MODAL_APPOINTMENTS_EDIT_SELECT_PATIENT)}
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
                    label={t(Translation.MODAL_APPOINTMENTS_EDIT_DESCRIPTION)}
                    multiline
                    name="description"
                    rows={4}
                    placeholder={t(Translation.MODAL_APPOINTMENTS_EDIT_DESCRIPTION)}
                    value={editAppointmentForm.values.description}
                    onChange={editAppointmentForm.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MobileDateTimePicker
                    label={t(Translation.MODAL_APPOINTMENTS_EDIT_TIME_PICKER)}
                    value={editAppointmentForm.values.date}
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
            <Grid container spacing={3} style={{ padding: '0 24px' }}>
              <Grid item xs={currentOption?.item.isVirtual ? 6 : 12}>
                <FormControl fullWidth>
                  <StyledInputLabel id="status-appointment-label">Status</StyledInputLabel>
                  <StyledSelectButton
                    IconComponent={KeyboardArrowDownIcon}
                    id="status-appointment-label"
                    labelId="status-appointment-label"
                    label={t(Translation.MODAL_APPOINTMENTS_EDIT_BUTTON_STATUS)}
                    name="status"
                    defaultValue={editAppointmentForm.values.status}
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
              {currentOption?.item.isVirtual ? (
                <Grid item xs={6}>
                  <StyledButton
                    variant="contained"
                    sx={{
                      width: '100%',
                      height: '100%'
                    }}
                    onClick={onClose}
                  >
                    {t(Translation.MODAL_APPOINTMENTS_EDIT_BUTTON_JOIN)}
                  </StyledButton>
                </Grid>
              ) : null}
            </Grid>
            <DialogActions sx={{ p: 3 }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Tooltip title={t(Translation.MODAL_APPOINTMENTS_EDIT_ICON_DELETE)}>
                    <DeleteIcon sx={{ cursor: 'pointer' }} onClick={onRemoveClick} />
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <StyledButton variant="contained" onClick={onClose}>
                      {t(Translation.MODAL_APPOINTMENTS_EDIT_BUTTON_CANCEL)}
                    </StyledButton>
                    <StyledButton type="submit" variant="contained" onClick={onSave}>
                      {t(Translation.MODAL_APPOINTMENTS_EDIT_BUTTON_SAVE)}
                    </StyledButton>
                  </Stack>
                </Grid>
              </Grid>
            </DialogActions>
          </form>
        </LocalizationProvider>
      </Dialog>
    </FormikProvider>
  ) : null;
};

export default EditAppointmentsModal;
