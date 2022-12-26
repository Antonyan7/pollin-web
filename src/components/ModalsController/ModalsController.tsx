import React from 'react';
import AddAppointmentDuplicatePatientModal, {
  AddAppointmentDuplicatePatientModalProps
} from '@components/Modals/Booking/AddAppointmentDuplicatePatientModal';
import AddResourceAppointmentModal, {
  AddResourceAppointmentModalProps
} from '@components/Modals/Booking/AddResourceAppointmentModal';
import CancelAppointmentModal from '@components/Modals/Booking/CancelAppointmentModal';
import { CancelAppointmentModalProps } from '@components/Modals/Booking/CancelAppointmentModal/types';
import DetailsAppointmentModal, {
  DetailsAppointmentModalProps
} from '@components/Modals/Booking/DetailsAppointmentModal';
import EditAppointmentsModal, { EditAppointmentModalProps } from '@components/Modals/Booking/EditAppointmentsModal';
import DevToolsModal from '@components/Modals/DevToolsModal/DevToolsModal';
import PatientContactInformationModal from '@components/Modals/ExternalResults/PatientContactInformationModal';
import InHouseInputResultsModal from '@components/Modals/InHouseTests/InputResults';
import OrderCancellation, { OrderCancellationProps } from '@components/Modals/Order/OrderCancellation';
import CancelOrderCreationModal from '@components/Modals/Order/OrderCreationCancel/CancelOrderCreation';
import TestResultReleaseConfirmationModal from '@components/Modals/Order/TestResultReleaseConfirmation';
import TestResultReviewConfirmationModal from '@components/Modals/Order/TestResultReviewConfirmation';
import EncountersCancelChangesModal from '@components/Modals/PatientEMR/Encounters/EncountersCancelChangesModal';
import PatientPartnerModal, { PatientPartnerModalProps } from '@components/Modals/PatientPartner';
import ScheduleTemplatesErrorModal, {
  ScheduleTemplatesErrorModalProps
} from '@components/Modals/Scheduling/ScheduleTemplatesErrorModal';
import SelectMachineModal, { SelectMachineModalProps } from '@components/Modals/SelectMachineModal';
import AddNewExistingTransportModal from '@components/Modals/Specimens/AddNewExistingTransport';
import AddNewTransportFolderModal from '@components/Modals/Specimens/AddNewTransportFolderModal';
import SpecimenTrackingCollectionModal from '@components/Modals/SpecimenTracking/Collection';
import { SpecimenTrackingCollectionModalProps } from '@components/Modals/SpecimenTracking/Collection/types';
import HandoffConfirmation, {
  HandoffConfirmationModalProps
} from '@components/Modals/SpecimenTracking/PatientContactInformationModal';
import AddPatientAppointmentsModal from '@components/Patients/PatientModals/AddPatientAppointment';
import PatientLineItemsModal, {
  PatientLineItemsModalProps
} from '@components/Patients/PatientModals/PatientLineItemsModal';
import PatientMedicationsModal, {
  PatientMedicationsModalProps
} from '@components/Patients/PatientModals/PatientMedicationsModal';
import PatientPartnersModal, {
  PatientPartnersModalProps
} from '@components/Patients/PatientModals/PatientPartnersModal';
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

// <BOOKING>
// appointments
const getDetailsAppointmentModal = (modal: IOpenedModal<DetailsAppointmentModalProps>) => (
  <DetailsAppointmentModal key={modal.name} {...modal.props} />
);
const getAddResourceAppointmentModal = (modal: IOpenedModal<AddResourceAppointmentModalProps>) => (
  <AddResourceAppointmentModal key={modal.name} {...modal.props} />
);
const getAddPatientAppointmentsModal = () => <AddPatientAppointmentsModal />;
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

// <SCHEDULING>
const getScheduleTemplatesErrorModal = (modal: IOpenedModal<ScheduleTemplatesErrorModalProps>) => (
  <ScheduleTemplatesErrorModal key={modal.name} {...modal.props} />
);

// <PATIENT EMR>
// encounters
const getEncountersCancelChangesModal = (modal: IOpenedModal<ScheduleTemplatesErrorModalProps>) => (
  <EncountersCancelChangesModal key={modal.name} />
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

const getInHouseTestResultsModal = () => <InHouseInputResultsModal />;
const getHandoffConfirmationModal = (modal: IOpenedModal<HandoffConfirmationModalProps>) => (
  <HandoffConfirmation key={modal.name} {...modal.props} />
);
const getOrderCancellationModal = (modal: IOpenedModal<OrderCancellationProps>) => (
  <OrderCancellation key={modal.name} {...modal.props} />
);

const getSpecimenTrackingCollectionModal = (modal: IOpenedModal<SpecimenTrackingCollectionModalProps>) => (
  <SpecimenTrackingCollectionModal key={modal.name} appointmentId={modal.props.appointmentId} />
);
// Patient Partner confirmation (Are you want to go to profile partners profile)
const getPatientPartnerModal = (modal: IOpenedModal<PatientPartnerModalProps>) => (
  <PatientPartnerModal key={modal.name} patientId={modal.props.patientId} />
);

// Patient Partner confirmation (Are you want to go to profile partners profile)
const getOrderCreationCancelModal = () => <CancelOrderCreationModal />;

// dev
const getDevToolsModal = () => <DevToolsModal />;

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
          case ModalName.AddResourceAppointmentModal:
            return getAddResourceAppointmentModal(modal);
          case ModalName.AddPatientAppointmentsModal:
            return getAddPatientAppointmentsModal();
          case ModalName.SelectMachineModal:
            return getSelectMachineModal(modal);
          case ModalName.EditAppointmentModal:
            return getEditAppointmentModal(modal);
          case ModalName.CancelAppointmentModal:
            return getCancelAppointmentModal(modal);
          case ModalName.AddAppointmentDuplicatePatientModal:
            return getAddAppointmentDuplicatePatientModal(modal);
          // <SCHEDULING>
          case ModalName.ScheduleTemplatesErrorModal:
            return getScheduleTemplatesErrorModal(modal);
          // <PATIENT EMR>
          // encounters
          case ModalName.EncountersCancelChangesModal:
            return getEncountersCancelChangesModal(modal);
          // <EXTERNAL RESULTS>
          case ModalName.PatientContactInformation:
            return getExternalResultsPatientInformationModal(modal);
          // <SPECIMENS>
          case ModalName.AddNewTransportFolderModal:
            return getAddNewTransportFolderModal(modal);
          case ModalName.AddNewExistingTransportModal:
            return getAddNewExistingTransportModal(modal);
          // profile highlight
          case ModalName.PatientLineItemsModal:
            return getPatientListItemsModal(modal);
          case ModalName.PatientMedicationsModal:
            return getPatientMedicationsModal(modal);
          case ModalName.PatientPartnersModal:
            return getPatientPartnersModal(modal);
          case ModalName.InHouseTestResults:
            return getInHouseTestResultsModal();
          case ModalName.SpecimenTrackingCollection:
            return getSpecimenTrackingCollectionModal(modal);
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
