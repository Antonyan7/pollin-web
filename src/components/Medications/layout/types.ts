import { MedicationsProps, PrescriptionsProps } from '@axios/patientEmr/managerPatientEmrTypes';

export enum CardMode {
  View = 'View',
  Edit = 'Edit'
}
export interface CardItem {
  medication: MedicationsProps;
}
export interface PrescriptionCardItem {
  prescription: PrescriptionsProps;
}
