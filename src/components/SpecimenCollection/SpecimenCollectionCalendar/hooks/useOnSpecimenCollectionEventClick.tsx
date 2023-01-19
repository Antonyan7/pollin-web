import { useCallback, useEffect, useState } from 'react';
import { IProvidersCollectionCalendarAppointment } from '@axios/booking/managerBookingTypes';
import { EventClickArg } from '@fullcalendar/common';
import { dispatch, useAppSelector } from '@redux/hooks';
import { bookingMiddleware, bookingSelector } from '@redux/slices/booking';
import { patientsMiddleware } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { ModalName } from 'types/modals';

const useOnSpecimenCollectionEventClick = () => {
  const [targetAppointment, setTargetAppointment] = useState<IProvidersCollectionCalendarAppointment | null>(null);
  const specimenAppointments = useAppSelector(bookingSelector.specimenAppointmentsList);
  const appointmentDetails = useAppSelector(bookingSelector.appointmentDetails);

  useEffect(() => {
    if (appointmentDetails?.patient.id && targetAppointment?.isEditable) {
      dispatch(patientsMiddleware.getPatientContactInformation(appointmentDetails?.patient.id));
      dispatch(
        viewsMiddleware.openModal({
          name: ModalName.PatientContactInformation,
          props: { ...targetAppointment, shouldBeRedirected: false }
        })
      );
    }
  }, [appointmentDetails, targetAppointment]);

  return useCallback(
    (initialEventObject: EventClickArg) => {
      initialEventObject.jsEvent.preventDefault();

      const { id } = initialEventObject.event;
      const targetSpecimenAppointment = specimenAppointments.find(
        (specimentAppointment) => specimentAppointment.id === id
      );

      if (targetSpecimenAppointment?.id) {
        dispatch(bookingMiddleware.getAppointmentDetails(targetSpecimenAppointment?.id));
        setTargetAppointment(targetSpecimenAppointment);
      }
    },
    [specimenAppointments]
  );
};

export default useOnSpecimenCollectionEventClick;
