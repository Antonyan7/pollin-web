import React from 'react';
import FormSubmit from '@components/MedicalBackground/components/common/FormSubmit';
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
import { dispatch } from '@redux/hooks';
import { patientsMiddleware } from '@redux/slices/patients';
import { paddings } from 'themes/themeConstants';

const PatientBackgroundInformationEditForm = () => {
  const onCancelClick = () => {
    dispatch(patientsMiddleware.changePatientBackgroundEditButtonState());
  };

  return (
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
      <FormSubmit onClick={onCancelClick} />
    </Grid>
  );
};

export default PatientBackgroundInformationEditForm;
