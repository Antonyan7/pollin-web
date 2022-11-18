import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SeveritiesType } from '@components/Scheduling/types';
import { dispatch, useAppSelector } from '@redux/hooks';
import { bookingMiddleware, bookingSelector } from '@redux/slices/booking';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';

const useAppointmentStatusState = () => {
  const [t] = useTranslation();
  const appointmentStatus = useAppSelector(bookingSelector.appointmentStatus);
  const createAppointmentErrorState = useAppSelector(bookingSelector.createAppointmentErrorState);
  const resetBookingStatus = useCallback(() => {
    dispatch(bookingMiddleware.resetAppointmentStatus());
    dispatch(bookingMiddleware.clearCreateAppointmentErrorState());
  }, []);

  useEffect(() => {
    if (appointmentStatus.create.success) {
      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.success,
            description: t(Translation.PAGE_APPOINTMENTS_CREATE_SUCCESS_STATUS)
          }
        })
      );
    }

    if (appointmentStatus.edit.success) {
      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.success,
            description: t(Translation.PAGE_APPOINTMENTS_EDIT_SUCCESS_STATUS)
          }
        })
      );
    }

    if (appointmentStatus.cancel.success) {
      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.success,
            description: t(Translation.PAGE_APPOINTMENTS_CANCEL_SUCCESS_STATUS)
          }
        })
      );
    }

    if (appointmentStatus.create.fail && createAppointmentErrorState.message) {
      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.error,
            description: createAppointmentErrorState.message
          }
        })
      );
    }

    resetBookingStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    appointmentStatus.create.success,
    appointmentStatus.edit.success,
    appointmentStatus.cancel.success,
    createAppointmentErrorState.message,
    resetBookingStatus
  ]);
};

export default useAppointmentStatusState;
