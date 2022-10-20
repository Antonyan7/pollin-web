import React from 'react';
import { SxProps, Theme } from '@mui/material/styles';

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  onClose: () => void;
}

export enum ModalName {
  NONE = '',
  AddAppointmentModal = 'AddAppointmentModal',
  EditAppointmentModal = 'EditAppointmentModal',
  CancelAppointmentModal = 'CancelAppointmentModal',
  DetailsAppointmentModal = 'DetailsAppointmentModal',
  AddAppointmentDuplicatePatientModal = 'AddAppointmentDuplicatePatientModal',
  EncountersCancelChangesModal = 'EncountersCancelChangesModal',
  DevToolsModal = 'DevToolsModal',
  ScheduleTemplatesErrorModal = 'ScheduleTemplatesErrorModal',
  CreateTemplateModal = 'CreateTemplateModal',
  PatientPartnersModal = 'PatientPartnersModal',
  PatientMedicationsModal = 'PatientMedicationsModal',
  PatientLineItemsModal = 'PatientLineItemsModal'
}

export enum OpenModalReason {
  DuplicateName = 'Duplicate Name'
}
