import { useCallback } from 'react';
import { EventClickArg } from '@fullcalendar/common';
import { ModalName } from 'constants/modals';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';
import { SlotTypes } from 'types/calendar';

const useOnCalendarEventClick = () => {
  const appointments = useAppSelector(bookingSelector.appointmentsList);

  const onEventClick = useCallback(
    (initialEventObject: EventClickArg) => {
      initialEventObject.jsEvent.preventDefault();

      const { id } = initialEventObject.event;
      const targetAppointment = appointments.find((appointment) => appointment.id === id);

      const nonIntractableAppointments = [SlotTypes.block, SlotTypes.schedule];

      if (nonIntractableAppointments.includes(targetAppointment?.type as SlotTypes)) {
        return;
      }

      if (new Date(initialEventObject.event.startStr).getTime() < new Date().setHours(0, 0, 0, 0)) {
        dispatch(
          viewsMiddleware.setModalState({ name: ModalName.DetailsAppointmentModal, props: { appointmentId: id } })
        );
      } else {
        dispatch(viewsMiddleware.setModalState({ name: ModalName.EditAppointmentModal, props: { appointmentId: id } }));
      }
    },
    [appointments]
  );

  return onEventClick;
};

export default useOnCalendarEventClick;
