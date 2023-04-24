import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormLabel } from '@components/common';
import { AdvancedFieldType } from '@components/common/Form/AdvancedField';
import FlexibleSection from '@components/common/Form/FlexibleSection';
import { FlexibleItemType } from '@components/common/Form/types';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware } from '@redux/slices/patients';
import { plansSelector } from '@redux/slices/plans';
import { Translation } from 'constants/translations';
import { t } from 'i18next';

import { FirstDynamicRow, SecondDynamicRow, ThirdDynamicRow } from './DynamicRows';

export const MedicationsForm = () => {
  const categories = useAppSelector(plansSelector.categories);
  const { control } = useFormContext();
  const { fields: medications } = useFieldArray({
    name: 'medications',
    control
  });

  useEffect(() => {
    dispatch(patientsMiddleware.getMedicationDropdownOptions());
  }, []);

  return (
    <>
      <FormLabel>{t(Translation.PAGE_PATIENT_PLANS_CREATE_MEDICATION)}</FormLabel>
      {medications?.map((item, index) => (
        <FlexibleSection
          title={categories[index].title}
          type={AdvancedFieldType.Plan}
          fieldName={`medications.${index}.items`}
          controlFieldName={`medications.${index}.isExists`}
          initialFields={{
            medicationId: '',
            dosage: '',
            route: '',
            frequency: '',
            time: '',
            quantity: '',
            refill: '',
            refillNotes: '',
            doctorNotes: ''
          }}
          addNewItemButtonLabel={t(Translation.PAGE_PATIENT_PLANS_CREATE_PLAN_ADD_MEDICATION) ?? ''}
          rows={[
            FirstDynamicRow,
            SecondDynamicRow,
            [
              {
                fieldName: 'frequency',
                type: FlexibleItemType.Input,
                label: t(Translation.PAGE_PATIENT_PLANS_CREATE_MEDICATIONS_FREQUENCY)
              }
            ],
            [
              {
                fieldName: 'time',
                type: FlexibleItemType.Input,
                label: t(Translation.PAGE_PATIENT_PLANS_CREATE_MEDICATIONS_TIME)
              }
            ],
            ThirdDynamicRow,
            [
              {
                fieldName: 'refillNotes',
                type: FlexibleItemType.MultilineInput,
                label: t(Translation.PAGE_PATIENT_PLANS_CREATE_MEDICATIONS_REFILL_NOTES)
              }
            ],
            [
              {
                fieldName: 'doctorNotes',
                type: FlexibleItemType.MultilineInput,
                label: t(Translation.PAGE_PATIENT_PLANS_CREATE_MEDICATIONS_DOCTOR_NOTES)
              }
            ]
          ]}
          tableTitle={t(Translation.PAGE_PATIENT_PLANS_CREATE_MEDICATION)}
        />
      ))}
    </>
  );
};
