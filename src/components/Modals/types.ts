import { PatientLineItemsModalProps } from '@components/Patients/PatientModals/PatientLineItemsModal';
import { PatientMedicationsModalProps } from '@components/Patients/PatientModals/PatientMedicationsModal';
import { PatientPartnersModalProps } from '@components/Patients/PatientModals/PatientPartnersModal';

import { AddAppointmentDuplicatePatientModalProps } from './Booking/AddAppointmentDuplicatePatientModal';
import { AddAppointmentModalProps } from './Booking/AddAppointmentModal/types';
import { CancelAppointmentModalProps } from './Booking/CancelAppointmentModal/types';
import { EditAppointmentModalProps } from './Booking/EditAppointmentsModal';

export type ModalPropType =
  | AddAppointmentModalProps
  | EditAppointmentModalProps
  | AddAppointmentDuplicatePatientModalProps
  | CancelAppointmentModalProps
  | PatientLineItemsModalProps
  | PatientMedicationsModalProps
  | PatientPartnersModalProps;
