import React from 'react';
import { Button, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { paddings } from 'themes/themeConstants';

const BackButton = () => {
  const { push, query } = useRouter();

  const onBackClick = () => push(`/patient-emr/details/${query.id}/profile`);

  return (
    <Grid py={paddings.topBottom24} px={paddings.leftRight50}>
      <Button color="primary" variant="outlined" size="large" onClick={onBackClick}>
        Back
      </Button>
    </Grid>
  );
};

export default BackButton;
