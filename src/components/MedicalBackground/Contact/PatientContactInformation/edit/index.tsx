import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IPatientContactInformationProps } from '@axios/patientEmr/managerPatientEmrTypes';
import FormSubmit from '@components/MedicalBackground/components/common/FormSubmit';
import { SamePrimaryAddressProvider } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/context/SamePrimaryAddressContext';
import { getContactInformationEmptyState } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/helpers';
import { patientContactInformationValidationSchema } from '@components/MedicalBackground/helpers/contact_validation';
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
  const { handleSubmit } = methods;

  const onContactInformationSubmit = (values: IPatientContactInformationProps) => {
    if (typeof currentPatiendId === 'string') {
      dispatch(patientsMiddleware.updatePatientContactInformation(currentPatiendId, values));
    }
  };

  const onCancelClick = () => {
    dispatch(patientsMiddleware.changeContactInformationEditButtonState());
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onContactInformationSubmit)}>
        <Grid sx={{ py: paddings.topBottom32 }}>
          <SamePrimaryAddressProvider>
            <PatientContactInformationEditForm />
            <FormSubmit onClick={onCancelClick} isLoading={isContactInformationDataUpdating} />
          </SamePrimaryAddressProvider>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default PatientContactInformationEdit;
