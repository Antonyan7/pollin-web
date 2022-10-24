export interface IClinicConfigResponse {
  currentDate: Date | string;
  timeZone: string;
  workingHours: {
    start: string;
    end: string;
  };
}
