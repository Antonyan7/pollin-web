import { useCallback, useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { bookingMiddleware, bookingSelector } from '@redux/slices/booking';
import { viewsMiddleware } from '@redux/slices/views';
import { cancellationReasons } from 'helpers/constants';
import { ModalName } from 'types/modals';

const useCancelAppointmentControls = (appointmentId: string) => {
  const appointmentStatus = useAppSelector(bookingSelector.appointmentStatus);
  const [openOtherReasonField, setOpenOtherReasonField] = useState<boolean>(false);
  const [cancellationReason, setCancellationReason] = useState<string>('');

  const onSelectButtonChange = useCallback((event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    const isOtherField = value === cancellationReasons[cancellationReasons.length - 1];

    setOpenOtherReasonField(isOtherField);
    setCancellationReason(isOtherField ? '' : value);
  }, []);

  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.CancelAppointmentModal));
  }, []);

  useEffect(() => {
    if (appointmentStatus.cancel.success) {
      dispatch(viewsMiddleware.closeModal(ModalName.EditAppointmentModal));
      onClose();
    }
  }, [appointmentStatus.cancel.success, onClose]);

  const onConfirm = useCallback(() => {
    setOpenOtherReasonField(false);
    dispatch(bookingMiddleware.cancelAppointment(appointmentId, cancellationReason));
    dispatch(bookingMiddleware.clearAppointmentDetails());
  }, [appointmentId, cancellationReason]);

  const onReasonChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setCancellationReason(event.target.value);
  }, []);

  return {
    onConfirm,
    onReasonChange,
    onClose,
    onSelectButtonChange,
    openOtherReasonField,
    cancellationReason
  };
};

export default useCancelAppointmentControls;
