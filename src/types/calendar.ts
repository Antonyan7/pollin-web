export type Colors = Record<SlotTypes, string>;

export interface Styles {
  AppointmentBooked: string[];
  ServiceType: string[];
  BlockedSchedule: string[];
  AppointmentCancelled: string[];
  OpenSchedule: string[];
}

export enum SlotTypes {
  schedule = 'OpenSchedule',
  serviceType = 'ServiceType',
  block = 'BlockedSchedule',
  appointment = 'AppointmentBooked',
  canceled = 'AppointmentCancelled'
}

export enum DateValues {
  today = 'Today',
  next = 'Next',
  prev = 'Prev'
}
