import { DropdownOptionType, TypeOfPregnancy, TypeOfPregnancyLabel } from '@axios/patientEmr/managerPatientEmrTypes';

const mappingPattern = {
  [TypeOfPregnancy.FullTerm]: {
    year: {
      dropdownType: DropdownOptionType.YearOfBirth,
      label: 'Year of Birth'
    },
    type: {
      dropdownType: DropdownOptionType.VOrCs,
      label: 'Vaginal/C-Section'
    },
    birthOutcome: {
      dropdownType: DropdownOptionType.BirthOutcome,
      label: 'Birth Outcome'
    },
    monthsToConceive: {
      dropdownType: DropdownOptionType.MonthsToConceive,
      label: 'Months to Conceive'
    }
  },
  [TypeOfPregnancy.Preterm]: {
    year: {
      dropdownType: DropdownOptionType.YearOfBirth,
      label: 'Year of Birth'
    },
    type: {
      dropdownType: DropdownOptionType.VOrCs,
      label: 'Vaginal/C-Section'
    },
    birthOutcome: {
      dropdownType: DropdownOptionType.BirthOutcome,
      label: 'Birth Outcome'
    },
    monthsToConceive: {
      dropdownType: DropdownOptionType.MonthsToConceive,
      label: 'Months to Conceive'
    }
  },
  [TypeOfPregnancy.EctopicTubal]: {
    year: {
      dropdownType: DropdownOptionType.YearOfBirth,
      label: 'Year of Birth'
    },
    type: {
      dropdownType: DropdownOptionType.EctopicPregnancyTreatment,
      label: 'Treatment'
    },
    location: {
      dropdownType: DropdownOptionType.PregnancySide,
      label: 'L/R Side'
    },
    monthsToConceive: {
      dropdownType: DropdownOptionType.MonthsToConceive,
      label: 'Months to Conceive'
    }
  },
  [TypeOfPregnancy.Miscarriage]: {
    year: {
      dropdownType: DropdownOptionType.YearOfBirth,
      label: 'Year of Birth'
    },
    type: {
      dropdownType: DropdownOptionType.EctopicPregnancyTreatment,
      label: 'Treatment'
    },
    monthsToConceive: {
      dropdownType: DropdownOptionType.MonthsToConceive,
      label: 'Months to Conceive'
    }
  },
  [TypeOfPregnancy.ElectiveTermination]: {
    year: {
      dropdownType: DropdownOptionType.YearOfBirth,
      label: 'Year of Birth'
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
