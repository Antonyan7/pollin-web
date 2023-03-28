/* eslint-disable no-restricted-syntax */
import { DropdownOptionType, IDropdown, IDropdownOption } from '@axios/patientEmr/managerPatientEmrTypes';
import CurrentOccupation from '@components/MedicalBackground/Contact/PatientBackgroundInformation/view/fields/CurrentOccupation';
import DateOfBirth from '@components/MedicalBackground/Contact/PatientBackgroundInformation/view/fields/DateOfBirth';
import FamilyPhysician from '@components/MedicalBackground/Contact/PatientBackgroundInformation/view/fields/FamilyPhysician';
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
import { Translation } from 'constants/translations';
import { t } from 'i18next';

import { AddressProps } from '../../../manager/patientEmr/managerPatientEmrTypes';
import Age from '../Contact/PatientBackgroundInformation/view/fields/Age';
import CancerPatient from '../Contact/PatientBackgroundInformation/view/fields/CancerPatient';
import Gender from '../Contact/PatientBackgroundInformation/view/fields/Gender';
import RelationshipStatus from '../Contact/PatientBackgroundInformation/view/fields/RelationshipStatus';

export const defineSingleFieldValue = (fieldType?: boolean) => {
  switch (fieldType) {
    case fieldType:
      return t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_CONSULTATION_YES);
    case !fieldType:
      return t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_CONSULTATION_NO);
    default:
      return '-';
  }
};

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

  return options.find((option: IDropdownOption) => option.id === optionId);
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
  { Component: FamilyPhysician }
];
