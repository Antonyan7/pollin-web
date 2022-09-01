export interface IPatient {
  id: string;
  title: string;
  age: number;
  gender: string;
  partnerCount: number;
  doctor: string;
  alerts: boolean;
  alertsCount: number;
  dateOfBirth: string;
  cycleStatus: CycleStatuses;
}

export interface IHeadCell {
  id: string;
  label: string;
  align: 'center' | 'left' | 'right' | 'inherit' | 'justify' | undefined;
  paddingLeft: string | number;
}

export enum CycleStatuses {
  notActive = 'Not Active'
}
