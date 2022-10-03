import React from 'react';
import { useTranslation } from 'react-i18next';
import { Autocomplete, Grid, TextField, TextFieldProps } from '@mui/material';
import { Translation } from 'constants/translations';
import { FormikValues, useFormikContext } from 'formik';
import { useAppSelector } from 'redux/hooks';
import { bookingSelector } from 'redux/slices/booking';
import { AppointmentDetailsProps } from 'types/reduxTypes/booking';

const PatientId = () => {
  const { touched, errors }: FormikValues = useFormikContext();
  const details: AppointmentDetailsProps = useAppSelector(
    bookingSelector.appointmentDetails
  ) as AppointmentDetailsProps;
  const [t] = useTranslation();

  const patientIdFieldName = 'id';
  const patientIdHelperText = touched[patientIdFieldName] ? errors[patientIdFieldName] : '';
  const isPatientIdError = !!errors[patientIdFieldName] && touched[patientIdFieldName];
  const patientIdSelectLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_SELECT_PATIENT);

  return (
    <Grid item xs={12}>
      <Autocomplete
        id={patientIdFieldName}
        disabled
        defaultValue={details?.patient}
        options={[details.patient]}
        isOptionEqualToValue={(option, value) => option === value}
        getOptionLabel={(option) => option.name}
        renderInput={(params: TextFieldProps) => (
          <TextField
            {...params}
            label={patientIdSelectLabel}
            name={patientIdFieldName}
            helperText={patientIdHelperText}
            error={isPatientIdError}
          />
        )}
      />
    </Grid>
  );
};

export default PatientId;
