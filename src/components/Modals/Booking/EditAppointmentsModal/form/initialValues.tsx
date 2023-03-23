export interface IEditAppointmentForm {
  date: string;
  status: string;
  description: string;
  serviceTypeId: string;
  patientId: string;
  isVirtual: boolean;
}

export const initialValues: IEditAppointmentForm = {
  patientId: '',
  date: '',
  status: '',
  description: '',
  serviceTypeId: '',
  isVirtual: false
};
