import React from 'react';
import { StyledButton } from '@components/Appointments/CommonMaterialComponents';
import { Grid } from '@mui/material';

interface Props {
  submitButtonText: string;
}

const ActionsField = ({ submitButtonText }: Props) => (
  <Grid container alignItems="center">
    <Grid item xs />
    <Grid item xs />
    <Grid item container xs={4} lg={2} justifyContent="flex-end">
      <StyledButton
        type="submit"
        color="primary"
        variant="contained"
        size="large"
        style={{
          margin: '30px 0'
        }}
      >
        {submitButtonText}
      </StyledButton>
    </Grid>
  </Grid>
);

export default ActionsField;
