import { IAddPatientPrescriptionForm } from '@axios/patientEmr/managerPatientEmrTypes';

export enum PrescriptionTypeEnum {
  Pollin = 'InHouse',
  External = 'External'
}

export const getMedicationInitialState = () => ({
  drugId: '',
  dosage: '',
  route: '',
  frequency: '',
  time: '',
  duration: {
    start: '',
    end: ''
  },
  quantity: '',
  refill: '',
  refillNotes: '',
  doctorNotes: ''
});

export const initialValues: IAddPatientPrescriptionForm = {
  type: PrescriptionTypeEnum.Pollin,
  prescriberId: '',
  medications: [getMedicationInitialState()]
};
