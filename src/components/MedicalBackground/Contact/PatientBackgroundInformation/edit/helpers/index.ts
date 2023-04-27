import {
  IFamilyDoctor,
  IPatientBackgroundPartners,
  IPharmacy,
  IReferringDoctor
} from '@axios/patientEmr/managerPatientEmrTypes';

import { isDashValue } from '@utils/stringUtils';

import { BackgroundInformationFormFields } from '../types';

export interface IPatientBackgroundInformationForm extends Omit<IPatientBackgroundPartners, 'pharmacy'> {
  referringDoctor: IReferringDoctor & {
    referringDoctorName: string;
  };
  pharmacy: IPharmacy & {
    pharmacyName: string;
  };
  familyDoctor: IFamilyDoctor & {
    familyDoctorName: string;
  };
}

export const getBackgroundInformationEmptyState = (backgroundInformation: IPatientBackgroundPartners) => ({
  [BackgroundInformationFormFields.SexAtBirth]: backgroundInformation?.sexAtBirth,
  [BackgroundInformationFormFields.CancerPatient]: backgroundInformation?.cancerPatient,
  [BackgroundInformationFormFields.Gender]: {
    ...backgroundInformation?.gender,
    other:
      !isDashValue(backgroundInformation?.gender.other) && backgroundInformation?.gender?.other
        ? backgroundInformation?.gender?.other
        : ''
  },
  [BackgroundInformationFormFields.SexualOrientation]: backgroundInformation?.sexualOrientation,
  [BackgroundInformationFormFields.PreferredPronouns]: backgroundInformation?.preferredPronouns,
  [BackgroundInformationFormFields.Relationship]: {
    ...backgroundInformation?.relationship,
    value:
      !isDashValue(backgroundInformation?.relationship?.value as string) && backgroundInformation?.relationship?.value
        ? backgroundInformation?.relationship?.value
        : null
  },
  [BackgroundInformationFormFields.DateOfBirth]: backgroundInformation?.dateOfBirth,
  [BackgroundInformationFormFields.Age]: backgroundInformation?.age,
  [BackgroundInformationFormFields.CurrentOccupation]: backgroundInformation?.currentOccupation,
  [BackgroundInformationFormFields.ReferringDoctor]: {
    ...backgroundInformation?.referringDoctor,
    name: '',
    referringDoctorName:
      !isDashValue(backgroundInformation?.referringDoctor?.name) && backgroundInformation?.referringDoctor?.name
        ? backgroundInformation?.referringDoctor?.name
        : ''
  },
  [BackgroundInformationFormFields.FamilyDoctor]: {
    ...backgroundInformation?.familyDoctor,
    name: '',
    familyDoctorName:
      !isDashValue(backgroundInformation.familyDoctor?.name) && backgroundInformation.familyDoctor?.name
        ? backgroundInformation.familyDoctor?.name
        : ''
  },
  [BackgroundInformationFormFields.Pharmacy]: {
    ...backgroundInformation?.pharmacy,
    name: '',
    pharmacyName:
      !isDashValue(backgroundInformation?.pharmacy?.name) && backgroundInformation?.pharmacy?.name
        ? backgroundInformation?.pharmacy?.name
        : '',
    address: {
      ...backgroundInformation?.pharmacy?.address,
      street: backgroundInformation?.pharmacy?.address?.street ?? '',
      unit: backgroundInformation?.pharmacy?.address?.unit ?? '',
      city: backgroundInformation?.pharmacy?.address?.city ?? '',
      postalCode: backgroundInformation?.pharmacy?.address?.postalCode ?? '',
      country: 'Canada',
      faxNumber: backgroundInformation?.pharmacy?.address?.faxNumber ?? '',
      phoneNumber: backgroundInformation?.pharmacy?.address?.phoneNumber ?? ''
    }
  }
});
