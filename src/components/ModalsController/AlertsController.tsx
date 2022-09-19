import React from 'react';
import { AlertBanner } from '@components/Alert/Alert';
import { useAppSelector } from 'redux/hooks';
import { viewsSelector } from 'redux/slices/views';

export const AlertsController = () => {
  const alertPopUp = useAppSelector(viewsSelector.alertPopUp);

  return alertPopUp.open === false ? null : <AlertBanner />;
};
