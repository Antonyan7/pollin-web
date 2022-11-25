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
import EncountersCancelChangesModal from '@components/Modals/PatientEMR/Encounters/EncountersCancelChangesModal';
import ScheduleTemplatesErrorModal, {
  ScheduleTemplatesErrorModalProps
} from '@components/Modals/Scheduling/ScheduleTemplatesErrorModal';
import SelectMachineModal, { SelectMachineModalProps } from '@components/Modals/SelectMachineModal';
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
import { IPatientContactInformationModalProps } from 'types/reduxTypes/resultsStateTypes';
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
          // profile highlight
          case ModalName.PatientLineItemsModal:
            return getPatientListItemsModal(modal);
          case ModalName.PatientMedicationsModal:
            return getPatientMedicationsModal(modal);
          case ModalName.PatientPartnersModal:
            return getPatientPartnersModal(modal);
          case ModalName.InHouseTestResults:
            return getInHouseTestResultsModal();
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
