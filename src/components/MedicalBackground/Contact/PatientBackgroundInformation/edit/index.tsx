import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IPatientBackgroundPartners } from '@axios/patientEmr/managerPatientEmrTypes';
import FormSubmit from '@components/common/Form/Footer/FormSubmit';
import {
  getBackgroundInformationEmptyState,
  IPatientBackgroundInformationForm
} from '@components/MedicalBackground/Contact/PatientBackgroundInformation/edit/helpers';
import { patientBackgroundInformationValidationSchema } from '@components/MedicalBackground/helpers/contact_validation';
import useCloseMedicalBackgroundFormWithChangesModal from '@components/MedicalBackground/hooks/useCloseMedicalBackgroundFormWithChangesModal';
import { yupResolver } from '@hookform/resolvers/yup';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { useRouter } from 'next/router';

import PatientBackgroundInformationEditForm from './form';

const PatientBackgroundInformationEdit = () => {
  const router = useRouter();
  const currentPatientId = router.query.id;
  const patientInformation = useAppSelector(patientsSelector.patientBackgroundInformation);
  const isUpdatePatientBackgroundInformationLoading = useAppSelector(
    patientsSelector.isUpdatePatientBackgroundInformationLoading
  );
  const methods = useForm<IPatientBackgroundInformationForm>({
    defaultValues: getBackgroundInformationEmptyState(patientInformation as IPatientBackgroundPartners),
    resolver: yupResolver(patientBackgroundInformationValidationSchema),
    mode: 'onSubmit',
    shouldFocusError: true,
    criteriaMode: 'all'
  });
  const {
    handleSubmit,
    formState: { dirtyFields }
  } = methods;

  const onBackgroundInformationSubmit = (values: IPatientBackgroundInformationForm) => {
    if (typeof currentPatientId === 'string') {
      const { referringDoctorName, ...referringDoctorRest } = values.referringDoctor;
      const { familyDoctorName, ...familyDoctorRest } = values.familyDoctor;
      const { pharmacyName, ...pharmacyRest } = values.pharmacy;
      const patientBackgroundValues = {
        ...values,
        referringDoctor: {
          ...referringDoctorRest,
          name: values.referringDoctor.value ? values.referringDoctor.referringDoctorName : ''
        },
        familyDoctor: {
          ...familyDoctorRest,
          name: values.familyDoctor.value ? values.familyDoctor.familyDoctorName : ''
        },
        pharmacy: {
          ...pharmacyRest,
          name: values.pharmacy.exists ? values.pharmacy.pharmacyName : '',
          address: {
            street: values.pharmacy.exists ? values.pharmacy.address.street : '',
            unit: values.pharmacy.exists ? values.pharmacy.address.unit : '',
            city: values.pharmacy.exists ? values.pharmacy.address.city : '',
            country: values.pharmacy.exists ? values.pharmacy.address.country : '',
            postalCode: values.pharmacy.exists ? values.pharmacy.address.postalCode : '',
            faxNumber: values.pharmacy.exists ? values.pharmacy.address.faxNumber : '',
            phoneNumber: values.pharmacy.exists ? values.pharmacy.address.phoneNumber : ''
          }
        }
      };

      dispatch(patientsMiddleware.updatePatientBackgroundInformation(currentPatientId, patientBackgroundValues));
    }
  };

  const handleClose = () => {
    dispatch(patientsMiddleware.changePatientBackgroundEditButtonState());
  };
  const isFormChanged = Object.values(dirtyFields).length > 0;
  const onClose = useCloseMedicalBackgroundFormWithChangesModal(isFormChanged, handleClose);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onBackgroundInformationSubmit)}>
        <PatientBackgroundInformationEditForm />
        <FormSubmit
          onClick={onClose}
          isDisabled={!isFormChanged}
          isLoading={isUpdatePatientBackgroundInformationLoading}
        />
      </form>
    </FormProvider>
  );
};

export default PatientBackgroundInformationEdit;
