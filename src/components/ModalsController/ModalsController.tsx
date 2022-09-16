import React from 'react';
import AddAppointmentsModal from '@components/Appointments/AddAppointmentsModal';
import ConfirmAppointmentsModal from '@components/Appointments/ConfirmAppointmentCancelModal';
import DetailsAppointmentModal from '@components/Appointments/DetailsAppointmentModal';
import EditAppointmentsModal from '@components/Appointments/EditAppointmentsModal';
import DevToolsModal from '@components/Modals/DevToolsModal/DevToolsModal';
import { ModalName } from 'constants/modals';
import { useAppSelector } from 'redux/hooks';
import { viewsSelector } from 'redux/slices/views';

import EncountersCancelChangesModal from '@ui-component/EncountersCancelChangesModal/EncountersCancelChangesModal';

export const ModalsController = () => {
  const modalState = useAppSelector(viewsSelector.modal);

  return modalState.name === ModalName.NONE ? null : (
    <>
      {modalState.name === ModalName.AddAppointmentsModal && <AddAppointmentsModal />}
      {modalState.name === ModalName.EditAppointmentModal && <EditAppointmentsModal />}
      {modalState.name === ModalName.ConfirmAppointmentCancelModal && <ConfirmAppointmentsModal />}
      {modalState.name === ModalName.DetailsAppointmentModal && <DetailsAppointmentModal />}
      {modalState.name === ModalName.EncountersCancelChangesModal && <EncountersCancelChangesModal />}
      {modalState.name === ModalName.DevTools && <DevToolsModal />}
    </>
  );
};
