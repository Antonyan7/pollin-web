import React from 'react';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

export interface DialogTitleProps {
  id: string;
  dataCy?: string;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  onClose: () => void;
}

export enum ModalName {
  NONE = '',
  AddPatientAppointmentsModal = 'AddPatientAppointmentsModal',
  AddResourceAppointmentModal = 'AddResourceAppointmentModal',
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
  PatientLineItemsModal = 'PatientLineItemsModal',
  PatientContactInformation = 'PatientInformationModal',
  SelectMachineModal = 'SelectMachineModal',
  TestResultReviewConfirmation = 'TestResultReviewConfirmation',
  TestResultReleaseConfirmation = 'TestResultReleaseConfirmation',
  InHouseTestResults = 'InHouseTestResults',
  SpecimenCollection = 'SpecimenCollection',
  HandoffConfirmation = 'HandoffConfirmation',
  OrderCancellation = 'OrderCancellation',
  AddNewTransportFolderModal = 'AddNewTransportFolderModal',
  AddNewExistingTransportModal = 'AddNewExistingTransportModal',
  PatientPartnerModal = 'PatientPartnerModal',
  MoveToAnotherTransport = 'MoveToAnotherTransport',
  ErrorModal = 'ErrorModal',
  CancelOrderCreationModal = 'CancelOrderCreationModal',
  TaskDetailsModal = 'TaskDetailsModal',
  OrderValidationErrorModal = 'OrderValidationErrorModal',
  TaskStatusUpdateModal = 'TaskStatusUpdateModal',
  CreateTaskModal = 'CreateTaskModal',
  ReassignTaskModal = 'ReassignTaskModal',
  PatientTestResultDetailsModal = 'PatientTestResultDetailsModal'
}

export enum OpenModalReason {
  DuplicateName = 'Duplicate Name'
}
