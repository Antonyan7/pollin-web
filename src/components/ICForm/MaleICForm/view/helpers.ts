import { IGeneralHealthProps, IGenitourinaryHistory, IPharmacyAddress } from '@axios/patientEmr/managerPatientEmrTypes';
import { Translation } from 'constants/translations';
import { t } from 'i18next';

export const genitourinaryHistoryMapper = (genitourinaryHistory?: IGenitourinaryHistory) => {
  if (genitourinaryHistory) {
    return [
      {
        itemTitle: t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_PREVIOUS_CONCEPTION),
        item: genitourinaryHistory.previousConception.value,
        note: genitourinaryHistory.previousConception.note
      },
      {
        itemTitle: t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_BIOLOGICAL_CHILDREN),
        item: genitourinaryHistory.haveBiologicalChildren.value,
        note: genitourinaryHistory.haveBiologicalChildren.note
      },
      {
        itemTitle: t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_BIOLOGICAL_CHILDREN_WITH_PARTNER),
        item: genitourinaryHistory.biologicalChildrenWithPartner.value,
        note: genitourinaryHistory.biologicalChildrenWithPartner.note
      },
      {
        itemTitle: t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_PAST_SEMEN_ANALYSIS),
        item: genitourinaryHistory.hadSemenAnalysis.value,
        note: genitourinaryHistory.hadSemenAnalysis.note
      },
      {
        itemTitle: t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_ABNORMAL_RESULTS),
        item: genitourinaryHistory.semenAnalysisIsNormal.value,
        note: genitourinaryHistory.semenAnalysisIsNormal.note
      },
      {
        itemTitle: t(
          Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GENITOURINARY_HISTORY_FIELD_DIAGNOSED_CONDITIONS
        ),
        item: genitourinaryHistory.diagnosedConditions.items,
        note: genitourinaryHistory.diagnosedConditions.note
      },
      {
        itemTitle: t(
          Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GENITOURINARY_HISTORY_FIELD_VASECTOMY
        ),
        item: genitourinaryHistory.vasectomy.value,
        note: genitourinaryHistory.vasectomy.note
      },
      {
        itemTitle: t(
          Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GENITOURINARY_HISTORY_FIELD_VASECTOMY_REVERSAL
        ),
        item: genitourinaryHistory.vasectomyReversal.value,
        note: genitourinaryHistory.vasectomyReversal.note
      },
      {
        itemTitle: t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_DIFFICULTY_ERECTIONS),
        item: genitourinaryHistory.erectionDifficulties.value,
        note: genitourinaryHistory.erectionDifficulties.note
      }
    ];
  }

  return [];
};

export const generalHealthMapper = (generalHealth?: IGeneralHealthProps) => {
  if (generalHealth) {
    return [
      {
        itemTitle: t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_IODINE_ALLERGY),
        item: generalHealth.iodineAllergy.value,
        note: generalHealth.iodineAllergy.note
      },
      {
        itemTitle: t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_LATEX_ALLERGY),
        item: generalHealth.latexAllergy.value,
        note: generalHealth.latexAllergy.note
      },
      {
        itemTitle: t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_USE_CIGARETTES),
        item: generalHealth.smokeCigarettes.value,
        note: generalHealth.smokeCigarettes.note
      },
      {
        itemTitle: t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_USE_ALCOHOL),
        item: generalHealth.drinkAlcohol.value,
        note: generalHealth.drinkAlcohol.note
      },
      {
        itemTitle: t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_USE_MARIJUANA),
        item: generalHealth.useMarijuana.value,
        note: generalHealth.useMarijuana.note
      },
      {
        itemTitle: t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_USE_RECREATIONAL_DRUGS),
        item: generalHealth.recreationalDrugs.value,
        note: generalHealth.recreationalDrugs.note
      },
      {
        itemTitle: t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_REGULAR_EXERCISE),
        item: generalHealth.regularExercise.value,
        note: generalHealth.regularExercise.note
      },
      {
        itemTitle: t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_STRESS_LEVEL),
        item: generalHealth.currentStressLevel.value,
        note: generalHealth.currentStressLevel.note
      },
      {
        itemTitle: t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_SEEING_THERAPIST),
        item: generalHealth.seeingTherapist.value,
        note: generalHealth.seeingTherapist.note
      },
      {
        itemTitle: t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_FAMILY_HISTORY_PROBLEM),
        item: generalHealth.familyHistory.items,
        note: generalHealth.familyHistory.note
      },
      {
        itemTitle: t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_ADDITIONAL_INFORMATION),
        item: generalHealth.additionalInformation.value,
        note: generalHealth.additionalInformation.note
      }
    ];
  }

  return [];
};

export const getFullAddressForPharmacy = (pharmacyAddress?: IPharmacyAddress) => {
  let fullAddress = '';

  if (pharmacyAddress) {
    const { faxNumber, phoneNumber, ...otherAddresses } = pharmacyAddress;
    const arrayOfAddresses = Object.values(otherAddresses);
    const extractFalsyValues = arrayOfAddresses.filter((addressValue) => addressValue);

    fullAddress = extractFalsyValues.join(', ');
  }

  return fullAddress;
};
