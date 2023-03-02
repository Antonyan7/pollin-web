/* eslint-disable no-restricted-syntax */
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
  PatientAlerts,
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

// eslint-disable-next-line @typescript-eslint/ban-types
export type RecordedHealthType = Record<string, unknown>;

export const mergeObjects = <T extends RecordedHealthType, U extends RecordedHealthType>(
  newData: T,
  oldData: U
): T & U => {
  const result = { ...newData, ...oldData } as T & U;

  for (const key in oldData) {
    if (Object.prototype.hasOwnProperty.call(oldData, key)) {
      if (typeof oldData[key] === 'object' && oldData[key] !== null && !Array.isArray(oldData[key])) {
        result[key] = mergeObjects(newData[key] as RecordedHealthType, oldData[key] as RecordedHealthType) as (T &
          U)[Extract<keyof U, string>];
      } else {
        result[key as keyof T & keyof U] = oldData[key] as T[keyof T & string] & U[keyof U & string];
      }
    }
  }

  return result;
};

export interface GeneralHealthComponentsProps {
  componentIndex: number;
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
  { Component: PatientAlerts },
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
