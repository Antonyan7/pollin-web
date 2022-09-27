import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ICreatedAppointmentBody } from '@axios/managerBooking';
import { Autocomplete, AutocompleteInputChangeReason, Grid, TextField, TextFieldProps } from '@mui/material';
import { Translation } from 'constants/translations';
import { useAppSelector } from 'redux/hooks';
import { bookingSelector } from 'redux/slices/booking';
import { validateInputChange } from 'validation/validationHelpers';

const PatientId = () => {
  const {
    control,
    formState: { touchedFields, errors }
  } = useFormContext<ICreatedAppointmentBody>();
  const patientsList = useAppSelector(bookingSelector.patientList);
  const { patients } = patientsList;
  const [t] = useTranslation();

  const patientIdFieldName = 'patientId';
  const patientIdHelperText = (touchedFields[patientIdFieldName] ? errors[patientIdFieldName]?.message : '') ?? '';
  const isPatientIdError = !!errors[patientIdFieldName]?.message && touchedFields[patientIdFieldName];
  const patientIdSelectLabel = t(Translation.MODAL_APPOINTMENTS_ADD_SELECT_PATIENT);

  const {
    field: { onBlur, onChange, ...fieldProps }
  } = useController({ name: patientIdFieldName, control });

  return (
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
  );
};

export default PatientId;
