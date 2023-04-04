import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IPatientContactInformationProps } from '@axios/patientEmr/managerPatientEmrTypes';
import FormSubmit from '@components/MedicalBackground/components/common/FormSubmit';
import { SamePrimaryAddressProvider } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/context/SamePrimaryAddressContext';
import { getContactInformationEmptyState } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/helpers';
import { patientContactInformationValidationSchema } from '@components/MedicalBackground/helpers/contact_validation';
import useCloseMedicalBackgroundFormWithChangesModal from '@components/MedicalBackground/hooks/useCloseMedicalBackgroundFormWithChangesModal';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { useRouter } from 'next/router';
import { paddings } from 'themes/themeConstants';

import PatientContactInformationEditForm from './form';

const PatientContactInformationEdit = () => {
  const router = useRouter();
  const currentPatiendId = router.query.id;
  const contactInformation = useAppSelector(patientsSelector.contactInformation);
  const isContactInformationDataUpdating = useAppSelector(patientsSelector.isContactInformationDataUpdating);

  const methods = useForm<IPatientContactInformationProps>({
    defaultValues: getContactInformationEmptyState(contactInformation as IPatientContactInformationProps),
    resolver: yupResolver(patientContactInformationValidationSchema),
    mode: 'onSubmit'
  });
  const {
    handleSubmit,
    formState: { dirtyFields }
  } = methods;

  const onContactInformationSubmit = (values: IPatientContactInformationProps) => {
    const { OHIP, isSameAddressChecked, ...contactInformationValues } = values;
    const contactData = {
      ...contactInformationValues,
      OHIP: {
        ...OHIP,
        versionCode: OHIP.exists ? OHIP.versionCode : '',
        number: OHIP.exists ? OHIP.number : '',
      }
    }

    if (typeof currentPatiendId === 'string') {
      dispatch(patientsMiddleware.updatePatientContactInformation(currentPatiendId, contactData));
    }
  };

  const handleClose = () => {
    dispatch(patientsMiddleware.changeContactInformationEditButtonState());
  };

  const isFormChanged = Object.values(dirtyFields).length > 0;
  const onClose = useCloseMedicalBackgroundFormWithChangesModal(isFormChanged, handleClose);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onContactInformationSubmit)}>
        <Grid sx={{ py: paddings.topBottom32 }}>
          <SamePrimaryAddressProvider>
            <PatientContactInformationEditForm />
            <FormSubmit onClick={onClose} isLoading={isContactInformationDataUpdating} isDisabled={!isFormChanged} />
          </SamePrimaryAddressProvider>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default PatientContactInformationEdit;
