import React from 'react';
import { Divider, Grid, styled } from '@mui/material';
import { margins, paddings } from 'themes/themeConstants';

import BaseModal from '@ui-component/Modal/BaseModal';

import Actions from './Actions';
import Body from './Body';
import { StaticModalProps } from './types';

const StaticModalDivider = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.primary.light
}));

const StaticModal: React.FC<StaticModalProps> = ({
  data,
  onClose,
  dynamicComponent,
  toConfirm,
  isDisabled,
  isLoading,
  divider
}) => (
  <BaseModal
    title={data.headerTitle}
    onClose={onClose}
    disableDivider
    titleSx={{
      px: paddings.left24
    }}
  >
    <Grid>
      <Grid container>
        <Grid item xs={12}>
          {divider && <StaticModalDivider sx={{ mb: margins.bottom24, mt: margins.top16 }} />}
          <Body data={data} dynamicComponent={dynamicComponent} />
        </Grid>
        <Grid item xs={12}>
          {divider && <StaticModalDivider sx={{ my: margins.topBottom24 }} />}
          <Actions data={data} onClose={onClose} toConfirm={toConfirm} isDisabled={isDisabled} isLoading={isLoading} />
        </Grid>
      </Grid>
    </Grid>
  </BaseModal>
);

export default StaticModal;
