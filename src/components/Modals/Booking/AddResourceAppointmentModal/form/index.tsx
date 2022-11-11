import React, { useCallback, useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ICreatedAppointmentBody } from '@axios/booking/managerBookingTypes';
import { SeveritiesType } from '@components/Scheduling/types';
import { coreSelector } from '@redux/slices/core';
import { Translation } from 'constants/translations';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';
import { ModalName, OpenModalReason } from 'types/modals';

import { customizedTimeForWorkingHours } from '@utils/dateUtils';

import FormActions from './FormActions';
import FormBody from './FormBody';
import FormHeader from './FormHeader';

const AddAppointmentsModalForm = () => {
  const { handleSubmit } = useFormContext<ICreatedAppointmentBody>();
  const { control } = useFormContext<ICreatedAppointmentBody>();
  const patientAlerts = useAppSelector(bookingSelector.patientAlerts);
  const { workingHours } = useAppSelector(coreSelector.clinicConfigs);
  const [t] = useTranslation();

  const isDuplicatePatientName = useMemo(() => {
    if (!patientAlerts?.length) {
      return false;
    }

    const duplicateAlert = patientAlerts.find((alertDetails) => alertDetails.title === OpenModalReason.DuplicateName);

    return !!duplicateAlert;
  }, [patientAlerts]);

  const patientId = useWatch({ name: 'patientId', control });

  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.AddResourceAppointmentModal));
    dispatch(bookingMiddleware.getPatients(null));
    dispatch(bookingMiddleware.getPatientAlerts(''));
  }, []);

  const providerId = useAppSelector(bookingSelector.serviceProviderId);

  useEffect(() => {
    if (isDuplicatePatientName) {
      dispatch(
        viewsMiddleware.openModal({
          name: ModalName.AddAppointmentDuplicatePatientModal,
          props: { patientId }
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDuplicatePatientName]);

  const onSubmit = useCallback(
    (values: ICreatedAppointmentBody) => {
      const body: ICreatedAppointmentBody = {
        ...values,
        providerId
      };

      const formattedTime = customizedTimeForWorkingHours(values.date as string);
      const isSubmittingTimeInvalid = formattedTime < workingHours.start || formattedTime > workingHours.end;

      if (isSubmittingTimeInvalid) {
        dispatch(
          viewsMiddleware.setToastNotificationPopUpState({
            open: true,
            props: {
              severityType: SeveritiesType.error,
              description: t(Translation.PAGE_APPOINTMENTS_OUTSIDE_HOURS_FAIL_STATUS)
            }
          })
        );
      } else {
        dispatch(bookingMiddleware.createAppointment(body));
      }

      onClose();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onClose, providerId, workingHours.end, workingHours.start]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader />
      <FormBody />
      <FormActions isActionButtonDisabled={isDuplicatePatientName} />
    </form>
  );
};

export default AddAppointmentsModalForm;
