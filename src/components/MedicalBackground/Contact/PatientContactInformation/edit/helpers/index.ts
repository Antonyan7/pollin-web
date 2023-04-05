import { IPatientContactInformationProps } from '@axios/patientEmr/managerPatientEmrTypes';

import { ContactInformationFormFields } from '../types';

export const getContactInformationEmptyState = (contactInformation: IPatientContactInformationProps) => ({
  [ContactInformationFormFields.Identifier]: contactInformation.identifier ?? '',
  [ContactInformationFormFields.PatientName]: {
    ...contactInformation.patientName,
    firstName: contactInformation.patientName.firstName ?? '',
    lastName: contactInformation.patientName.lastName ?? ''
  },
  [ContactInformationFormFields.PreferredName]: contactInformation.preferredName,
  [ContactInformationFormFields.Contribution]: contactInformation.contribution,
  [ContactInformationFormFields.PrimaryAddress]: {
    ...contactInformation.primaryAddress,
    streetAddress: contactInformation.primaryAddress.streetAddress
  },
  [ContactInformationFormFields.MailingAddress]: {
    ...contactInformation.mailingAddress,
    streetAddress: contactInformation.mailingAddress.streetAddress
  },
  [ContactInformationFormFields.EmailAddress]: contactInformation.emailAddress,
  [ContactInformationFormFields.PhoneNumber]: contactInformation.phoneNumber,
  [ContactInformationFormFields.OHIP]: {
    ...contactInformation.OHIP,
    exists: contactInformation.OHIP.exists,
    number: contactInformation.OHIP.number,
    versionCode: contactInformation.OHIP.versionCode
  },
  [ContactInformationFormFields.ResponsiblePhysician]: contactInformation.responsiblePhysician,
  [ContactInformationFormFields.IsSameAddressChecked]: contactInformation.primaryAddress.streetAddress === contactInformation.mailingAddress.streetAddress,
});

export const replaceOhipNumberFormat = (ohipNumber: string) => {
  let ohipCode = ohipNumber;

  ohipCode = ohipCode.replace(/-/g, "");

  if (ohipCode.length >= 5 && ohipCode.length <= 7) {
    ohipCode = `${ohipCode.slice(0, 4)}-${ohipCode.slice(4)}`;
  } else if (ohipNumber.length >= 8) {
    ohipCode = `${ohipCode.slice(0, 4)}-${ohipCode.slice(4, 7)}-${ohipCode.slice(7)}`;
  }

  return ohipCode;
}

export const allowedChars = "0123456789-";
export const lettersOnly = /^[a-zA-Z]+$/;