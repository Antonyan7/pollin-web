/* eslint-disable no-restricted-syntax */
import { DropdownOptionType, IDropdown, IDropdownOption } from '@axios/patientEmr/managerPatientEmrTypes';
import CurrentOccupation from '@components/MedicalBackground/Contact/PatientBackgroundInformation/view/fields/CurrentOccupation';
import DateOfBirth from '@components/MedicalBackground/Contact/PatientBackgroundInformation/view/fields/DateOfBirth';
import FamilyPhysician from '@components/MedicalBackground/Contact/PatientBackgroundInformation/view/fields/FamilyPhysician';
import Pharmacy from '@components/MedicalBackground/Contact/PatientBackgroundInformation/view/fields/Pharmacy';
import PhysicianName from '@components/MedicalBackground/Contact/PatientBackgroundInformation/view/fields/PhysicianName';
import Pronouns from '@components/MedicalBackground/Contact/PatientBackgroundInformation/view/fields/Pronouns';
import SexAtBirth from '@components/MedicalBackground/Contact/PatientBackgroundInformation/view/fields/SexAtBirth';
import SexualOrientation from '@components/MedicalBackground/Contact/PatientBackgroundInformation/view/fields/SexualOrientation';
import {
  EmailAddress,
  MailingAddress,
  MostResponsiblePhysician,
  OHIP,
  PatientIdentifier,
  PatientName,
  PatientPreferredName,
  PhoneNumber,
  PrimaryAddress,
  PrimaryPatientContribution
} from '@components/MedicalBackground/Contact/PatientContactInformation/view/fields';
import {
  ActiveConsults,
  AdditionalInformation,
  BMI,
  Diet,
  DrugAllergy,
  FamilyHistory,
  FoodAllergy,
  Height,
  IodineAllergy,
  LatexAllergy,
  OtherMedicalProblems,
  PastSurgery,
  ProblemAnesthetics,
  RegularExercise,
  SeeingTherapist,
  STDHistory,
  StressLevel,
  UseAlcohol,
  UseCigarettes,
  UseMarijuana,
  UseRecreationalDrugs,
  VitaminSupplements,
  Weight
} from '@components/MedicalBackground/Contact/PatientGeneralHealth/view/fields';
import BiologicalChildren from '@components/MedicalBackground/MedicalHistory/MaleGenitourinaryHistory/view/fields/BiologicalChildren';
import BiologicalChildrenWithCurrentPartner from '@components/MedicalBackground/MedicalHistory/MaleGenitourinaryHistory/view/fields/BiologicalChildrenWithCurrentPartner';
import DiagnosedConditions from '@components/MedicalBackground/MedicalHistory/MaleGenitourinaryHistory/view/fields/DiagnosedConditions';
import ErectionDifficulties from '@components/MedicalBackground/MedicalHistory/MaleGenitourinaryHistory/view/fields/DifficultyWithErections';
import GenitalSurgery from '@components/MedicalBackground/MedicalHistory/MaleGenitourinaryHistory/view/fields/GenitalSurgery';
import Infections from '@components/MedicalBackground/MedicalHistory/MaleGenitourinaryHistory/view/fields/Infections';
import PastSemenAnalysis from '@components/MedicalBackground/MedicalHistory/MaleGenitourinaryHistory/view/fields/PastSemenAnalysis';
import PreviousConception from '@components/MedicalBackground/MedicalHistory/MaleGenitourinaryHistory/view/fields/PreviousConception';
import TesticularIssues from '@components/MedicalBackground/MedicalHistory/MaleGenitourinaryHistory/view/fields/TesticularIssues';
import Toxins from '@components/MedicalBackground/MedicalHistory/MaleGenitourinaryHistory/view/fields/Toxins';
import UndescendedTesticals from '@components/MedicalBackground/MedicalHistory/MaleGenitourinaryHistory/view/fields/UndescendedTesticals';
import Vasectomy from '@components/MedicalBackground/MedicalHistory/MaleGenitourinaryHistory/view/fields/Vasectomy';
import VasectomyReversal from '@components/MedicalBackground/MedicalHistory/MaleGenitourinaryHistory/view/fields/VasectomyReversal';
import { Translation } from 'constants/translations';
import { t } from 'i18next';

import { AddressProps } from '../../../manager/patientEmr/managerPatientEmrTypes';
import Age from '../Contact/PatientBackgroundInformation/view/fields/Age';
import CancerPatient from '../Contact/PatientBackgroundInformation/view/fields/CancerPatient';
import Gender from '../Contact/PatientBackgroundInformation/view/fields/Gender';
import RelationshipStatus from '../Contact/PatientBackgroundInformation/view/fields/RelationshipStatus';
import AbnormalResults from '../MedicalHistory/MaleGenitourinaryHistory/view/fields/AbnormalResults';

export const defineSingleFieldValue = (fieldType?: boolean) =>
  fieldType
    ? t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_CONSULTATION_YES)
    : t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_CONSULTATION_NO);

export interface GeneralHealthComponentsProps {
  componentIndex?: number;
}

export const generalHealthRows = [
  { Component: Height },
  { Component: Weight },
  { Component: BMI },
  { Component: OtherMedicalProblems },
  { Component: PastSurgery },
  { Component: ProblemAnesthetics },
  { Component: VitaminSupplements },
  { Component: DrugAllergy },
  { Component: FoodAllergy },
  { Component: IodineAllergy },
  { Component: LatexAllergy },
  { Component: UseCigarettes },
  { Component: UseAlcohol },
  { Component: UseMarijuana },
  { Component: UseRecreationalDrugs },
  { Component: RegularExercise },
  { Component: StressLevel },
  { Component: SeeingTherapist },
  { Component: FamilyHistory },
  { Component: STDHistory },
  { Component: Diet },
  { Component: ActiveConsults },
  { Component: AdditionalInformation }
];

export const getDropdownByType = (dropdowns: IDropdown[], dropdownType: DropdownOptionType | string) =>
  dropdowns.find((dropdown) => dropdown.type === dropdownType);

export const getDropdownOption = (dropdowns: IDropdown[], dropdownType: string, optionId: string) => {
  const dropdown = getDropdownByType(dropdowns, dropdownType) as IDropdown;
  const { options = [] } = dropdown ?? {};

  return options.find((option: IDropdownOption) => `${option.id}` === `${optionId}`);
};

export const getFullAddress = (address?: AddressProps) => {
  let fullAddress = '';

  if (address) {
    const { note, isEditable, ...addresses } = address;
    const arrayOfAddresses = Object.values(addresses);
    const extractFalsyValues = arrayOfAddresses.filter((addressValue) => addressValue);

    fullAddress = extractFalsyValues.join(', ');
  }

  return fullAddress;
};

export const contactInformationRows = [
  { Component: PatientIdentifier },
  { Component: PatientName },
  { Component: PatientPreferredName },
  { Component: PrimaryPatientContribution },
  { Component: PrimaryAddress },
  { Component: MailingAddress },
  { Component: EmailAddress },
  { Component: PhoneNumber },
  { Component: OHIP },
  { Component: MostResponsiblePhysician }
];

export const backgroundInformationRows = [
  { Component: SexAtBirth },
  { Component: CancerPatient },
  { Component: Gender },
  { Component: SexualOrientation },
  { Component: Pronouns },
  { Component: RelationshipStatus },
  { Component: DateOfBirth },
  { Component: Age },
  { Component: CurrentOccupation },
  { Component: PhysicianName },
  { Component: FamilyPhysician },
  { Component: Pharmacy }
];

export const genitourinaryRows = [
  { Component: PreviousConception },
  { Component: BiologicalChildren },
  { Component: BiologicalChildrenWithCurrentPartner },
  { Component: PastSemenAnalysis },
  { Component: AbnormalResults },
  { Component: DiagnosedConditions },
  { Component: Vasectomy },
  { Component: VasectomyReversal },
  { Component: ErectionDifficulties },
  { Component: UndescendedTesticals },
  { Component: TesticularIssues },
  { Component: Toxins },
  { Component: Infections },
  { Component: GenitalSurgery }
];

export const isDashString = (value?: string) => value === '-';
export const isNullValue = (value?: string | boolean) => value === null;
export const nonValidProperty = (value?: string | boolean) => isNullValue(value) || typeof value === 'undefined';
