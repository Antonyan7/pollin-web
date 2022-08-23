export type Colors = Record<SlotTypes, string>;

export interface Styles {
  AppointmentBooked: string[];
  BlockedSchedule: string[];
  AppointmentCancelled: string[];
  OpenSchedule: string[];
}

export enum SlotTypes {
  schedule = 'OpenSchedule',
  block = 'BlockedSchedule',
  appointment = 'AppointmentBooked',
  canceled = 'AppointmentCancelled'
}

export enum DateValues {
  today = 'Today',
  next = 'Next',
  prev = 'Prev'
}
