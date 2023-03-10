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
  [ContactInformationFormFields.ResponsiblePhysician]: contactInformation.responsiblePhysician
});
