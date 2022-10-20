import { PatientLineItemsModalProps } from '@components/Patients/PatientModals/PatientLineItemsModal';
import { PatientMedicationsModalProps } from '@components/Patients/PatientModals/PatientMedicationsModal';
import { PatientPartnersModalProps } from '@components/Patients/PatientModals/PatientPartnersModal';

import { AddAppointmentDuplicatePatientModalProps } from './Booking/AddAppointmentDuplicatePatientModal';
import { AddAppointmentsModalProps } from './Booking/AddAppointmentsModal';
import { CancelAppointmentModalProps } from './Booking/CancelAppointmentModal';
import { EditAppointmentModalProps } from './Booking/EditAppointmentsModal';
import { ScheduleTemplatesErrorModalProps } from './Scheduling/ScheduleTemplatesErrorModal';

export type ModalPropType =
  | AddAppointmentsModalProps
  | EditAppointmentModalProps
  | AddAppointmentDuplicatePatientModalProps
  | CancelAppointmentModalProps
  | ScheduleTemplatesErrorModalProps
  | PatientLineItemsModalProps
  | PatientMedicationsModalProps
  | PatientPartnersModalProps;
