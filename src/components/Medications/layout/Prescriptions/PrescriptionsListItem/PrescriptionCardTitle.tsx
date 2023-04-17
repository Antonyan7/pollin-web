import React, { FC, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { PrescriptionsStatus, PrescriptionsType } from '@axios/patientEmr/managerPatientEmrTypes';
import { Badge, Grid, Link, Typography, useTheme } from '@mui/material';
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
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const prescriptionStatuses = useAppSelector(patientsSelector.prescriptionStatuses);
  const isDownloadPrescriptionLoading = useAppSelector(patientsSelector.isDownloadPrescriptionLoading);
  const actions = useMemo(() => {
    if (prescriptionStatuses.length) {
      const currentStatusActions = prescriptionStatuses?.find((variation) => variation.status === prescription.status);

      return currentStatusActions?.actions ?? [];
    }

    return [];
  }, [prescriptionStatuses, prescription]);

  const actionBindings = usePrescriptionActions(downloadRef, prescription.id, actions);

  const statusColor = useMemo(() => {
    switch (prescription.status) {
      case PrescriptionsStatus.Prescribed:
        return { background: theme.palette.warning.light, color: theme.palette.warning.dark };
      case PrescriptionsStatus.Dispensed:
        return { background: theme.palette.success.light, color: theme.palette.success.dark };
      case PrescriptionsStatus.Paid:
        return { background: theme.palette.dark.light, color: theme.palette.dark.main };
      default:
        return { background: theme.palette.warning.light, color: theme.palette.warning.dark };
    }
  }, [theme, prescription.status]);

  const prescriptionType =
    prescription.type === Object.keys(PrescriptionsType)[0] ? PrescriptionsType.InHouse : PrescriptionsType.External;

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
            background:
              prescriptionType === PrescriptionsType.InHouse
                ? theme.palette.warning.main
                : theme.palette.secondary[600],
            color: theme.palette.common.black,
            pr: paddings.right2,
            pl: paddings.left2,
            ml: margins.left8
          }}
          label={prescriptionType}
          size="small"
          chipColor="notActive"
        />
        {prescriptionType === PrescriptionsType.External && (
          <>
            <Badge
              color="secondary"
              overlap="circular"
              variant="dot"
              sx={{
                margin: margins.all12,
                '& .MuiBadge-dot': {
                  height: 5,
                  minWidth: 5
                }
              }}
            />
            <Typography variant="h5" display="inline">
              {prescription?.pharmacyTitle}
            </Typography>
          </>
        )}
      </Grid>

      <Grid item xs={2}>
        <Chip
          sx={{
            pr: paddings.right2,
            pl: paddings.left2,
            ...statusColor
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
        <ContextMenu actionBindings={actionBindings} isLoading={isDownloadPrescriptionLoading} />
        <Link component="a" ref={downloadRef} hidden href="#download" />
      </Grid>
    </Grid>
  );
};

export default PrescriptionCardTitle;
