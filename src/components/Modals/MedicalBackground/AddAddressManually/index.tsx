import React, { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AddManuallyAddressModalProps } from '@axios/patientEmr/managerPatientEmrTypes';
import AddAddressManuallyModalForm from '@components/Modals/MedicalBackground/AddAddressManually/form';
import {
  getInitialValues,
  ManuallyAddressModalMode
} from '@components/Modals/MedicalBackground/AddAddressManually/helpers';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog } from '@mui/material';
import { dispatch } from 'redux/hooks';
import { viewsMiddleware } from 'redux/slices/views';
import { ModalName } from 'types/modals';
import { addManuallyAddressModalValidationSchema } from 'validation/medicalBackground/add_manually_address';

export interface AddAddressManuallyProps {
  mode: ManuallyAddressModalMode;
}

const AddAddressManually = ({ mode }: AddAddressManuallyProps) => {
  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.AddAddressManually));
  }, []);
  const methods = useForm<AddManuallyAddressModalProps>({
    defaultValues: getInitialValues(),
    mode: 'onSubmit',
    resolver: yupResolver(addManuallyAddressModalValidationSchema)
  });

  return (
    <FormProvider {...methods}>
      <Dialog open onClose={onClose}>
        <AddAddressManuallyModalForm mode={mode} />
      </Dialog>
    </FormProvider>
  );
};

export default AddAddressManually;
