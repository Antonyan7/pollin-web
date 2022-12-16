import React from 'react';
import { Grid, Typography } from '@mui/material';

interface SpecimenDataItemProps {
  label: string;
  value: string | React.ReactNode;
}

const SpecimenDataItem: React.FC<SpecimenDataItemProps> = ({ label, value }) => (
  <Grid display="flex" item alignItems="center" justifyContent="space-between" xs={6.5}>
    <Typography variant="h5" fontWeight={600}>{`${label}:`}</Typography>
    {typeof value === 'string' ? <Typography variant="h5">{value}</Typography> : value}
  </Grid>
);

export default SpecimenDataItem;
