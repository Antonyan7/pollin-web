import React from 'react';
import AddOrEditCustomAlertModal, {
  AddOrEditCustomAlertModalProps
} from '@components/Modals/Alerts/AddOrEditCustomAlert';
import ConfirmAlertDeleteModal, { ConfirmAlertDeleteModalProps } from '@components/Modals/Alerts/ConfirmAlertDelete';
import AddAppointmentDuplicatePatientModal, {
  AddAppointmentDuplicatePatientModalProps
} from '@components/Modals/Booking/AddAppointmentDuplicatePatientModal';
import AddAppointmentModal from '@components/Modals/Booking/AddAppointmentModal';
import { AddAppointmentModalProps } from '@components/Modals/Booking/AddAppointmentModal/types';
import CancelAppointmentModal from '@components/Modals/Booking/CancelAppointmentModal';
import { CancelAppointmentModalProps } from '@components/Modals/Booking/CancelAppointmentModal/types';
import DetailsAppointmentModal, {
  DetailsAppointmentModalProps
} from '@components/Modals/Booking/DetailsAppointmentModal';
import EditAppointmentsModal, { EditAppointmentModalProps } from '@components/Modals/Booking/EditAppointmentsModal';
import AppointmentStatusChangeConfirmationModal from '@components/Modals/Booking/EditAppointmentsModal/AppointmentStatusChangeConfirmation';
import { IAppointmentStatusChangeConfirmationModalProps } from '@components/Modals/Booking/EditAppointmentsModal/AppointmentStatusChangeConfirmation/types';
import SendBookingRequestToPatientModal from '@components/Modals/Booking/SendBookingRequestToPatientModal';
import ConfirmBookingRequestToPatientModal from '@components/Modals/Booking/SendBookingRequestToPatientModal/ConfirmBookingRequestToPatientModal';
import {
  IConfirmBookingRequestToPatientModalProps,
  SendBookingRequestToPatientModalProps
} from '@components/Modals/Booking/SendBookingRequestToPatientModal/types';
import DevToolsModal from '@components/Modals/DevToolsModal/DevToolsModal';
import ErrorModal from '@components/Modals/ErrorModal';
import PatientContactInformationModal from '@components/Modals/ExternalResults/PatientContactInformationModal';
import ImageModal, { ImageModalProps } from '@components/Modals/ImageModal';
import InHouseInputResultsModal from '@components/Modals/InHouseTests/InputResults';
import AddAddressManually, { AddAddressManuallyProps } from '@components/Modals/MedicalBackground/AddAddressManually';
import MedicalBackgroundUnsavedChanges, {
  MedicalBackgroundUnsavedChangesProps
} from '@components/Modals/MedicalBackground/UnsavedChanges';
import AddPatientMedicationModal from '@components/Modals/Medications/AddPatientMedicationModal';
import AddPatientPrescriptionsModal from '@components/Modals/Medications/AddPatientPrescriptionModal';
import ConfirmPrescriptionArchiveModal, {
  ConfirmPrescriptionArchiveModalProps
} from '@components/Modals/Medications/ConfirmPrescriptionArchiveModal';
import OrderCancellation, { OrderCancellationProps } from '@components/Modals/Order/OrderCancellation';
import CancelOrderCreationModal from '@components/Modals/Order/OrderCreationCancel/CancelOrderCreation';
import OrderValidationErrorModal, {
  OrderValidationErrorModalProps
} from '@components/Modals/Order/OrderValidationError';
import TestResultReleaseConfirmationModal from '@components/Modals/Order/TestResultReleaseConfirmation';
import TestResultReviewConfirmationModal from '@components/Modals/Order/TestResultReviewConfirmation';
import EncountersCancelChangesModal, {
  IEncountersCancelChangesModalProps
} from '@components/Modals/PatientEMR/Encounters/EncountersCancelChangesModal';
import PatientPartnerModal, { PatientPartnerModalProps } from '@components/Modals/PatientPartner';
import SendPlansToPatient from '@components/Modals/Plans/SendPlansToPatient';
import SelectMachineModal, { SelectMachineModalProps } from '@components/Modals/SelectMachineModal';
import SpecimenCollectionModal from '@components/Modals/Specimen/Collection';
import { SpecimenCollectionModalProps } from '@components/Modals/Specimen/Collection/types';
import AddNewExistingTransportModal from '@components/Modals/Specimens/AddNewExistingTransport';
import AddNewTransportFolderModal from '@components/Modals/Specimens/AddNewTransportFolderModal';
import MoveToAnotherTransport, {
  MoveToAnotherTransportProps
} from '@components/Modals/Specimens/MoveToAnotherTransport';
import HandoffConfirmation, {
  HandoffConfirmationModalProps
} from '@components/Modals/SpecimenTracking/PatientContactInformationModal';
import TaskDetailsModal, { TaskDetailsModalProps } from '@components/Modals/TaskDashboard/TaskDetailsModal';
import TaskStatusUpdateModal, {
  TestResultReviewConfirmationProps
} from '@components/Modals/TaskDashboard/TaskStatusUpdateModal';
import ReassignTaskModal from '@components/Modals/TaskReassign';
import CreateTaskModal from '@components/Modals/Tasks';
import VerifyPatientPhotoModal from '@components/Modals/VerifyPatientPhotoModal';
import PatientLineItemsModal, {
  PatientLineItemsModalProps
} from '@components/Patients/PatientModals/PatientLineItemsModal';
import PatientMedicationsModal, {
  PatientMedicationsModalProps
} from '@components/Patients/PatientModals/PatientMedicationsModal';
import PatientPartnersModal, {
  PatientPartnersModalProps
} from '@components/Patients/PatientModals/PatientPartnersModal';
import PatientTestResultsModal from '@components/Patients/PatientModals/PatientTestResultsModal';
import { useAppSelector } from 'redux/hooks';
import { viewsSelector } from 'redux/slices/views';
import { ModalName } from 'types/modals';
import {
  IAddNewContactModalProps,
  IAddNewExistingTransportModalProps,
  IMakeTestResultReviewReq,
  IPatientContactInformationModalProps
} from 'types/reduxTypes/resultsStateTypes';
import { IOpenedModal } from 'types/reduxTypes/viewsStateTypes';
import { v4 } from 'uuid';

// <BOOKING>
// appointments
const getDetailsAppointmentModal = (modal: IOpenedModal<DetailsAppointmentModalProps>) => (
  <DetailsAppointmentModal key={modal.name} {...modal.props} />
);
const getAddAppointmentModal = (modal: IOpenedModal<AddAppointmentModalProps>) => (
  <AddAppointmentModal key={modal.name} {...modal.props} />
);
const getAppointmentStatusChangeConfirmationModal = (
  modal: IOpenedModal<IAppointmentStatusChangeConfirmationModalProps>
) => <AppointmentStatusChangeConfirmationModal key={modal.name} {...modal.props} />;
const getSelectMachineModal = (modal: IOpenedModal<SelectMachineModalProps>) => (
  <SelectMachineModal key={modal.name} {...modal.props} />
);
const getAddAppointmentDuplicatePatientModal = (modal: IOpenedModal<AddAppointmentDuplicatePatientModalProps>) => (
  <AddAppointmentDuplicatePatientModal key={modal.name} {...modal.props} />
);
const getEditAppointmentModal = (modal: IOpenedModal<EditAppointmentModalProps>) => (
  <EditAppointmentsModal key={modal.name} {...modal.props} />
);
const getCancelAppointmentModal = (modal: IOpenedModal<CancelAppointmentModalProps>) => (
  <CancelAppointmentModal key={modal.name} {...modal.props} />
);

const getSendBookingRequestToPatientModal = (modal: IOpenedModal<SendBookingRequestToPatientModalProps>) => (
  <SendBookingRequestToPatientModal key={modal.name} {...modal.props} />
);

const getConfirmBookingRequestToPatientModal = (modal: IOpenedModal<IConfirmBookingRequestToPatientModalProps>) => (
  <ConfirmBookingRequestToPatientModal key={modal.name} {...modal.props} />
);

// <PATIENT EMR>
// encounters
const getEncountersCancelChangesModal = (modal: IOpenedModal<IEncountersCancelChangesModalProps>) => (
  <EncountersCancelChangesModal key={modal.name} />
);
const getAddAddressManuallyModal = (modal: IOpenedModal<AddAddressManuallyProps>) => (
  <AddAddressManually key={v4()} {...modal.props} />
);
// <EXTERNAL RESULTS>
const getExternalResultsPatientInformationModal = (modal: IOpenedModal<IPatientContactInformationModalProps>) => (
  <PatientContactInformationModal key={modal.name} {...modal.props} />
);
// <SPECIMENS>
const getAddNewTransportFolderModal = (modal: IOpenedModal<IAddNewContactModalProps>) => (
  <AddNewTransportFolderModal key={modal.name} {...modal.props} />
);
const getAddNewExistingTransportModal = (modal: IOpenedModal<IAddNewExistingTransportModalProps>) => (
  <AddNewExistingTransportModal key={modal.name} {...modal.props} />
);
const getTestResultReviewConfirmation = (modal: IOpenedModal<IMakeTestResultReviewReq>) => (
  <TestResultReviewConfirmationModal key={modal.name} {...modal.props} />
);
const getTestResultReleaseConfirmation = (modal: IOpenedModal<IMakeTestResultReviewReq>) => (
  <TestResultReleaseConfirmationModal key={modal.name} {...modal.props} />
);

// profile highlight
const getPatientListItemsModal = (modal: IOpenedModal<PatientLineItemsModalProps>) => (
  <PatientLineItemsModal key={modal.name} {...modal.props} />
);
const getPatientMedicationsModal = (modal: IOpenedModal<PatientMedicationsModalProps>) => (
  <PatientMedicationsModal key={modal.name} {...modal.props} />
);
const getPatientPartnersModal = (modal: IOpenedModal<PatientPartnersModalProps>) => (
  <PatientPartnersModal key={modal.name} {...modal.props} />
);

const getPatientTestResultsModal = (modal: IOpenedModal<Record<string, never>>) => (
  <PatientTestResultsModal key={modal.name} />
);

const getInHouseTestResultsModal = () => <InHouseInputResultsModal key={v4()} />;
const getHandoffConfirmationModal = (modal: IOpenedModal<HandoffConfirmationModalProps>) => (
  <HandoffConfirmation key={modal.name} {...modal.props} />
);

const getSpecimenCollectionModal = (modal: IOpenedModal<SpecimenCollectionModalProps>) => (
  <SpecimenCollectionModal key={modal.name} appointmentId={modal.props.appointmentId} />
);
// Patient Partner confirmation (Are you want to go to profile partners profile)
const getPatientPartnerModal = (modal: IOpenedModal<PatientPartnerModalProps>) => (
  <PatientPartnerModal key={modal.name} patientId={modal.props.patientId} />
);

// Order Creation

const getOrderCancellationModal = (modal: IOpenedModal<OrderCancellationProps>) => (
  <OrderCancellation key={modal.name} {...modal.props} />
);

const getOrderValidationErrorModal = (modal: IOpenedModal<OrderValidationErrorModalProps>) => (
  <OrderValidationErrorModal key={modal.name} {...modal.props} />
);

const getMoveToAnotherTransport = (modal: IOpenedModal<MoveToAnotherTransportProps>) => (
  <MoveToAnotherTransport key={modal.name} {...modal.props} />
);

const getTaskCreateModal = () => <CreateTaskModal key={v4()} />;

// Patient Partner confirmation (Are you want to go to profile partners profile)
const getOrderCreationCancelModal = () => <CancelOrderCreationModal key={v4()} />;

// Error modal
const getErrorModal = () => <ErrorModal key={v4()} />;

// Task Management
const getTaskDetailsModal = (modal: IOpenedModal<TaskDetailsModalProps>) => (
  <TaskDetailsModal key={modal.name} {...modal.props} />
);

const getReassignTaskModal = (modal: IOpenedModal<TestResultReviewConfirmationProps>) => (
  <ReassignTaskModal key={modal.name} {...modal.props} />
);

const getTaskStatusUpdateModal = (modal: IOpenedModal<TestResultReviewConfirmationProps>) => (
  <TaskStatusUpdateModal key={modal.name} {...modal.props} />
);

const getVerifyPatientPhotoModal = () => <VerifyPatientPhotoModal />;
const getImageModal = (modal: IOpenedModal<ImageModalProps>) => <ImageModal key={modal.name} {...modal.props} />;

// Alerts
const getAddOrEditCustomAlertModal = (modal: IOpenedModal<AddOrEditCustomAlertModalProps>) => (
  <AddOrEditCustomAlertModal key={modal.name} {...modal.props} />
);
const getConfirmAlertDeleteModal = (modal: IOpenedModal<ConfirmAlertDeleteModalProps>) => (
  <ConfirmAlertDeleteModal key={modal.name} {...modal.props} />
);

// Medical Background
const getMedicalBackgroundUnsavedChangesModal = (modal: IOpenedModal<MedicalBackgroundUnsavedChangesProps>) => (
  <MedicalBackgroundUnsavedChanges key={modal.name} confirmChanges={modal.props.confirmChanges} />
);

// Medications
const getAddPatientMedicationModalModal = () => <AddPatientMedicationModal key={v4()} />;
const getAddPatientPrescriptionsModal = () => <AddPatientPrescriptionsModal key={v4()} />;

const getConfirmPrescriptionArchiveModal = (modal: IOpenedModal<ConfirmPrescriptionArchiveModalProps>) => (
  <ConfirmPrescriptionArchiveModal key={modal.name} {...modal.props} />
);

// Plans
const getPatientPlansSentPlansToPatientModal = (name: string) => <SendPlansToPatient key={name} />;

// dev
const getDevToolsModal = () => <DevToolsModal key={v4()} />;

export const ModalsController = () => {
  const modals = useAppSelector(viewsSelector.modals);

  return (
    <>
      {modals.map((modal) => {
        switch (modal.name) {
          // <BOOKING>
          // appointments
          case ModalName.DetailsAppointmentModal:
            return getDetailsAppointmentModal(modal);
          case ModalName.AddAppointmentModal:
            return getAddAppointmentModal(modal);
          case ModalName.AppointmentStatusChangeConfirmationModal:
            return getAppointmentStatusChangeConfirmationModal(modal);
          case ModalName.SelectMachineModal:
            return getSelectMachineModal(modal);
          case ModalName.EditAppointmentModal:
            return getEditAppointmentModal(modal);
          case ModalName.CancelAppointmentModal:
            return getCancelAppointmentModal(modal);
          case ModalName.AddAppointmentDuplicatePatientModal:
            return getAddAppointmentDuplicatePatientModal(modal);

          case ModalName.SendBookingRequestToPatientModal: {
            return getSendBookingRequestToPatientModal(modal);
          }

          case ModalName.ConfirmBookingRequestToPatientModal: {
            return getConfirmBookingRequestToPatientModal(modal);
          }

          // <PATIENT EMR>
          case ModalName.EncountersCancelChangesModal:
            return getEncountersCancelChangesModal(modal);
          case ModalName.AddAddressManually:
            return getAddAddressManuallyModal(modal);

          // <Plans>
          case ModalName.SendPlansToPatientModal:
            return getPatientPlansSentPlansToPatientModal(modal.name);

          // <EXTERNAL RESULTS>
          case ModalName.PatientContactInformation:
            return getExternalResultsPatientInformationModal(modal);
          // <SPECIMENS>
          case ModalName.AddNewTransportFolderModal:
            return getAddNewTransportFolderModal(modal);
          case ModalName.AddNewExistingTransportModal:
            return getAddNewExistingTransportModal(modal);
          case ModalName.MoveToAnotherTransport:
            return getMoveToAnotherTransport(modal);
          // profile highlight
          case ModalName.PatientLineItemsModal:
            return getPatientListItemsModal(modal);
          case ModalName.PatientMedicationsModal:
            return getPatientMedicationsModal(modal);
          case ModalName.PatientPartnersModal:
            return getPatientPartnersModal(modal);
          case ModalName.PatientTestResultDetailsModal:
            return getPatientTestResultsModal(modal);
          case ModalName.InHouseTestResults:
            return getInHouseTestResultsModal();
          case ModalName.SpecimenCollection:
            return getSpecimenCollectionModal(modal);
          case ModalName.TestResultReviewConfirmation:
            return getTestResultReviewConfirmation(modal);
          case ModalName.TestResultReleaseConfirmation:
            return getTestResultReleaseConfirmation(modal);
          case ModalName.HandoffConfirmation:
            return getHandoffConfirmationModal(modal);
          case ModalName.OrderCancellation:
            return getOrderCancellationModal(modal);
          // PatientPartnerModal
          case ModalName.PatientPartnerModal:
            return getPatientPartnerModal(modal);
          // Cancel Order creation Modal
          case ModalName.CancelOrderCreationModal:
            return getOrderCreationCancelModal();
          case ModalName.OrderValidationErrorModal:
            return getOrderValidationErrorModal(modal);
          // Error Modal
          case ModalName.ErrorModal:
            return getErrorModal();
          //  Task Dashboard
          case ModalName.CreateTaskModal:
            return getTaskCreateModal();
          case ModalName.TaskDetailsModal:
            return getTaskDetailsModal(modal);
          case ModalName.TaskStatusUpdateModal:
            return getTaskStatusUpdateModal(modal);
          case ModalName.ReassignTaskModal:
            return getReassignTaskModal(modal);
          case ModalName.VerifyPatientPhotoModal:
            return getVerifyPatientPhotoModal();
          case ModalName.ImageModal:
            return getImageModal(modal);
          // Alerts
          case ModalName.AddOrEditCustomAlertModal:
            return getAddOrEditCustomAlertModal(modal);
          case ModalName.ConfirmAlertDeleteModal:
            return getConfirmAlertDeleteModal(modal);
          // Medical Background
          case ModalName.MedicalBackgroundUnsavedChanges:
            return getMedicalBackgroundUnsavedChangesModal(modal);
          // Medications
          case ModalName.AddPatientMedicationModal:
            return getAddPatientMedicationModalModal();
          case ModalName.AddPatientPrescriptionModal:
            return getAddPatientPrescriptionsModal();
          case ModalName.PrescriptionsArchive:
            return getConfirmPrescriptionArchiveModal(modal);
          // dev
          case ModalName.DevToolsModal:
            return getDevToolsModal();
          default:
            return null;
        }
      })}
    </>
  );
};
