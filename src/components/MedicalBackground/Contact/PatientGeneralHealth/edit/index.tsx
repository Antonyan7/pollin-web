import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IGeneralHealthProps } from '@axios/patientEmr/managerPatientEmrTypes';
import PatientGeneralHealthEditForm from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form';
import { FormSubmit } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form/actions';
import { getGeneralHealthEditFormState } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/helpers';
import { nonValidProperty } from '@components/MedicalBackground/helpers';
import { patientGeneralHealthValidationSchema } from '@components/MedicalBackground/helpers/contact_validation';
import useCloseMedicalBackgroundFormWithChangesModal from '@components/MedicalBackground/hooks/useCloseMedicalBackgroundFormWithChangesModal';
import { yupResolver } from '@hookform/resolvers/yup';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { useRouter } from 'next/router';

import { DateUtil } from '@utils/date/DateUtil';

const PatientGeneralHealthEdit = () => {
  const router = useRouter();
  const currentPatiendId = router.query.id;
  const generalHelth = useAppSelector(patientsSelector.generalHealth);
  const isGeneralHealthDataUpdating = useAppSelector(patientsSelector.isGeneralHealthDataUpdating);

  const methods = useForm<IGeneralHealthProps>({
    defaultValues: getGeneralHealthEditFormState(generalHelth as IGeneralHealthProps),
    resolver: yupResolver(patientGeneralHealthValidationSchema),
    mode: 'onSubmit',
    shouldFocusError: true,
    criteriaMode: 'all'
  });
  const {
    handleSubmit,
    formState: { dirtyFields }
  } = methods;

  const onGeneralHealthSubmit = (healthData: IGeneralHealthProps) => {
    const {
      medicalProblems,
      pastSurgeries,
      vitaminSupplements,
      drugAllergies,
      foodAllergies,
      familyHistory,
      activeConsultsList,
      diet,
      ...otherGeneralInfo
    } = healthData;
    const generalHealthData = {
      ...otherGeneralInfo,
      ...(diet?.value === '' ? {} : { diet }),
      ...(nonValidProperty(activeConsultsList?.value) ? {} : { activeConsultsList }),
      medicalProblems: {
        ...medicalProblems,
        items: medicalProblems.exists ? medicalProblems.items : []
      },
      pastSurgeries: {
        ...pastSurgeries,
        items: pastSurgeries.exists
          ? pastSurgeries.items.map((item) => {
              const { dateOfSurgery, ...rest } = item;

              return {
                ...rest,
                dateOfSurgery: DateUtil.convertToDateOnly(dateOfSurgery)
              };
            })
          : []
      },
      vitaminSupplements: {
        ...vitaminSupplements,
        items: vitaminSupplements.exists ? vitaminSupplements.items : []
      },
      drugAllergies: {
        ...drugAllergies,
        items: drugAllergies.exists ? drugAllergies.items : []
      },
      foodAllergies: {
        ...foodAllergies,
        items: foodAllergies.exists ? foodAllergies.items : []
      },
      familyHistory: {
        ...familyHistory,
        items: familyHistory.exists ? familyHistory.items : []
      }
    };

    if (typeof currentPatiendId === 'string') {
      dispatch(patientsMiddleware.updateGeneralHealthData(currentPatiendId, generalHealthData));
    }
  };

  const handleClose = () => {
    dispatch(patientsMiddleware.changeEditButtonClickState());
  };
  const isFormChanged = Object.values(dirtyFields).length > 0;
  const onClose = useCloseMedicalBackgroundFormWithChangesModal(isFormChanged, handleClose);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onGeneralHealthSubmit)}>
        <PatientGeneralHealthEditForm />
        <FormSubmit onClick={onClose} isDisabled={!isFormChanged} isLoading={isGeneralHealthDataUpdating} />
      </form>
    </FormProvider>
  );
};

export default PatientGeneralHealthEdit;
