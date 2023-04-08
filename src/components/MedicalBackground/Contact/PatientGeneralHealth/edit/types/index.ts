export interface MedicalFormRadioProps {
  fieldName: string;
  onChangeState?: (state: boolean) => void;
}

export enum MedicalFormRadioValues {
  Yes = 'Yes',
  No = 'No'
}

export interface DiagramTitleProps {
  titleIndex: number;
}

export interface MedicalDatePickerFieldProps {
  label: string;
  value: Date | null;
  onChange: (value: React.SetStateAction<string | Date | null>) => void;
  isError?: boolean;
  errorHelperText?: string;
}

export enum GeneralHealthFormFields {
  Height = 'height',
  Weigth = 'weightInLbs',
  Bmi = 'bmi',
  MedicalProblems = 'medicalProblems',
  PastSurgeries = 'pastSurgeries',
  ProblemWithAnesthetics = 'problemWithAnesthetics',
  VitaminSupplements = 'vitaminSupplements',
  DrugAllergies = 'drugAllergies',
  FoodAllergies = 'foodAllergies',
  IodineAllergy = 'iodineAllergy',
  LatexAllergy = 'latexAllergy',
  SmokeCigarettes = 'smokeCigarettes',
  DrinkAlcohol = 'drinkAlcohol',
  UseMarijuana = 'useMarijuana',
  RecreationalDrugs = 'recreationalDrugs',
  RegularExercise = 'regularExercise',
  CurrentStressLevel = 'currentStressLevel',
  SeeingTherapist = 'seeingTherapist',
  FamilyHistory = 'familyHistory',
  StdHistory = 'stdHistory',
  Diet = 'diet',
  ActiveConsultsList = 'activeConsultsList',
  AdditionalInformation = 'additionalInformation',
  CurrentPrescribedMedications = 'currentPrescribedMedications'
}

export const familyMemberTypes = ['Mother', 'Father', 'Sibling', 'MaternalGrandparent', 'PaternalGrandparent'];
