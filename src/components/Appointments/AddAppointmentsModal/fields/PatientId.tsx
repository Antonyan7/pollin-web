import React, { useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ICreatedAppointmentBody } from '@axios/managerBooking';
import { Autocomplete, AutocompleteInputChangeReason, Grid, TextField, TextFieldProps } from '@mui/material';
import { Translation } from 'constants/translations';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { AlertDetailsProps } from 'types/reduxTypes/patient-emr';
import { validateInputChange } from 'validation/validationHelpers';

import DuplicatePatientPopup from '@ui-component/patient/DuplicatePatientPopup';

enum OpenModalReason {
  DuplicateName = 'Duplicate Name'
}

const PatientId = () => {
  const [openDuplicateAlertPopUp, setOpenDuplicateAlertPopUp] = useState<boolean>(false);
  const {
    control,
    formState: { touchedFields, errors }
  } = useFormContext<ICreatedAppointmentBody>();

  const patientsList = useAppSelector(bookingSelector.patientList);
  const patientAlerts = useAppSelector(bookingSelector.patientAlerts);
  const { patients } = patientsList;
  const [t] = useTranslation();

  const patientIdFieldName = 'patientId';
  const patientIdHelperText = (touchedFields[patientIdFieldName] ? errors[patientIdFieldName]?.message : '') ?? '';
  const isPatientIdError = !!errors[patientIdFieldName]?.message && touchedFields[patientIdFieldName];
  const patientIdSelectLabel = t(Translation.MODAL_APPOINTMENTS_ADD_SELECT_PATIENT);

  const {
    field: { onBlur, onChange, ...fieldProps }
  } = useController({ name: patientIdFieldName, control });

  useEffect(() => {
    if (control._formValues.patientId) {
      dispatch(bookingMiddleware.getPatientAlerts(control._formValues.patientId));
    }
  }, [control._formValues.patientId]);

  useEffect(() => {
    if (patientAlerts.alerts && patientAlerts.alerts.length) {
      const findDuplicate = patientAlerts.alerts.filter((alertDetails: AlertDetailsProps) =>
        Boolean(alertDetails.messages.find((message) => message.title === OpenModalReason.DuplicateName))
      );

      if (findDuplicate.length) {
        setOpenDuplicateAlertPopUp(true);
        dispatch(bookingMiddleware.getPatientAlerts());
      } else {
        setOpenDuplicateAlertPopUp(false);
      }
    }
  }, [patientAlerts.alerts]);

  return (
    <>
      <Grid item xs={12}>
        <Autocomplete
          id={patientIdFieldName}
          options={patients}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.title}
          onChange={(_, value) => onChange(value?.id)}
          onBlur={onBlur}
          onInputChange={(event: React.SyntheticEvent, value: string, reason: AutocompleteInputChangeReason) =>
            onChange(validateInputChange(event, value, reason))
          }
          renderInput={(params: TextFieldProps) => (
            <TextField
              {...fieldProps}
              {...params}
              label={patientIdSelectLabel}
              name={patientIdFieldName}
              helperText={patientIdHelperText}
              error={isPatientIdError}
              required
            />
          )}
        />
      </Grid>
      <DuplicatePatientPopup open={openDuplicateAlertPopUp} setOnClose={setOpenDuplicateAlertPopUp} />
    </>
  );
};

export default PatientId;
