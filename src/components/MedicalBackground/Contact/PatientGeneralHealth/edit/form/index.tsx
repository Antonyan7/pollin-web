import React from 'react';
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

const PatientGeneralHealthEditForm = () => (
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
  </>
);

export default PatientGeneralHealthEditForm;
