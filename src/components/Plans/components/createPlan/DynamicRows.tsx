import React from 'react';
import FormInput from '@components/common/Form/FormInput';
import RouteField from '@components/Medications/layout/Medications/MedicationList/edit/fields/Route';
import DrugNameField from '@components/Modals/Medications/AddPatientMedicationModal/form/fields/DrugName';
import RefillField from '@components/Modals/Medications/AddPatientPrescriptionModal/form/MedicationCard/fields/Refill';
import { Grid } from '@mui/material';
import { Translation } from 'constants/translations';
import { t } from 'i18next';
import { paddings } from 'themes/themeConstants';

export const FirstDynamicRow = (index: number, parentFieldName: string) => (
  <Grid xs={12} py={paddings.topBottom4} px={paddings.leftRight4} display="flex" key={index}>
    <DrugNameField
      fieldLabel={t(Translation.PAGE_PATIENT_PLANS_CREATE_MEDICATIONS_DRUG_NAME) ?? ''}
      fieldName={`${parentFieldName}.${index}.medicationId`}
    />
  </Grid>
);

export const SecondDynamicRow = (index: number, parentFieldName: string) => (
  <Grid
    xs={12}
    py={paddings.topBottom4}
    px={paddings.leftRight4}
    display="flex"
    justifyContent="space-between"
    key={index}
  >
    <Grid xs={5.9}>
      <FormInput
        fieldName={`${parentFieldName}.${index}.dosage`}
        label={t(Translation.PAGE_PATIENT_PLANS_CREATE_MEDICATIONS_DOSAGE)}
      />
    </Grid>
    <Grid xs={5.9}>
      <RouteField fieldName={`${parentFieldName}.${index}.route`} />
    </Grid>
  </Grid>
);

export const ThirdDynamicRow = (index: number, parentFieldName: string) => (
  <Grid xs={12} py={paddings.topBottom4} px={paddings.leftRight4} display="flex" justifyContent="space-between">
    <Grid xs={5.9}>
      <FormInput
        fieldName={`${parentFieldName}.${index}.quantity`}
        label={t(Translation.PAGE_PATIENT_PLANS_CREATE_MEDICATIONS_QTY)}
      />
    </Grid>
    <Grid xs={5.9}>
      <RefillField fieldName={`${parentFieldName}.${index}.refill`} />
    </Grid>
  </Grid>
);
