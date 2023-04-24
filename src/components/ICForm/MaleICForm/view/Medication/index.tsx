import React from 'react';
import { useTranslation } from 'react-i18next';
import RenderPrescribedMedications from '@components/ICForm/components/common/RenderPrescribedMedications';
import SectionWrapperWithTitle from '@components/ICForm/components/common/SectionWrapperWithTitle';
import SingleViewOnlyItem from '@components/ICForm/components/common/SingleViewOnlyItem';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const ViewMedication = () => {
  const medication = useAppSelector(patientsSelector.icForm)?.medication;
  const [t] = useTranslation();

  return (
    <SectionWrapperWithTitle title={t(Translation.MODAL_PRESCRIPTIONS_MEDICATION)}>
      <SingleViewOnlyItem
        itemTitle={t(Translation.PAGE_PATIENT_PROFILE_ICFORM_MEDICATION_CURRENT_PRESCRIBED_MEDICATION)}
        itemValue={<RenderPrescribedMedications />}
        note={medication?.note}
      />
    </SectionWrapperWithTitle>
  );
};

export default ViewMedication;
