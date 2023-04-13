import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DropdownOptionType, IFemalePregnancyInformationProps } from '@axios/patientEmr/managerPatientEmrTypes';
import FlexibleSection from '@components/common/Form/FlexibleSection';
import FormSubmit from '@components/common/Form/Footer/FormSubmit';
import { FlexibleItemType } from '@components/common/Form/types';
import { femalePregnancyInformationValidationSchema } from '@components/MedicalBackground/helpers/medical_history_validation';
import useSaveMedicalBackgroundDataWithToast from '@components/MedicalBackground/hooks/useSaveMedicalBackgroundDataWithToast';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';

import useCloseMedicalBackgroundFormWithChangesModal from '../../../hooks/useCloseMedicalBackgroundFormWithChangesModal';

import DynamicRow from './DynamicRow';
import NumberOfPregnancies from './NumberOfPregnancies';

const EditModeContent = ({ handleClose }: { handleClose: () => void }) => {
  const femalePregnancyInformation = useAppSelector(patientsSelector.femalePregnancyInformation);
  const [t] = useTranslation();
  const {
    query: { id }
  } = useRouter();
  const isUpdatingFemalePregnancyData = useAppSelector(patientsSelector.isFemalePregnancyInformationDataUpdating);

  const methods = useForm({
    defaultValues: femalePregnancyInformation
      ? { ...femalePregnancyInformation }
      : {
          numberOfPregnancies: 0,
          previousPregnancies: {
            pregnancies: [],
            id: '',
            note: '',
            isEditable: false,
            value: false
          }
        },
    resolver: yupResolver(femalePregnancyInformationValidationSchema)
  });

  const {
    formState: { dirtyFields }
  } = methods;

  const isFormChanged = Object.values(dirtyFields).length > 0;
  const onClose = useCloseMedicalBackgroundFormWithChangesModal(isFormChanged, handleClose);
  const onSave = useSaveMedicalBackgroundDataWithToast(handleClose);

  const { handleSubmit } = methods;

  const handleSave = (data: IFemalePregnancyInformationProps) => {
    dispatch(patientsMiddleware.updateFemalePregnancyInformation(id as string, data, onSave));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleSave)}>
        <Grid>
          <FlexibleSection
            fieldName="previousPregnancies"
            title={t(
              Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_PREVIOUS_PREGNANCY
            )}
            tableTitle={t(
              Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_PREGNANCY
            )}
            rows={[
              [
                {
                  type: FlexibleItemType.Dropdown,
                  fieldName: 'type',
                  dropdownType: DropdownOptionType.TypeOfPregnancy,
                  label: t(
                    Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_TYPE_OF_PREGNANCY
                  )
                }
              ],
              DynamicRow
            ]}
            controlFieldName="previousPregnancies.value"
            itemsFieldName="pregnancies"
            addNewItemButtonLabel={
              t(
                Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_ADD_PREGNANCY_BTN
              ) ?? ''
            }
            initialFields={{ type: '' }}
          />
          <NumberOfPregnancies />
        </Grid>
        <FormSubmit onClick={onClose} isDisabled={!isFormChanged} isLoading={isUpdatingFemalePregnancyData} />
      </form>
    </FormProvider>
  );
};

export default EditModeContent;
