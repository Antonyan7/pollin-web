export interface Colors {
  Default: string;
  BlockedOffTime: string;
  Cancelled: string;
  Placeholder: string;
}

export interface Styles {
  Default: string[];
  BlockedOffTime: string[];
  Cancelled: string[];
  Placeholder: string[];
}

export enum SlotTypes {
  default = 'Default',
  blockedOffTime = 'BlockedOffTime',
  canceled = 'Cancelled',
  placeholder = 'Placeholder'
}

export enum DateValues {
  today = 'Today',
  next = 'Next',
  prev = 'Prev'
}
