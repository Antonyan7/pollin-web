import { CypressIds } from 'constants/cypressIds';
import { AppointmentStatus } from 'types/reduxTypes/bookingStateTypes';

export const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const longWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const cancellationReasons = [
  'Personal Emergency',
  'Work Conflict',
  'Illness',
  'No longer require this appointment',
  'Other: please provide details'
];

export const nonEditableAppointmentStatuses = [
  AppointmentStatus.NoShow,
  AppointmentStatus.Cancelled,
  AppointmentStatus.Done
];

export const patientListTabLinks = [
  { linkName: 'Patient Profile', href: 'profile', [`data-cy`]: CypressIds.PAGE_PATIENT_DETAILS_TAB_PATIENT_PROFILE },
  { linkName: 'Plans', href: 'plans' },
  { linkName: 'Encounters', href: 'encounters', [`data-cy`]: CypressIds.PAGE_PATIENT_DETAILS_TAB_ENCOUNTERS },
  { linkName: 'Medications', href: 'medications' },
  { linkName: 'Orders & Results', href: 'orders', [`data-cy`]: CypressIds.PAGE_PATIENT_DETAILS_TAB_ORDERS_AND_RESULTS },
  { linkName: 'Consents', href: 'consents' },
  { linkName: 'Referrals', href: 'referrals' }
];
export const rowsPerPage = 10;

export const maxLength = 250;
