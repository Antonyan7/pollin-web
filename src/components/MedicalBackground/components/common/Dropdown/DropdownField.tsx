import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { paddings } from 'themes/themeConstants';

import { ConsultationTitleWithIcon } from '..';

import { DropdownProps } from './types';
import Dropdown from '.';

const DropdownField: FC<DropdownProps> = ({ label, ...otherProps }) => (
  <Grid container item px={paddings.leftRight32} py={paddings.topBottom16} direction="row" xs={12}>
    <Grid item container xs={5} direction="row" alignItems="center" flexWrap="nowrap" gap={2}>
      <ConsultationTitleWithIcon description={label ?? ''} />
    </Grid>
    <Grid item xs={7}>
      <Dropdown label={label} {...otherProps} />
    </Grid>
  </Grid>
);

export default DropdownField;
