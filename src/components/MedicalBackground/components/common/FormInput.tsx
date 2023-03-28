import React, { FC } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';
import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { paddings } from 'themes/themeConstants';

import { ConsultationTitleWithIcon } from '.';

export interface FormInputProps {
  name: string;
  label: string;
  index?: number;
}

const FormInput: FC<FormInputProps> = ({ name, label, index }) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name,
    control
  });

  const additionalInfo = typeof index === 'number' ? index + 1 : '';

  const errorHelperText = generateErrorMessage(`${label} ${additionalInfo}`);

  return (
    <TextField
      color="primary"
      fullWidth
      label={label}
      helperText={fieldState?.error && errorHelperText}
      error={Boolean(fieldState?.error)}
      {...field}
      value={field.value}
      ref={field.ref}
    />
  );
};

export const FormInputField = ({ label, ...otherProps }: FormInputProps) => (
  <Grid container item px={paddings.leftRight32} py={paddings.topBottom16} direction="row" xs={12}>
    <Grid item container xs={5} direction="row" alignItems="center" flexWrap="nowrap" gap={2}>
      <ConsultationTitleWithIcon description={label ?? ''} />
    </Grid>
    <Grid item xs={7}>
      <FormInput label={label} {...otherProps} />
    </Grid>
  </Grid>
);

export default FormInput;
