import { v4 } from 'uuid';

import { CycleStatuses, IPatient } from '../../types/patient';

export const rowsMock: IPatient[] = [
  {
    id: v4(),
    title: 'John Doe',
    age: 35,
    gender: 'M',
    partnerCount: 0,
    doctor: 'K. Garbedian',
    alerts: true,
    alertsCount: 4,
    dateOfBirth: 'Jan 1, 2001',
    cycleStatus: CycleStatuses.notActive
  },
  {
    id: v4(),
    title: 'John Doe',
    age: 35,
    gender: 'M',
    partnerCount: 0,
    doctor: 'K. Garbedian',
    alerts: false,
    alertsCount: 0,
    dateOfBirth: 'Jan 1, 2001',
    cycleStatus: CycleStatuses.notActive
  },
  {
    id: v4(),
    title: 'John Doe',
    age: 35,
    gender: 'M',
    partnerCount: 0,
    doctor: 'K. Garbedian',
    alerts: false,
    alertsCount: 0,
    dateOfBirth: 'Jan 1, 2001',
    cycleStatus: CycleStatuses.notActive
  },
  {
    id: v4(),
    title: 'John Doe',
    age: 35,
    gender: 'M',
    partnerCount: 0,
    doctor: 'K. Garbedian',
    alerts: true,
    alertsCount: 7,
    dateOfBirth: 'Jan 1, 2001',
    cycleStatus: CycleStatuses.notActive
  },
  {
    id: v4(),
    title: 'John Doe',
    age: 35,
    gender: 'M',
    partnerCount: 0,
    doctor: 'K. Garbedian',
    alerts: true,
    alertsCount: 3,
    dateOfBirth: 'Jan 1, 2001',
    cycleStatus: CycleStatuses.notActive
  },
  {
    id: v4(),
    title: 'John Doe',
    age: 35,
    gender: 'M',
    partnerCount: 0,
    doctor: 'K. Garbedian',
    alerts: true,
    alertsCount: 4,
    dateOfBirth: 'Jan 1, 2001',
    cycleStatus: CycleStatuses.notActive
  },
  {
    id: v4(),
    title: 'John Doe',
    age: 35,
    gender: 'M',
    partnerCount: 0,
    doctor: 'K. Garbedian',
    alerts: true,
    alertsCount: 2,
    dateOfBirth: 'Jan 1, 2001',
    cycleStatus: CycleStatuses.notActive
  },
  {
    id: v4(),
    title: 'John Doe',
    age: 35,
    gender: 'M',
    partnerCount: 0,
    doctor: 'K. Garbedian',
    alerts: true,
    alertsCount: 4,
    dateOfBirth: 'Jan 1, 2001',
    cycleStatus: CycleStatuses.notActive
  },
  {
    id: v4(),
    title: 'John Doe',
    age: 35,
    gender: 'M',
    partnerCount: 0,
    doctor: 'K. Garbedian',
    alerts: true,
    alertsCount: 4,
    dateOfBirth: 'Jan 1, 2001',
    cycleStatus: CycleStatuses.notActive
  },
  {
    id: v4(),
    title: 'John Doe',
    age: 35,
    gender: 'M',
    partnerCount: 0,
    doctor: 'K. Garbedian',
    alerts: true,
    alertsCount: 4,
    dateOfBirth: 'Jan 1, 2001',
    cycleStatus: CycleStatuses.notActive
  },
  {
    id: v4(),
    title: 'John Doe',
    age: 35,
    gender: 'M',
    partnerCount: 0,
    doctor: 'K. Garbedian',
    alerts: true,
    alertsCount: 4,
    dateOfBirth: 'Jan 1, 2001',
    cycleStatus: CycleStatuses.notActive
  },
  {
    id: v4(),
    title: 'John Doe',
    age: 35,
    gender: 'M',
    partnerCount: 0,
    doctor: 'K. Garbedian',
    alerts: true,
    alertsCount: 4,
    dateOfBirth: 'Jan 1, 2001',
    cycleStatus: CycleStatuses.notActive
  }
];
