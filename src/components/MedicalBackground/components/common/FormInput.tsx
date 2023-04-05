import React, { FC, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';
import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { margins, paddings } from 'themes/themeConstants';

import MedicalBackgroundNote from './MedicalBackgroundNote';
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

export const FormInputField = ({ label, ...otherProps }: FormInputProps) => {
  const [shouldShowNote, setShouldShowNote] = useState(false);
  const onNoteClick = () => {
    setShouldShowNote((isShown) => !isShown);
  };

  return (
    <Grid container item px={paddings.leftRight32} py={paddings.topBottom16} direction="row" xs={12}>
      <Grid
        item
        container
        direction="row"
        xs={5}
        alignItems="flex-start"
        flexWrap="nowrap"
        gap={1}
        sx={{
          marginTop: margins.top10
        }}
      >
        <ConsultationTitleWithIcon description={label ?? ''} onClick={onNoteClick} isShown={shouldShowNote} />
      </Grid>
      <Grid container direction="column" xs={7} gap={2}>
        <FormInput label={label} {...otherProps} />
        <MedicalBackgroundNote onClick={onNoteClick} visible={shouldShowNote ?? false} fieldName={otherProps.name} />
      </Grid>
    </Grid>
  );
};

export default FormInput;
