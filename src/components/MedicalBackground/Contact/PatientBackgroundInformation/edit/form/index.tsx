import React from 'react';
import {
  FieldAge,
  FieldCancerPatient,
  FieldCurrentOccupation,
  FieldDateOfBirth,
  FieldFamilyDoctor,
  FieldGender,
  FieldPronouns,
  FieldReferringDoctor,
  FieldSexAtBirth,
  FieldSexualOrientation,
  RelationshipStatus
} from '@components/MedicalBackground/Contact/PatientBackgroundInformation/edit/form/fields';
import { Grid } from '@mui/material';
import { paddings } from 'themes/themeConstants';

const PatientBackgroundInformationEditForm = () => (
    <Grid sx={{ py: paddings.topBottom32 }}>
      <FieldSexAtBirth />
      <FieldCancerPatient />
      <FieldGender />
      <FieldSexualOrientation />
      <FieldPronouns />
      <RelationshipStatus />
      <FieldDateOfBirth />
      <FieldAge />
      <FieldCurrentOccupation />
      <FieldReferringDoctor />
      <FieldFamilyDoctor />
    </Grid>
  );

export default PatientBackgroundInformationEditForm;
