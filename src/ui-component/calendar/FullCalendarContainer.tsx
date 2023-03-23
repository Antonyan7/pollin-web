/* eslint-disable simple-import-sort/imports */

import { DateSelectArg, EventClickArg } from '@fullcalendar/common';
import React, { useCallback } from 'react';
import { dispatch, useAppSelector } from '@redux/hooks';

import { AddAppointmentSources } from '@components/Modals/Booking/AddAppointmentModal/types';
import FullCalendar from '@fullcalendar/react';
import { ICalendarSlot } from 'types/reduxTypes/bookingStateTypes';
import { ModalName } from 'types/modals';
import { bookingSelector } from '@redux/slices/booking';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import { useCalendarDefaultConfig } from './hooks/useCalendarDefaultConfig';
import { viewsMiddleware } from '@redux/slices/views';

interface FullCalendarContainerProps {
  slots: ICalendarSlot[];
  calendarDate: Date;
  calendarRef: FullCalendar['elRef'];
  onEventClick: (initialEventObject: EventClickArg) => void;
}

const FullCalendarContainer: React.FC<FullCalendarContainerProps> = ({
  slots,
  calendarDate,
  calendarRef,
  onEventClick
}) => {
  const calendarDefaultConfig = useCalendarDefaultConfig();
  const serviceProviderId = useAppSelector(bookingSelector.serviceProviderId);
  const onRangeSelect = useCallback(
    (arg: DateSelectArg) => {
      const isRangeStartEarlierThanToday = new Date(arg.start).getTime() < new Date().setHours(0, 0, 0, 0);
      if (isRangeStartEarlierThanToday) {
        return;
      }

      dispatch(
        viewsMiddleware.openModal({
          name: ModalName.AddAppointmentModal,
          props: {
            start: arg.startStr,
            source: AddAppointmentSources.Booking,
            providerId: serviceProviderId
          }
        })
      );
    },
    [serviceProviderId]
  );

  return (
    <FullCalendar
      {...calendarDefaultConfig}
      events={slots}
      ref={calendarRef}
      select={onRangeSelect as () => void}
      eventClick={onEventClick as () => void}
      initialDate={calendarDate}
      plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
    />
  );
};

export default FullCalendarContainer;
