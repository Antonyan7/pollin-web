import { DropdownOptionType, TypeOfPregnancy, TypeOfPregnancyLabel } from '@axios/patientEmr/managerPatientEmrTypes';
import { Translation } from 'constants/translations';
import { t } from 'i18next';

import { FlexibleItemType } from '../../common/Form/types';

const mappingPattern = {
  [TypeOfPregnancy.FullTerm]: {
    year: {
      componentData: {
        type: FlexibleItemType.Dropdown,
        dropdownType: DropdownOptionType.YearOfBirth
      },
      title: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_YEAR_OF_BIRTH
      )
    },
    type: {
      componentData: {
        type: FlexibleItemType.Dropdown,
        dropdownType: DropdownOptionType.VOrCs
      },
      title: t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_V_CS)
    },
    birthOutcome: {
      componentData: {
        type: FlexibleItemType.Dropdown,
        dropdownType: DropdownOptionType.BirthOutcome
      },
      title: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_BIRTH_OUTCOME
      )
    },
    monthsToConceive: {
      componentData: {
        type: FlexibleItemType.Dropdown,
        dropdownType: DropdownOptionType.MonthsToConceive
      },
      title: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_MONTHS_TO_CONCEIVE
      )
    }
  },
  [TypeOfPregnancy.Preterm]: {
    year: {
      componentData: {
        type: FlexibleItemType.Dropdown,
        dropdownType: DropdownOptionType.YearOfBirth
      },
      title: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_YEAR_OF_BIRTH
      )
    },
    type: {
      componentData: {
        type: FlexibleItemType.Dropdown,
        dropdownType: DropdownOptionType.VOrCs
      },
      title: t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_V_CS)
    },
    birthOutcome: {
      componentData: {
        type: FlexibleItemType.Dropdown,
        dropdownType: DropdownOptionType.BirthOutcome
      },
      title: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_BIRTH_OUTCOME
      )
    },
    monthsToConceive: {
      componentData: {
        type: FlexibleItemType.Dropdown,
        dropdownType: DropdownOptionType.MonthsToConceive
      },
      title: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_MONTHS_TO_CONCEIVE
      )
    }
  },
  [TypeOfPregnancy.EctopicTubal]: {
    year: {
      componentData: {
        type: FlexibleItemType.Dropdown,
        dropdownType: DropdownOptionType.YearOfBirth
      },
      title: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_YEAR_OF_BIRTH
      )
    },
    type: {
      componentData: {
        type: FlexibleItemType.Dropdown,
        dropdownType: DropdownOptionType.EctopicPregnancyTreatment
      },
      title: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_TREATMENTS
      )
    },
    location: {
      componentData: {
        type: FlexibleItemType.Dropdown,
        dropdownType: DropdownOptionType.PregnancySide
      },
      title: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_L_R_SIDE
      )
    },
    monthsToConceive: {
      componentData: {
        type: FlexibleItemType.Dropdown,
        dropdownType: DropdownOptionType.MonthsToConceive
      },
      title: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_MONTHS_TO_CONCEIVE
      )
    }
  },
  [TypeOfPregnancy.Miscarriage]: {
    year: {
      componentData: {
        type: FlexibleItemType.Dropdown,
        dropdownType: DropdownOptionType.YearOfBirth
      },
      title: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_YEAR_OF_BIRTH
      )
    },
    type: {
      componentData: {
        type: FlexibleItemType.Dropdown,
        dropdownType: DropdownOptionType.MissCarriagePregnancyTreatment
      },
      title: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_TREATMENTS
      )
    },
    monthsToConceive: {
      componentData: {
        type: FlexibleItemType.Dropdown,
        dropdownType: DropdownOptionType.MonthsToConceive
      },
      title: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_MONTHS_TO_CONCEIVE
      )
    }
  },
  [TypeOfPregnancy.ElectiveTermination]: {
    year: {
      componentData: {
        type: FlexibleItemType.Dropdown,
        dropdownType: DropdownOptionType.YearOfBirth
      },
      title: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_YEAR_OF_BIRTH
      )
    }
  }
} as Record<
  string,
  Record<
    string,
    {
      title: string;
      componentData?: {
        type: FlexibleItemType;
        dropdownType?: DropdownOptionType;
      };
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
