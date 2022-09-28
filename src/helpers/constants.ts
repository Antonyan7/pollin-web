import { IApplyScheduleDay } from '../types/apply-schedule';

export const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const longWeekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const appointmentStatusData = [
  'Confirmed',
  'Checked In/In Waiting',
  'Cancelled',
  'No Show',
  'Running Late',
  'In Progress',
  'Done'
];

export const cancellationReasons = [
  'Personal Emergency',
  'Work Conflict',
  'Illness',
  'No longer require this appointment',
  'Other: please provide details'
];

export const repeatWeeksList: IApplyScheduleDay[] = [
  {
    id: 1,
    name: '1 Week'
  },
  {
    id: 2,
    name: '2 Week'
  },
  {
    id: 3,
    name: '3 Week'
  },
  {
    id: 4,
    name: '4 Week'
  },
  {
    id: 5,
    name: '5 Week'
  },
  {
    id: 6,
    name: '6 Week'
  },
  {
    id: 7,
    name: '7 Week'
  }
];

export const ESTTimezone = '-04:00';

export const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
