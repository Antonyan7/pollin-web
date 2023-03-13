import React from 'react';
import FormSubmit from '@components/MedicalBackground/components/common/FormSubmit';
import { SamePrimaryAddressProvider } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/context/SamePrimaryAddressContext';
import {
  FieldEmailAddress,
  FieldMailingAddress,
  FieldOHIP,
  FieldPatientContribution,
  FieldPatientID,
  FieldPatientName,
  FieldPhoneNumber,
  FieldPreferredName,
  FieldPrimaryAddress,
  FieldResponsiblePhysician
} from '@components/MedicalBackground/Contact/PatientContactInformation/edit/form/fields';
import { Grid } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { patientsMiddleware } from '@redux/slices/patients';
import { paddings } from 'themes/themeConstants';

const PatientContactInformationEditForm = () => {
  const onCancelClick = () => {
    dispatch(patientsMiddleware.changeContactInformationEditButtonState());
  };

  return (
    <Grid sx={{ py: paddings.topBottom32 }}>
      <SamePrimaryAddressProvider>
        <FieldPatientID />
        <FieldPatientName />
        <FieldPreferredName />
        <FieldPatientContribution />
        <FieldPrimaryAddress />
        <FieldMailingAddress />
        <FieldEmailAddress />
        <FieldPhoneNumber />
        <FieldOHIP />
        <FieldResponsiblePhysician />
        <FormSubmit onClick={onCancelClick} />
      </SamePrimaryAddressProvider>
    </Grid>
  );
};

export default PatientContactInformationEditForm;
