export interface IAddPatientMedicationForm {
  dragName: string;
  startDate: string;
  endDate: string;
  dosage: string;
  frequency: string;
  time?: string;
  route: string;
  prescriber?: string;
}

export enum AddPatientMedicationFormField {
  DragName = 'dragName',
  StartDate = 'startDate',
  EndDate = 'endDate',
  Dosage = 'dosage',
  Frequency = 'frequency',
  Time = 'time',
  Route = 'route',
  Prescriber = 'prescriber'
}

export const initialValues: IAddPatientMedicationForm = {
  [AddPatientMedicationFormField.DragName]: '',
  [AddPatientMedicationFormField.StartDate]: '',
  [AddPatientMedicationFormField.EndDate]: '',
  [AddPatientMedicationFormField.Dosage]: '',
  [AddPatientMedicationFormField.Frequency]: '',
  [AddPatientMedicationFormField.Time]: '',
  [AddPatientMedicationFormField.Route]: '',
  [AddPatientMedicationFormField.Prescriber]: ''
};
