import { dispatch, useAppSelector } from 'redux/hooks';

import { DateUtil } from '@utils/date/DateUtil';
import { EventClickArg } from '@fullcalendar/common';
import { ModalName } from 'types/modals';
import { SlotTypes } from 'types/calendar';
import { bookingSelector } from 'redux/slices/booking';
import { useCallback } from 'react';
import { viewsMiddleware } from 'redux/slices/views';

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
          new Date(initialEventObject.event.startStr).getTime() < DateUtil.representInClinicDate().getTime();
        if (isAppointmentCanceledOrPast) {
          dispatch(
            viewsMiddleware.openModal({ name: ModalName.DetailsAppointmentModal, props: { appointmentId: id } })
          );
        } else if (targetAppointment?.isEditable) {
          dispatch(
            viewsMiddleware.openModal({
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
