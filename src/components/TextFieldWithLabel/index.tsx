import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Grid, TextField, TextFieldProps, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { borderRadius, paddings } from 'themes/themeConstants';

import { TextFieldWithLabelProps } from './types';

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  width: '100%',
  '& input': {
    background: theme.palette.secondary.light,
    padding: `${paddings.top8} ${paddings.leftRight16} 80px`
  },
  '& fieldset': {
    borderRadius: borderRadius.radius12
  }
}));

const TextFieldWithLabel: React.FC<TextFieldWithLabelProps> = ({
  label,
  placeholder,
  containerStyles,
  labelStyles,
  textFieldProps,
  currentFormFieldName
}) => {
  const { control } = useFormContext();

  const { field } = useController({
    name: currentFormFieldName,
    control
  });

  return (
    <Grid
      container
      sx={{
        py: paddings.topBottom20,
        ...containerStyles
      }}
      display="flex"
      flexDirection="column"
      rowGap={3}
    >
      <Grid item>
        <Typography sx={{ color: (theme) => theme.palette.secondary[800], fontWeight: 600, ...labelStyles }}>
          {label}
        </Typography>
      </Grid>
      <Grid item>
        <StyledTextField placeholder={placeholder} {...textFieldProps} {...field} />
      </Grid>
    </Grid>
  );
};

export default TextFieldWithLabel;
