import React from 'react';
import { PrescriptionsMedicationsProps } from '@axios/patientEmr/managerPatientEmrTypes';
import { Grid, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import { t } from 'i18next';
import { paddings } from 'themes/themeConstants';

interface ViewModeContentProps {
  prescription: PrescriptionsMedicationsProps;
  prescriber: string;
}

const ViewModeContent = ({ prescription, prescriber }: ViewModeContentProps) => {
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
        pb: paddings.bottom16
      }}
    >
      <Grid container item xs={12}>
        <Grid item xs={0.5} />
        <Grid item xs={4} sx={fontStyle}>
          {t(Translation.PAGE_MEDICATIONS_CURRENT_LIST_DOSAGE)}
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          {prescription.dosage}
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={0.5} />
        <Grid item xs={4} sx={fontStyle}>
          {t(Translation.PAGE_MEDICATIONS_CURRENT_LIST_ROUTE)}
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          {prescription.route}
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={0.5} />
        <Grid item xs={4} sx={fontStyle}>
          {t(Translation.PAGE_MEDICATIONS_CURRENT_LIST_FREQUENCY)}
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          {prescription.frequency}
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={0.5} />
        <Grid item xs={4} sx={fontStyle}>
          {t(Translation.PAGE_MEDICATIONS_CURRENT_LIST_TIME)}
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          {prescription.time ?? '--'}
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={0.5} />
        <Grid item xs={4} sx={fontStyle}>
          {t(Translation.PAGE_MEDICATIONS_CURRENT_LIST_DURATION)}
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          {`${prescription.duration.start} - ${prescription.duration.end}`}
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={0.5} />
        <Grid item xs={4} sx={fontStyle}>
          {t(Translation.MODAL_PRESCRIPTIONS_MEDICATION_QTY)}
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          {prescription.quantity}
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={0.5} />
        <Grid item xs={4} sx={fontStyle}>
          {t(Translation.MODAL_PRESCRIPTIONS_REFILL)}
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          {prescription.refill}
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={0.5} />
        <Grid item xs={4} sx={fontStyle}>
          {t(Translation.MODAL_PRESCRIPTIONS_REFILL_NOTES)}
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          {prescription?.refillNotes ?? '--'}
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={0.5} />
        <Grid item xs={4} sx={fontStyle}>
          {t(Translation.MODAL_PRESCRIPTIONS_OTHER_DOCTOR_NOTES)}
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          {prescription.doctorNotes}
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={0.5} />
        <Grid item xs={4} sx={fontStyle}>
          {t(Translation.PAGE_MEDICATIONS_CURRENT_LIST_PRESCRIBER)}
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          {prescriber ?? '--'}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ViewModeContent;
