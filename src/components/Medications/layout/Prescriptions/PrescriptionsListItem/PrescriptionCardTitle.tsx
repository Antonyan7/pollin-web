import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, useTheme } from '@mui/material';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { useAppSelector } from 'redux/hooks';
import { margins, paddings } from 'themes/themeConstants';

import usePrescriptionActions from '@hooks/contextMenu/usePrescriptionActions';
import { ContextMenu } from '@ui-component/contextMenu';
import Chip from '@ui-component/patient/Chip';
import { DateUtil } from '@utils/date/DateUtil';

import { PrescriptionCardItem } from '../../types';

const PrescriptionCardTitle: FC<PrescriptionCardItem> = ({ prescription }) => {
  const theme = useTheme();
  const [t] = useTranslation();

  const prescriptionStatuses = useAppSelector(patientsSelector.prescriptionStatuses);
  const actions = useMemo(() => {
    if (prescriptionStatuses.length) {
      const currentStatusActions = prescriptionStatuses?.find((variation) => variation.status === prescription.status);

      return currentStatusActions?.actions ?? [];
    }

    return [];
  }, [prescriptionStatuses, prescription]);

  const actionBindings = usePrescriptionActions(prescription.id, actions);

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        fontSize: theme.typography.pxToRem(16),
        color: theme.palette.secondary[800],
        fontWeight: 400
      }}
    >
      <Grid item xs={7}>
        <Chip
          sx={{
            background: theme.palette.warning.main,
            color: theme.palette.common.black,
            pr: paddings.right2,
            pl: paddings.left2,
            ml: margins.left8
          }}
          label={prescription.type}
          size="small"
          chipColor="notActive"
        />
      </Grid>
      <Grid item xs={2}>
        <Chip
          sx={{
            background: theme.palette.success.light,
            color: theme.palette.success.main,
            pr: paddings.right2,
            pl: paddings.left2
          }}
          label={prescription?.status}
          size="small"
          chipColor="notActive"
        />
      </Grid>
      <Grid item xs={2.3}>
        <Typography variant="h5">
          {t(Translation.PAGE_PRESCRIPTIONS_LIST_CREATED)} {DateUtil.formatDateOnly(prescription?.date)}
        </Typography>
      </Grid>
      <Grid item xs={0.5}>
        <ContextMenu actionBindings={actionBindings} />
      </Grid>
    </Grid>
  );
};

export default PrescriptionCardTitle;
