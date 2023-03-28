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
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';

const PatientGeneralHealthEditForm = () => {
  const isGeneralHealthDataUpdating = useAppSelector(patientsSelector.isGeneralHealthDataUpdating);
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
      <FormSubmit onClick={onCancelClick} isLoading={isGeneralHealthDataUpdating} />
    </>
  );
};

export default PatientGeneralHealthEditForm;
