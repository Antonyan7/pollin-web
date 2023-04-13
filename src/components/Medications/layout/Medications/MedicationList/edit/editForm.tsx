import React from 'react';
import { MedicationsProps } from '@axios/patientEmr/managerPatientEmrTypes';
import { Grid, Typography, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import { t } from 'i18next';
import { paddings } from 'themes/themeConstants';

import DateField from './fields/DateField';
import DosageField from './fields/Dosage';
import DrugNameField from './fields/DrugName';
import FrequencyField from './fields/Frequency';
import PresciberField from './fields/Prescriber';
import RouteField from './fields/Route';
import TimeField from './fields/Time';
import ConfirmButton from './actions';
import { AddPatientMedicationFormField } from './initialValues';

interface ViewModeContentProps {
  medication: MedicationsProps;
}

const EditForm = ({ medication }: ViewModeContentProps) => {
  const theme = useTheme();

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      spacing={1}
      sx={{
        color: theme.palette.secondary[800],
        fontSize: theme.typography.pxToRem(15),
        pt: paddings.top16,
        pb: paddings.bottom16
      }}
    >
      <Grid container item xs={12}>
        <Grid item xs={0.5} />
        <Grid item xs={4}>
          <Typography variant="h5">{t(Translation.PAGE_MEDICATIONS_CURRENT_LIST_NAME)}</Typography>
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          {/* eslint-disable-next-line  @typescript-eslint/prefer-nullish-coalescing */}
          <DrugNameField drugName={medication.commonName || medication.title} />
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={0.5} />
        <Grid item xs={4}>
          <Typography variant="h5">{t(Translation.PAGE_MEDICATIONS_CURRENT_LIST_DURATION)}</Typography>
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid container item xs={6} justifyContent="space-between">
          <DateField
            fieldName={AddPatientMedicationFormField.StartDate}
            label={t(Translation.MODAL_ADD_PATIENT_MEDICATION_START_DATE)}
          />
          <DateField
            fieldName={AddPatientMedicationFormField.EndDate}
            label={t(Translation.MODAL_ADD_PATIENT_MEDICATION_END_DATE)}
          />
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={0.5} />
        <Grid item xs={4}>
          <Typography variant="h5">{t(Translation.PAGE_MEDICATIONS_CURRENT_LIST_DOSAGE)}</Typography>
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          <DosageField />
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={0.5} />
        <Grid item xs={4}>
          <Typography variant="h5">{t(Translation.PAGE_MEDICATIONS_CURRENT_LIST_FREQUENCY)}</Typography>
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          <FrequencyField />
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={0.5} />
        <Grid item xs={4}>
          <Typography variant="h5">{t(Translation.PAGE_MEDICATIONS_CURRENT_LIST_TIME)}</Typography>
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          <TimeField />
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={0.5} />
        <Grid item xs={4}>
          <Typography variant="h5">{t(Translation.PAGE_MEDICATIONS_CURRENT_LIST_ROUTE)}</Typography>
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          <RouteField />
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={0.5} />
        <Grid item xs={4}>
          <Typography variant="h5">{t(Translation.PAGE_MEDICATIONS_CURRENT_LIST_PRESCRIBER)}</Typography>
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6}>
          <PresciberField />
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={5} />

        <Grid item xs={6}>
          <ConfirmButton />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EditForm;
