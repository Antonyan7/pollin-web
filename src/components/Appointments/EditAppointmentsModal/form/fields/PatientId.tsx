import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Autocomplete, AutocompleteInputChangeReason, Grid, TextField, TextFieldProps } from '@mui/material';
import { Translation } from 'constants/translations';
import { useAppSelector } from 'redux/hooks';
import { bookingSelector } from 'redux/slices/booking';
import { AppointmentDetailsProps } from 'types/reduxTypes/booking';
import { validateInputChange } from 'validation/validationHelpers';

import { IFormValues } from '../types';

const PatientId = () => {
  const { control } = useFormContext<IFormValues>();
  const details: AppointmentDetailsProps = useAppSelector(
    bookingSelector.appointmentDetails
  ) as AppointmentDetailsProps;
  const [t] = useTranslation();

  const patientIdFieldName = 'patient.id';
  const { field, fieldState } = useController<IFormValues>({ name: patientIdFieldName, control });
  const { onChange, ...fieldProps } = field;
  const { isTouched, error } = fieldState;

  const patientIdHelperText = isTouched ? error?.message : '';
  const isPatientIdError = !!error?.message && isTouched;
  const patientIdSelectLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_SELECT_PATIENT);

  return (
    <Grid item xs={12}>
      <Autocomplete
        id={patientIdFieldName}
        disabled
        defaultValue={details?.patient}
        options={[details?.patient]}
        isOptionEqualToValue={(option, value) => option === value}
        getOptionLabel={(option) => option.name}
        onInputChange={(event: React.SyntheticEvent, value: string, reason: AutocompleteInputChangeReason) =>
          onChange(validateInputChange(event, value, reason))
        }
        renderInput={(params: TextFieldProps) => (
          <TextField
            {...params}
            label={patientIdSelectLabel}
            helperText={patientIdHelperText}
            error={isPatientIdError}
            {...fieldProps}
          />
        )}
      />
    </Grid>
  );
};

export default PatientId;
