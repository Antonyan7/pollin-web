export interface IWorkingHoursConfig {
  start: string;
  end: string;
}
export interface IClinicConfig {
  timeZone: string;
  currentDate: string;
  workingHours: IWorkingHoursConfig;
}

export interface IInitializationStatus {
  firebase: boolean;
  featureFlags: boolean;
}

export interface CoreProps {
  clinicConfig: IClinicConfig;
  initializationStatus: IInitializationStatus;
}
