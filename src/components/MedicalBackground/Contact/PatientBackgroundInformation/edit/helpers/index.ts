import { IPatientBackgroundPartners } from '@axios/patientEmr/managerPatientEmrTypes';

import { BackgroundInformationFormFields } from '../types';

export const getBackgroundInformationEmptyState = (backgroundInformation: IPatientBackgroundPartners) => ({
  [BackgroundInformationFormFields.SexAtBirth]: backgroundInformation.sexAtBirth,
  [BackgroundInformationFormFields.CancerPatient]: backgroundInformation.cancerPatient,
  [BackgroundInformationFormFields.Gender]: backgroundInformation.gender,
  [BackgroundInformationFormFields.SexualOrientation]: backgroundInformation.sexualOrientation,
  [BackgroundInformationFormFields.PreferredPronouns]: backgroundInformation.preferredPronouns,
  [BackgroundInformationFormFields.Relationship]: backgroundInformation.relationship,
  [BackgroundInformationFormFields.DateOfBirth]: backgroundInformation.dateOfBirth,
  [BackgroundInformationFormFields.Age]: backgroundInformation.age,
  [BackgroundInformationFormFields.CurrentOccupation]: backgroundInformation.currentOccupation,
  [BackgroundInformationFormFields.ReferringDoctor]: {
    ...backgroundInformation.referringDoctor,
    value: backgroundInformation?.referringDoctor?.value ?? false,
    name: backgroundInformation?.referringDoctor?.name ?? ''
  },
  [BackgroundInformationFormFields.FamilyDoctor]: {
    ...backgroundInformation.familyDoctor,
    value: backgroundInformation?.familyDoctor?.value ?? false,
    name: backgroundInformation?.familyDoctor?.name ?? ''
  },
  [BackgroundInformationFormFields.Pharmacy]: {
    ...backgroundInformation.pharmacy,
    value: backgroundInformation?.pharmacy?.exists ?? false,
    name: backgroundInformation?.pharmacy?.name ?? '',
    address: {
      ...backgroundInformation?.pharmacy?.address,
      street: backgroundInformation?.pharmacy?.address?.street,
      unit: backgroundInformation?.pharmacy?.address?.unit,
      city: backgroundInformation?.pharmacy?.address?.city,
      postalCode: backgroundInformation?.pharmacy?.address?.postalCode,
      country: backgroundInformation?.pharmacy?.address?.country,
      faxNumber: backgroundInformation?.pharmacy?.address?.faxNumber,
      phoneNumber: backgroundInformation?.pharmacy?.address?.phoneNumber
    }
  }
});
