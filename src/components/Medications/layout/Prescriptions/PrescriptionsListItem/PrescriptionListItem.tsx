import React from 'react';
import { MedicationsProps } from '@axios/patientEmr/managerPatientEmrTypes';
import { Grid, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import { t } from 'i18next';
import { paddings } from 'themes/themeConstants';

import { DateUtil } from '@utils/date/DateUtil';
import { isDashValue } from '@utils/stringUtils';

interface ViewModeContentProps {
  medicationData: MedicationsProps;
  prescriber: string | null;
}

const ViewModeContent = ({ medicationData, prescriber }: ViewModeContentProps) => {
  const theme = useTheme();
  const fontStyle = { fontWeight: 500 };

  return (
    <Grid
      container
      alignItems="center"
      spacing={1}
      sx={{
        color: theme.palette.secondary[800],
        backgroundColor: theme.palette.common.white,
        fontSize: theme.typography.pxToRem(15),
        pt: paddings.top16,
        pl: paddings.left24,
        pb: paddings.bottom16
      }}
    >
      <Grid container item xs={12}>
        <Grid item xs={4} sx={fontStyle}>
          {t(Translation.PAGE_MEDICATIONS_CURRENT_LIST_DOSAGE)}
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          {medicationData?.dosage}
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={4} sx={fontStyle}>
          {t(Translation.PAGE_MEDICATIONS_CURRENT_LIST_ROUTE)}
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          {medicationData?.route}
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={4} sx={fontStyle}>
          {t(Translation.PAGE_MEDICATIONS_CURRENT_LIST_FREQUENCY)}
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          {medicationData?.frequency}
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={4} sx={fontStyle}>
          {t(Translation.PAGE_MEDICATIONS_CURRENT_LIST_TIME)}
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
          {medicationData?.time || '-'}
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={4} sx={fontStyle}>
          {t(Translation.PAGE_MEDICATIONS_CURRENT_LIST_DURATION)}
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          {medicationData.duration?.start && !isDashValue(medicationData.duration.start)
            ? DateUtil.formatDateOnly(medicationData.duration.start)
            : '-'}
          {' - '}
          {medicationData.duration?.end && !isDashValue(medicationData.duration.end)
            ? DateUtil.formatDateOnly(medicationData.duration.end)
            : '-'}
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={4} sx={fontStyle}>
          {t(Translation.MODAL_PRESCRIPTIONS_MEDICATION_QTY)}
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          {medicationData?.quantity}
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={4} sx={fontStyle}>
          {t(Translation.MODAL_PRESCRIPTIONS_REFILL)}
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          {medicationData?.refill}
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={4} sx={fontStyle}>
          {t(Translation.PAGE_PRESCRIPTIONS_LIST_REFILL_NOTES)}
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
          {medicationData?.refillNotes || '-'}
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={4} sx={fontStyle}>
          {t(Translation.PAGE_PRESCRIPTIONS_LIST_OTHER_DOCTOR_NOTES)}
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
          {medicationData?.doctorNotes || '-'}
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={4} sx={fontStyle}>
          {t(Translation.PAGE_MEDICATIONS_CURRENT_LIST_PRESCRIBER)}
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          {prescriber ?? medicationData?.prescriber ?? '-'}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ViewModeContent;
