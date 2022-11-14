export class PatientProfileNavigatorContextActionTypes {
  public static readonly NONE = 'NONE';

  public static readonly APPOINTMENTS_LIST_PAGE = 'APPOINTMENTS_LIST_PAGE';
}

export enum PatientProfilePageName {
  AppointmentsList = 'AppointmentsList'
}

export interface IPatientProfileNavigatorState {
  page: JSX.Element | null;
  name: PatientProfilePageName | null;
}
