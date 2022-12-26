import React from 'react';
import { SxProps, Theme } from '@mui/material/styles';

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
  SpecimenTrackingCollection = 'SpecimenTrackingCollection',
  HandoffConfirmation = 'HandoffConfirmation',
  OrderCancellation = 'OrderCancellation',
  AddNewTransportFolderModal = 'AddNewTransportFolderModal',
  AddNewExistingTransportModal = 'AddNewExistingTransportModal',
  PatientPartnerModal = 'PatientPartnerModal',
  CancelOrderCreationModal = 'CancelOrderCreationModal'
}

export enum OpenModalReason {
  DuplicateName = 'Duplicate Name'
}
