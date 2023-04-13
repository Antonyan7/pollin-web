export interface IAddPatientMedicationForm {
  MedicationName: string;
  startDate: string;
  endDate: string;
  dosage: string;
  frequency: string;
  time?: string;
  route: string;
  prescriber?: string;
  id: string;
}

export enum AddPatientMedicationFormField {
  MedicationName = 'MedicationName',
  StartDate = 'startDate',
  EndDate = 'endDate',
  Dosage = 'dosage',
  Frequency = 'frequency',
  Time = 'time',
  Route = 'route',
  Prescriber = 'prescriber',
  id = 'id'
}
