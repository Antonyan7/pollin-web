import React from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, Fab, Grid } from '@mui/material';

export const PlusIconButton = (props: { onClick: () => void }) => {
  const { onClick } = props;

  return (
    <Grid container direction="row-reverse">
      <Grid item>
        <Fab color="secondary" onClick={onClick}>
          <AddRoundedIcon fontSize="medium" />
        </Fab>
      </Grid>
    </Grid>
  );
};

export const MinusIconButton = (props: { onClick: () => void }) => {
  const { onClick } = props;

  return (
    <Grid container direction="row-reverse">
      <Grid item>
        <Button className="minus-icon" onClick={onClick}>
          <RemoveIcon />
        </Button>
      </Grid>
    </Grid>
  );
};
