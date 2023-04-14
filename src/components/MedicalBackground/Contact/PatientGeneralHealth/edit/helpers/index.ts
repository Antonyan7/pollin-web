import { HeightProps, IGeneralHealthProps } from '@axios/patientEmr/managerPatientEmrTypes';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { isDashString } from '@components/MedicalBackground/helpers';

export const MedicalContextState = {
  move: () => {},
  fields: [],
  swap(): void {},
  prepend(): void {},
  append(): void {},
  remove(): void {},
  insert(): void {},
  update(): void {},
  replace(): void {}
};

export const getDefaultHealthState = (heightData: HeightProps) => ({
  ...heightData,
  feet: heightData?.feet ?? 0,
  inches: heightData?.inches ?? 0
});

export const getGeneralHealthEditFormState = (generalHealthData: IGeneralHealthProps) => ({
  [GeneralHealthFormFields.Height]: getDefaultHealthState(generalHealthData?.height as HeightProps),
  [GeneralHealthFormFields.Weigth]: {
    ...generalHealthData?.weightInLbs,
    value: generalHealthData?.weightInLbs.value
  },
  [GeneralHealthFormFields.Bmi]: {
    ...generalHealthData?.bmi,
    value: generalHealthData?.bmi.value
  },
  [GeneralHealthFormFields.MedicalProblems]: {
    ...generalHealthData?.medicalProblems,
    exists: generalHealthData?.medicalProblems.exists,
    items: generalHealthData?.medicalProblems.items
  },
  [GeneralHealthFormFields.PastSurgeries]: {
    ...generalHealthData?.pastSurgeries,
    exists: generalHealthData?.pastSurgeries.exists,
    items: generalHealthData?.pastSurgeries.items
  },
  [GeneralHealthFormFields.ProblemWithAnesthetics]: {
    ...generalHealthData?.problemWithAnesthetics,
    value: generalHealthData?.problemWithAnesthetics.value
  },
  [GeneralHealthFormFields.VitaminSupplements]: {
    ...generalHealthData?.vitaminSupplements,
    items: generalHealthData?.vitaminSupplements.items
  },
  [GeneralHealthFormFields.DrugAllergies]: {
    ...generalHealthData?.drugAllergies,
    items: generalHealthData?.drugAllergies.items
  },
  [GeneralHealthFormFields.FoodAllergies]: {
    ...generalHealthData?.foodAllergies,
    items: generalHealthData?.foodAllergies.items
  },
  [GeneralHealthFormFields.IodineAllergy]: {
    ...generalHealthData?.iodineAllergy,
    value: generalHealthData?.iodineAllergy.value
  },
  [GeneralHealthFormFields.LatexAllergy]: {
    ...generalHealthData?.latexAllergy,
    value: generalHealthData?.latexAllergy.value
  },
  [GeneralHealthFormFields.SmokeCigarettes]: {
    ...generalHealthData?.smokeCigarettes,
    value: generalHealthData?.smokeCigarettes.value
  },
  [GeneralHealthFormFields.DrinkAlcohol]: {
    ...generalHealthData?.drinkAlcohol,
    value: generalHealthData?.drinkAlcohol.value
  },
  [GeneralHealthFormFields.UseMarijuana]: {
    ...generalHealthData?.useMarijuana,
    value: generalHealthData?.useMarijuana.value
  },
  [GeneralHealthFormFields.RecreationalDrugs]: {
    ...generalHealthData?.recreationalDrugs,
    value: generalHealthData?.recreationalDrugs.value
  },
  [GeneralHealthFormFields.RegularExercise]: {
    ...generalHealthData?.regularExercise,
    value: generalHealthData?.regularExercise.value
  },
  [GeneralHealthFormFields.SeeingTherapist]: {
    ...generalHealthData?.seeingTherapist,
    value: generalHealthData?.seeingTherapist.value
  },
  [GeneralHealthFormFields.CurrentStressLevel]: {
    ...generalHealthData?.currentStressLevel,
    value: generalHealthData?.currentStressLevel.value
  },
  [GeneralHealthFormFields.FamilyHistory]: {
    ...generalHealthData?.familyHistory,
    exists: generalHealthData?.familyHistory.exists,
    items: generalHealthData?.familyHistory.items
  },
  [GeneralHealthFormFields.StdHistory]: {
    ...generalHealthData?.stdHistory,
    value: generalHealthData?.stdHistory.value
  },
  [GeneralHealthFormFields.Diet]: {
    ...generalHealthData?.diet,
    value: isDashString(generalHealthData?.diet.value) ? '' : generalHealthData?.diet.value
  },
  [GeneralHealthFormFields.ActiveConsultsList]: {
    ...generalHealthData?.activeConsultsList,
    value: generalHealthData?.activeConsultsList.value
  },
  [GeneralHealthFormFields.AdditionalInformation]: {
    ...generalHealthData?.additionalInformation,
    value: isDashString(generalHealthData?.additionalInformation.value)
      ? ''
      : generalHealthData?.additionalInformation.value
  },
  [GeneralHealthFormFields.CurrentPrescribedMedications]: generalHealthData?.currentPrescribedMedications
});

export const witoutZero = /[^0].*/;
