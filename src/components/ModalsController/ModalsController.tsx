import React from 'react';
import AddAppointmentDuplicatePatientModal, {
  AddAppointmentDuplicatePatientModalProps
} from '@components/Modals/Booking/AddAppointmentDuplicatePatientModal';
import AddAppointmentsModal, { AddAppointmentsModalProps } from '@components/Modals/Booking/AddAppointmentsModal';
import CancelAppointmentModal, { CancelAppointmentModalProps } from '@components/Modals/Booking/CancelAppointmentModal';
import DetailsAppointmentModal, {
  DetailsAppointmentModalProps
} from '@components/Modals/Booking/DetailsAppointmentModal';
import EditAppointmentsModal, { EditAppointmentModalProps } from '@components/Modals/Booking/EditAppointmentsModal';
import DevToolsModal from '@components/Modals/DevToolsModal/DevToolsModal';
import EncountersCancelChangesModal from '@components/Modals/PatientEMR/Encounters/EncountersCancelChangesModal';
import ScheduleTemplatesErrorModal, {
  ScheduleTemplatesErrorModalProps
} from '@components/Modals/Scheduling/ScheduleTemplatesErrorModal';
import { ModalName } from 'constants/modals';
import { useAppSelector } from 'redux/hooks';
import { viewsSelector } from 'redux/slices/views';
import { IOpenedModal } from 'types/reduxTypes/views';

// <BOOKING>
// appointments
const getDetailsAppointmentModal = (modal: IOpenedModal<DetailsAppointmentModalProps>) => (
  <DetailsAppointmentModal key={modal.name} {...modal.props} />
);
const getAddAppointmentModal = (modal: IOpenedModal<AddAppointmentsModalProps>) => (
  <AddAppointmentsModal key={modal.name} {...modal.props} />
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
          case ModalName.AddAppointmentModal:
            return getAddAppointmentModal(modal);
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
