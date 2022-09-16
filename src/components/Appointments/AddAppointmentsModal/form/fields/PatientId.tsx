import React from 'react';
import { useTranslation } from 'react-i18next';
import { Autocomplete, Grid, TextField, TextFieldProps } from '@mui/material';
import { Translation } from 'constants/translations';
import { FormikValues, useFormikContext } from 'formik';
import { useAppSelector } from 'redux/hooks';
import { bookingSelector } from 'redux/slices/booking';
import { validateInputChange } from 'validation/validationHelpers';

const PatientId = () => {
  const { handleBlur, setFieldValue, touched, errors }: FormikValues = useFormikContext();
  const patientsList = useAppSelector(bookingSelector.patientList);
  const { patients } = patientsList;
  const [t] = useTranslation();

  const patientIdFieldName = 'patientId';
  const patientIdHelperText = touched[patientIdFieldName] ? errors[patientIdFieldName] : '';
  const isPatientIdError = !!errors[patientIdFieldName] && touched[patientIdFieldName];
  const patientIdSelectLabel = t(Translation.MODAL_APPOINTMENTS_ADD_SELECT_PATIENT);

  return (
    <Grid item xs={12}>
      <Autocomplete
        id={patientIdFieldName}
        options={patients}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option.name}
        onChange={(_, value) => setFieldValue(patientIdFieldName, value?.id)}
        onBlur={() => handleBlur(patientIdFieldName)}
        onInputChange={(event, value, reason) =>
          setFieldValue(patientIdFieldName, validateInputChange(event, value, reason))
        }
        renderInput={(params: TextFieldProps) => (
          <TextField
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
  );
};

export default PatientId;
