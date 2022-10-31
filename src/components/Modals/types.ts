import { PatientLineItemsModalProps } from '@components/Patients/PatientModals/PatientLineItemsModal';
import { PatientMedicationsModalProps } from '@components/Patients/PatientModals/PatientMedicationsModal';
import { PatientPartnersModalProps } from '@components/Patients/PatientModals/PatientPartnersModal';

import { AddAppointmentDuplicatePatientModalProps } from './Booking/AddAppointmentDuplicatePatientModal';
import { AddResourceAppointmentModalProps } from './Booking/AddResourceAppointmentModal';
import { CancelAppointmentModalProps } from './Booking/CancelAppointmentModal';
import { EditAppointmentModalProps } from './Booking/EditAppointmentsModal';
import { ScheduleTemplatesErrorModalProps } from './Scheduling/ScheduleTemplatesErrorModal';

export type ModalPropType =
  | AddResourceAppointmentModalProps
  | EditAppointmentModalProps
  | AddAppointmentDuplicatePatientModalProps
  | CancelAppointmentModalProps
  | ScheduleTemplatesErrorModalProps
  | PatientLineItemsModalProps
  | PatientMedicationsModalProps
  | PatientPartnersModalProps;
