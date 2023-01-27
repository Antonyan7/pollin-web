import React from 'react';
import { ToastNotification } from '@components/ToastNotification';
import { useAppSelector } from 'redux/hooks';
import { viewsSelector } from 'redux/slices/views';

export const ToastNotificationsController = () => {
  const toastNotificationPopUp = useAppSelector(viewsSelector.toastNotificationPopUp);

  return toastNotificationPopUp.open === false ? null : <ToastNotification />;
};
