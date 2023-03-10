import { AddManuallyAddressModalProps } from '@axios/patientEmr/managerPatientEmrTypes';

export const getInitialValues = (): AddManuallyAddressModalProps => ({
  streetAddress: '',
  unitNumber: '',
  province: '',
  postalCode: '',
  city: '',
  country: 'Canada'
});

export enum ManuallyAddressModalMode {
  Primary = 'Primary',
  Mailing = 'Mailing'
}
