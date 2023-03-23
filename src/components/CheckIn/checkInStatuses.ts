import { Theme } from '@mui/material';

export enum CheckInStatuses {
  Booked = 'Booked',
  Confirmed = 'Confirmed',
  CheckedIn = 'CheckedIn',
  NoShow = 'NoShow',
  InProgress = 'InProgress'
}

type CheckInChip = Record<CheckInStatuses, { backgroundColor: string; textColor: string }>;

export const statuses = (theme: Theme): CheckInChip => ({
  Booked: {
    backgroundColor: '#EDE7F6',
    textColor: '#323297'
  },
  CheckedIn: {
    backgroundColor: '#E3F2FD',
    textColor: '#005490'
  },
  Confirmed: {
    backgroundColor: theme.palette.warning.light,
    textColor: theme.palette.warning[800]
  },
  NoShow: {
    backgroundColor: theme.palette.error.light,
    textColor: theme.palette.error[800]
  },
  InProgress: {
    backgroundColor: theme.palette.success.light,
    textColor: theme.palette.success[800]
  }
});
