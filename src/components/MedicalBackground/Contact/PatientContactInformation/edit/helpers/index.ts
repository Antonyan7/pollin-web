import { IPatientContactInformationProps } from '@axios/patientEmr/managerPatientEmrTypes';
import { isDashString } from '@components/MedicalBackground/helpers';

import { ContactInformationFormFields } from '../types';

export const getContactInformationEmptyState = (contactInformation: IPatientContactInformationProps) => ({
  [ContactInformationFormFields.Identifier]: contactInformation.identifier ?? '',
  [ContactInformationFormFields.PatientName]: {
    ...contactInformation.patientName,
    firstName: contactInformation.patientName.firstName ?? '',
    lastName: contactInformation.patientName.lastName ?? ''
  },
  [ContactInformationFormFields.PreferredName]: {
    ...contactInformation.preferredName,
    value: isDashString(contactInformation.preferredName.value) ? '' : contactInformation.preferredName.value
  },
  [ContactInformationFormFields.Contribution]: {
    ...contactInformation.contribution,
    value: isDashString(contactInformation.contribution.value) ? '' : contactInformation.contribution.value
  },
  [ContactInformationFormFields.PrimaryAddress]: {
    ...contactInformation.primaryAddress,
    streetAddress: contactInformation.primaryAddress.streetAddress,
    unitNumber: isDashString(contactInformation.primaryAddress.unitNumber)
      ? ''
      : contactInformation.primaryAddress.unitNumber
  },
  [ContactInformationFormFields.MailingAddress]: {
    ...contactInformation.mailingAddress,
    streetAddress: contactInformation.mailingAddress.streetAddress,
    unitNumber: isDashString(contactInformation.mailingAddress.unitNumber)
      ? ''
      : contactInformation.mailingAddress.unitNumber
  },
  [ContactInformationFormFields.EmailAddress]: contactInformation.emailAddress,
  [ContactInformationFormFields.PhoneNumber]: contactInformation.phoneNumber,
  [ContactInformationFormFields.OHIP]: {
    ...contactInformation.OHIP,
    exists: contactInformation.OHIP.exists,
    number: isDashString(contactInformation.OHIP.number) ? '' : contactInformation.OHIP.number,
    versionCode: isDashString(contactInformation.OHIP.versionCode) ? '' : contactInformation.OHIP.versionCode
  },
  [ContactInformationFormFields.ResponsiblePhysician]: contactInformation.responsiblePhysician,
  [ContactInformationFormFields.IsSameAddressChecked]:
    contactInformation.primaryAddress.streetAddress === contactInformation.mailingAddress.streetAddress
});

export const replaceOhipNumberFormat = (ohipNumber: string) => {
  let ohipCode = ohipNumber;

  ohipCode = ohipCode.replace(/-/g, '');

  if (ohipCode.length >= 5 && ohipCode.length <= 7) {
    ohipCode = `${ohipCode.slice(0, 4)}-${ohipCode.slice(4)}`;
  } else if (ohipNumber.length >= 8) {
    ohipCode = `${ohipCode.slice(0, 4)}-${ohipCode.slice(4, 7)}-${ohipCode.slice(7)}`;
  }

  return ohipCode;
};

export const allowedChars = '0123456789-';
export const lettersOnly = /^[a-zA-Z]+$/;
