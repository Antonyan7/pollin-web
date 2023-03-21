import React, { useMemo } from 'react';
import { Grid } from '@mui/material';
import { paddings } from 'themes/themeConstants';

import BaseModal from '@ui-component/Modal/BaseModal';

import Actions from './Actions';
import Body from './Body';
import StaticDataContext from './context';
import { StaticModalProps } from './types';

const StaticModal: React.FC<StaticModalProps> = ({ data, onClose, toConfirm }) => {
  const staticModalValues = useMemo(
    () => ({
      data,
      onClose,
      toConfirm
    }),
    [data, onClose, toConfirm]
  );

  return (
    <StaticDataContext.Provider value={staticModalValues}>
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
              <Body />
            </Grid>
            <Grid item xs={12}>
              <Actions />
            </Grid>
          </Grid>
        </Grid>
      </BaseModal>
    </StaticDataContext.Provider>
  );
};

export default StaticModal;
