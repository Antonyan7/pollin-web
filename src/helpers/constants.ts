import { IApplyScheduleDay } from 'types/apply-schedule';

export const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const longWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const appointmentStatusData = ['Booked', 'Arrived', 'Fulfilled', 'NoShow', 'CheckedIn'];

export const TIME_CONFIG = 'EST';

export const cancellationReasons = [
  'Personal Emergency',
  'Work Conflict',
  'Illness',
  'No longer require this appointment',
  'Other: please provide details'
];

export const repeatWeeksList = (weekCount: number): IApplyScheduleDay[] =>
  Array.from({ length: weekCount }).map((_, weekIdx) => ({ id: weekIdx + 1, name: `${weekIdx + 1} Week` }));

export const UTCTimezone = '+00:00';

export const standardDate = new Date(1970, 0, 1, 15, 0, 0, 0);

export const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const patientListTabLinks = [
  { linkName: 'Patient Profile', href: 'profile' },
  { linkName: 'Plans', href: 'plans' },
  { linkName: 'Encounters', href: 'encounters' },
  { linkName: 'Medications', href: 'medications' },
  { linkName: 'Orders & Results', href: 'orders' },
  { linkName: 'Consents', href: 'consents' },
  { linkName: 'Referrals', href: 'referrals' }
];
export const rowsPerPage = 10;

export const maxLength = 250;
