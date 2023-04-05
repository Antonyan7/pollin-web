import { useCallback } from 'react';
import { EventClickArg } from '@fullcalendar/common';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';
import { SlotTypes } from 'types/calendar';
import { ModalName } from 'types/modals';

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
        if (targetAppointment?.isEditable) {
          dispatch(
            viewsMiddleware.openModal({
              name: ModalName.EditAppointmentModal,
              props: { appointmentId: id }
            })
          );
        } else {
          dispatch(
            viewsMiddleware.openModal({ name: ModalName.DetailsAppointmentModal, props: { appointmentId: id } })
          );
        }
      }
    },
    [appointments]
  );
};

export default useOnCalendarEventClick;
