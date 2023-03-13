import React from 'react';
import { FormSubmit } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form/actions';
import {
  ActiveConsults,
  AdditionalInformation,
  AlcoholUse,
  CigarettesUse,
  Diet,
  DrugAllergies,
  FamilyHistory,
  FieldBmi,
  FieldHeight,
  FieldWeight,
  FoodAllergies,
  IodineAllergy,
  LatexAllergy,
  MarijuanaUse,
  OtherMedicalProblems,
  PastSurgeries,
  ProblemWithAnesthetics,
  RecreationalDrugs,
  RegularExecise,
  SeeingTherapist,
  StdHistory,
  StressLevel,
  VitaminSupplements
} from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form/fields';
import { dispatch } from '@redux/hooks';
import { patientsMiddleware } from '@redux/slices/patients';

const PatientGeneralHealthEditForm = () => {
  const onCancelClick = () => {
    dispatch(patientsMiddleware.changeEditButtonClickState());
  };

  return (
    <>
      <FieldHeight />
      <FieldWeight />
      <FieldBmi />
      <OtherMedicalProblems />
      <PastSurgeries />
      <ProblemWithAnesthetics />
      <VitaminSupplements />
      <DrugAllergies />
      <FoodAllergies />
      <IodineAllergy />
      <LatexAllergy />
      <CigarettesUse />
      <AlcoholUse />
      <MarijuanaUse />
      <RecreationalDrugs />
      <RegularExecise />
      <StressLevel />
      <SeeingTherapist />
      <FamilyHistory />
      <StdHistory />
      <Diet />
      <ActiveConsults />
      <AdditionalInformation />
      <FormSubmit onClick={onCancelClick} />
    </>
  );
};

export default PatientGeneralHealthEditForm;
