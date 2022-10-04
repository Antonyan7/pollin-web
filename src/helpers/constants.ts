import { IApplyScheduleDay } from 'types/apply-schedule';

export const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const longWeekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const appointmentStatusData = ['Booked', 'Arrived', 'Fulfilled', 'NoShow', 'CheckedIn'];

export const cancellationReasons = [
  'Personal Emergency',
  'Work Conflict',
  'Illness',
  'No longer require this appointment',
  'Other: please provide details'
];

export const repeatWeeksList = (weekCount: number): IApplyScheduleDay[] =>
  Array.from({ length: weekCount }).map((_, weekIdx) => ({ id: weekIdx + 1, name: `${weekIdx + 1} Week` }));

export const ESTTimezone = '-04:00';

export const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
