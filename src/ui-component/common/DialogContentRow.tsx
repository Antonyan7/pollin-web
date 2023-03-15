import React from 'react';
import { Grid, Stack, Typography } from '@mui/material';

interface DialogContentRowProps {
  subtitle: string;
  body?: string;
}

const DialogContentRow = ({ subtitle, body }: DialogContentRowProps) => (
  <Grid item xs={12}>
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography variant="subtitle1" fontWeight={500}>
        {subtitle}
      </Typography>
      <Typography variant="body2">{body}</Typography>
    </Stack>
  </Grid>
);

export default DialogContentRow;
