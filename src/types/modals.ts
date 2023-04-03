import React from 'react';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

export interface DialogTitleProps {
  id: string;
  dataCy?: string;
  children?: React.ReactNode;
  hideCloseIcon?: boolean;
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
  PatientTestResultDetailsModal = 'PatientTestResultDetailsModal',
  VerifyPatientPhotoModal = 'VerifyPatientPhotoModal',
  ImageModal = 'ImageModal',
  AddOrEditCustomAlertModal = 'AddOrEditCustomAlertModal',
  ConfirmAlertDeleteModal = 'ConfirmAlertDeleteModal',
  AddAddressManually = 'AddAddressManually',
  MedicalBackgroundUnsavedChanges = 'MedicalBackgroundUnsavedChanges'
}

export enum OpenModalReason {
  DuplicateName = 'Duplicate Name'
}
