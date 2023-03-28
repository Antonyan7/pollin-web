import React from 'react';
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

const PatientContactInformationEditForm = () => (
  <>
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
  </>
);

export default PatientContactInformationEditForm;
