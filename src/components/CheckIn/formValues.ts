export interface ICheckInFormValues {
  patient: string;
  checkInAppointments: string[];
}

export const checkInFormValues: ICheckInFormValues = {
  patient: '',
  checkInAppointments: []
};
