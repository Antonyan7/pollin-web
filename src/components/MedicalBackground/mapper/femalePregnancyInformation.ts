import { DropdownOptionType, TypeOfPregnancy, TypeOfPregnancyLabel } from '@axios/patientEmr/managerPatientEmrTypes';
import { Translation } from 'constants/translations';
import { t } from 'i18next';

const mappingPattern = {
  [TypeOfPregnancy.FullTerm]: {
    year: {
      dropdownType: DropdownOptionType.YearOfBirth,
      label: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_YEAR_OF_BIRTH
      )
    },
    type: {
      dropdownType: DropdownOptionType.VOrCs,
      label: t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_V_CS)
    },
    birthOutcome: {
      dropdownType: DropdownOptionType.BirthOutcome,
      label: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_BIRTH_OUTCOME
      )
    },
    monthsToConceive: {
      dropdownType: DropdownOptionType.MonthsToConceive,
      label: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_MONTHS_TO_CONCEIVE
      )
    }
  },
  [TypeOfPregnancy.Preterm]: {
    year: {
      dropdownType: DropdownOptionType.YearOfBirth,
      label: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_YEAR_OF_BIRTH
      )
    },
    type: {
      dropdownType: DropdownOptionType.VOrCs,
      label: t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_V_CS)
    },
    birthOutcome: {
      dropdownType: DropdownOptionType.BirthOutcome,
      label: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_BIRTH_OUTCOME
      )
    },
    monthsToConceive: {
      dropdownType: DropdownOptionType.MonthsToConceive,
      label: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_MONTHS_TO_CONCEIVE
      )
    }
  },
  [TypeOfPregnancy.EctopicTubal]: {
    year: {
      dropdownType: DropdownOptionType.YearOfBirth,
      label: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_YEAR_OF_BIRTH
      )
    },
    type: {
      dropdownType: DropdownOptionType.EctopicPregnancyTreatment,
      label: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_TREATMENTS
      )
    },
    location: {
      dropdownType: DropdownOptionType.PregnancySide,
      label: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_L_R_SIDE
      )
    },
    monthsToConceive: {
      dropdownType: DropdownOptionType.MonthsToConceive,
      label: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_MONTHS_TO_CONCEIVE
      )
    }
  },
  [TypeOfPregnancy.Miscarriage]: {
    year: {
      dropdownType: DropdownOptionType.YearOfBirth,
      label: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_YEAR_OF_BIRTH
      )
    },
    type: {
      dropdownType: DropdownOptionType.EctopicPregnancyTreatment,
      label: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_TREATMENTS
      )
    },
    monthsToConceive: {
      dropdownType: DropdownOptionType.MonthsToConceive,
      label: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_MONTHS_TO_CONCEIVE
      )
    }
  },
  [TypeOfPregnancy.ElectiveTermination]: {
    year: {
      dropdownType: DropdownOptionType.YearOfBirth,
      label: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_YEAR_OF_BIRTH
      )
    }
  }
} as Record<
  string,
  Record<
    string,
    {
      dropdownType: DropdownOptionType;
      label: string;
    }
  >
>;

export const typeOfPregnancyLabels = {
  [`${TypeOfPregnancy.FullTerm}`]: TypeOfPregnancyLabel.FullTerm,
  [`${TypeOfPregnancy.Preterm}`]: TypeOfPregnancyLabel.Preterm,
  [`${TypeOfPregnancy.EctopicTubal}`]: TypeOfPregnancyLabel.EctopicTubal,
  [`${TypeOfPregnancy.Miscarriage}`]: TypeOfPregnancyLabel.Miscarriage,
  [`${TypeOfPregnancy.ElectiveTermination}`]: TypeOfPregnancyLabel.ElectiveTermination
};

export default mappingPattern;
