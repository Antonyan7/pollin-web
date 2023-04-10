import React from 'react';
import { MedicationsProps } from '@axios/patientEmr/managerPatientEmrTypes';
import { Grid, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import { t } from 'i18next';
import { paddings } from 'themes/themeConstants';

interface ViewModeContentProps {
  medication: MedicationsProps;
}

const ViewModeContent = ({ medication }: ViewModeContentProps) => {
  const theme = useTheme();
  const bgColor = { backgroundColor: theme.palette.secondary[200] };

  return (
    <Grid
      container
      alignItems="center"
      spacing={1}
      sx={{
        color: theme.palette.secondary[800],
        fontSize: theme.typography.pxToRem(15),
        pt: paddings.top16,
        pb: paddings.bottom16
      }}
    >
      <Grid container item xs={12} sx={bgColor}>
        <Grid item xs={0.5} />
        <Grid item xs={4}>
          {t(Translation.PAGE_MEDICATIONS_CURRENT_LIST_NAME)}
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          {/* eslint-disable-next-line  @typescript-eslint/prefer-nullish-coalescing */}
          {medication.commonName || medication.title}
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={0.5} />
        <Grid item xs={4}>
          {t(Translation.PAGE_MEDICATIONS_CURRENT_LIST_DURATION)}
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          {`${medication.duration.start} - ${medication.duration.end}`}
        </Grid>
      </Grid>

      <Grid container item xs={12} sx={bgColor}>
        <Grid item xs={0.5} />
        <Grid item xs={4}>
          {t(Translation.PAGE_MEDICATIONS_CURRENT_LIST_DOSAGE)}
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          {medication.dosage}
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={0.5} />
        <Grid item xs={4}>
          {t(Translation.PAGE_MEDICATIONS_CURRENT_LIST_FREQUENCY)}
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          {medication.frequency}
        </Grid>
      </Grid>

      <Grid container item xs={12} sx={bgColor}>
        <Grid item xs={0.5} />
        <Grid item xs={4} sx={bgColor}>
          {t(Translation.PAGE_MEDICATIONS_CURRENT_LIST_TIME)}
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          {medication.time ?? 'N/A'}
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={0.5} />
        <Grid item xs={4}>
          {t(Translation.PAGE_MEDICATIONS_CURRENT_LIST_ROUTE)}
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          {medication.route}
        </Grid>
      </Grid>

      <Grid container item xs={12} sx={bgColor}>
        <Grid item xs={0.5} />
        <Grid item xs={4}>
          {t(Translation.PAGE_MEDICATIONS_CURRENT_LIST_PRESCRIBER)}
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          {medication.prescriber ?? 'N/A'}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ViewModeContent;
