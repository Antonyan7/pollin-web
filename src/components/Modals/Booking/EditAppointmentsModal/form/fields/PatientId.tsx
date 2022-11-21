import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import { Translation } from 'constants/translations';
import { useAppSelector } from 'redux/hooks';
import { bookingSelector } from 'redux/slices/booking';
import { AppointmentDetailsProps } from 'types/reduxTypes/bookingStateTypes';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

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

  const patientsList = useAppSelector(bookingSelector.patientList);
  const { isLoading } = patientsList;

  const patientIdHelperText = isTouched ? error?.message : '';
  const isPatientIdError = !!error?.message && isTouched;
  const patientIdSelectLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_SELECT_PATIENT);

  return (
    <Grid item xs={12}>
      <BaseDropdownWithLoading
        isLoading={isLoading}
        id={patientIdFieldName}
        onChange={(_, value) => {
          if (value && typeof value === 'object' && 'id' in value) {
            onChange(value.id);
          }
        }}
        disabled
        defaultValue={details?.patient}
        options={[details?.patient]}
        isOptionEqualToValue={(option, value) => option === value}
        getOptionLabel={(option) => (typeof option === 'object' ? option.name : option)}
        clearIcon={<CloseIcon onClick={() => onChange('')} fontSize="small" />}
        renderInputProps={{
          label: patientIdSelectLabel,
          helperText: patientIdHelperText,
          error: isPatientIdError,
          ...fieldProps
        }}
      />
    </Grid>
  );
};

export default PatientId;
