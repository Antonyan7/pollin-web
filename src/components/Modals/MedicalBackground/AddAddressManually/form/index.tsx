import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { AddManuallyAddressModalProps } from '@axios/patientEmr/managerPatientEmrTypes';
import { Box, Divider } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { patientsMiddleware } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import { ManuallyAddressModalMode } from '../helpers';
import { AddAddressManuallyProps } from '..';

import FormActions from './FormActions';
import FormBody from './FormBody';
import FormHeader from './FormHeader';

const AddAddressManuallyModalForm = ({ mode }: AddAddressManuallyProps) => {
  const { handleSubmit } = useFormContext<AddManuallyAddressModalProps>();
  const onClose = () => dispatch(viewsMiddleware.closeModal(ModalName.AddAddressManually));

  const onSubmit = useCallback(
    (values: AddManuallyAddressModalProps) => {
      if (mode === ManuallyAddressModalMode.Primary) {
        dispatch(patientsMiddleware.changeManuallyAddressForPrimary(values));
      } else {
        dispatch(patientsMiddleware.changeManuallyAddressForMailing(values));
      }

      onClose();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader />
      <FormBody />
      <Box sx={{ padding: `${paddings.topBottom0} ${paddings.leftRight24}` }}>
        <Divider />
        <FormActions />
      </Box>
    </form>
  );
};

export default AddAddressManuallyModalForm;
