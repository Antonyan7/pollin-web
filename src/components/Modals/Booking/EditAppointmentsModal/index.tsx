import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';
import { ModalName } from 'types/modals';

import BaseModal from '@ui-component/Modal/BaseModal';

import EditAppointmentsModalForm from './form';

export interface EditAppointmentModalProps {
  appointmentId: string;
}

const EditAppointmentsModal = ({ appointmentId }: EditAppointmentModalProps) => {
  const [t] = useTranslation();
  const serviceProviderId = useAppSelector(bookingSelector.serviceProviderId);
  const details = useAppSelector(bookingSelector.appointmentDetails);
  const [modalLoading, setModalLoading] = useState(true);
  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.EditAppointmentModal));
    dispatch(bookingMiddleware.clearAppointmentDetails());
  }, []);

  const editTitleLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_TITLE);

  useEffect(() => {
    if (serviceProviderId) {
      dispatch(bookingMiddleware.getServiceTypes({ resourceId: serviceProviderId }));
    }
  }, [serviceProviderId]);

  useEffect(() => {
    if (appointmentId) {
      dispatch(bookingMiddleware.getAppointmentDetails(appointmentId));
    }
  }, [appointmentId]);

  useEffect(() => {
    if (details) {
      setModalLoading(false);
    }
  }, [details]);

  return (
    <BaseModal
      closeIconDataCy={CypressIds.MODAL_APPOINTMENTS_EDIT_CLOSE_ICON}
      dialogContentCy={CypressIds.MODAL_APPOINTMENTS_EDIT_DIALOG}
      isLoading={modalLoading}
      title={editTitleLabel}
      onClose={onClose}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <EditAppointmentsModalForm />
      </LocalizationProvider>
    </BaseModal>
  );
};

export default EditAppointmentsModal;
