import { SyntheticEvent } from 'react';

export interface AppointmentsModalProps {
  openAppointmentsModal: boolean;
  onCloseAppointmentsModal: (e: SyntheticEvent) => void;
  setOpenAppointmentsModal: React.Dispatch<React.SetStateAction<boolean>>;
  bookAppointmentDate?: Date | null;
  appointmentSlotId?: string;
}
export enum AppointmentsModalTypes {
  Add = 'add',
  Edit = 'edit',
  Info = 'info',
  Details = 'details'
}
