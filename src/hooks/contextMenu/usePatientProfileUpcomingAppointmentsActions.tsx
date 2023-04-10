import { useCallback } from 'react';
import { AddAppointmentSources } from '@components/Modals/Booking/AddAppointmentModal/types';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { filterActionBindings, getActionTitleById } from 'helpers/contextMenu';
import { ModalName } from 'types/modals';
import { ContextMenuAction } from 'types/reduxTypes/resultsStateTypes';

import { UpcomingAppointmentContextMenuOptions } from '../../types/patientProfile';

const usePatientProfileUpcomingAppointmentsActions = (
  patientProfile: { id: string; fullName: string } | null,
  actions: ContextMenuAction[] = []
) => {
  const handleAddAppointmentModalOpeningAction = useCallback(() => {
    dispatch(
      viewsMiddleware.openModal({
        name: ModalName.AddAppointmentModal,
        props: {
          patient: {
            id: patientProfile?.id,
            name: patientProfile?.fullName
          },
          source: AddAppointmentSources.Profile
        }
      })
    );
  }, [patientProfile]);

  const handleSendBookingRequestToPatientAction = useCallback(() => {
    // TODO: To be handled after TEAMA-5192
  }, []);

  const actionBindings = [
    {
      id: UpcomingAppointmentContextMenuOptions.addAppointment,
      title: getActionTitleById(UpcomingAppointmentContextMenuOptions.addAppointment, actions),
      actionCallback: () => {
        handleAddAppointmentModalOpeningAction();
      }
    },
    {
      id: UpcomingAppointmentContextMenuOptions.sendRequestToPatient,
      title: getActionTitleById(UpcomingAppointmentContextMenuOptions.sendRequestToPatient, actions),
      actionCallback: () => {
        handleSendBookingRequestToPatientAction();
      }
    }
  ];

  return filterActionBindings(actions, actionBindings);
};

export default usePatientProfileUpcomingAppointmentsActions;
