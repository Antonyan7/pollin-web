import { useCallback } from 'react';
import { EventClickArg } from '@fullcalendar/common';
import { ModalName } from 'constants/modals';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';
import { SlotTypes } from 'types/calendar';

const useOnCalendarEventClick = () => {
  const appointments = useAppSelector(bookingSelector.appointmentsList);

  return useCallback(
    (initialEventObject: EventClickArg) => {
      initialEventObject.jsEvent.preventDefault();

      const { id } = initialEventObject.event;
      const targetAppointment = appointments.find((appointment) => appointment.id === id);
      const nonIntractableAppointments = [SlotTypes.block, SlotTypes.schedule];

      if (nonIntractableAppointments.includes(targetAppointment?.type as SlotTypes)) {
        return;
      }

      if (id) {
        const isAppointmentCanceledOrPast =
          targetAppointment?.type === SlotTypes.canceled ||
          new Date(initialEventObject.event.startStr).getTime() < new Date().getTime();

        if (isAppointmentCanceledOrPast) {
          dispatch(
            viewsMiddleware.setModalState({ name: ModalName.DetailsAppointmentModal, props: { appointmentId: id } })
          );
        } else if (targetAppointment?.isEditable) {
          dispatch(
            viewsMiddleware.setModalState({
              name: ModalName.EditAppointmentModal,
              props: { appointmentId: id }
            })
          );
        }
      }
    },
    [appointments]
  );
};

export default useOnCalendarEventClick;
