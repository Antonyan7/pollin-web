export interface IWorkingHoursConfig {
  start: string;
  end: string;
}
export interface IClinicConfig {
  timeZone: string;
  currentDate: string;
  workingHours: IWorkingHoursConfig;
}

export interface CoreProps {
  clinicConfig: IClinicConfig;
}
