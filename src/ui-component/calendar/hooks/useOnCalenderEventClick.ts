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

      if (nonIntractableAppointments.includes(targetAppointment?.type as SlotTypes) || !targetAppointment?.isEditable) {
        return;
      }

      if (id) {
        if (new Date(initialEventObject.event.startStr).getTime() < new Date().getTime()) {
          dispatch(
            viewsMiddleware.setModalState({ name: ModalName.DetailsAppointmentModal, props: { appointmentId: id } })
          );
        } else {
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
