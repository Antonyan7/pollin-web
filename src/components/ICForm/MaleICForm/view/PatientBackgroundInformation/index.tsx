import React from 'react';
import { useTranslation } from 'react-i18next';
import RenderPharmacy from '@components/ICForm/components/common/RenderPharmacy';
import SectionWrapperWithTitle from '@components/ICForm/components/common/SectionWrapperWithTitle';
import SingleViewOnlyItem from '@components/ICForm/components/common/SingleViewOnlyItem';
import { defineSingleFieldValue } from '@components/MedicalBackground/helpers';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const ViewPatientBackgroundInformation = () => {
  const [t] = useTranslation();
  const backgroundInformation = useAppSelector(patientsSelector.icForm)?.patientBackgroundInformation;
  const cancerTreatment = defineSingleFieldValue(backgroundInformation?.cancerPatient?.value);

  return (
    <SectionWrapperWithTitle
      title={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_PATIENT_CONTACT_BACKGROUND_INFORMATION)}
    >
      <SingleViewOnlyItem
        itemTitle={t(Translation.PAGE_PATIENT_PROFILE_ICFORM_BACKGROUND_INFORMATION_UNDERGOING_CANCER_TREATMENT)}
        itemValue={cancerTreatment}
        note={backgroundInformation?.cancerPatient.note}
        index={0}
      />
      <SingleViewOnlyItem
        itemTitle={t(
          Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_BACKGROUND_INFORMATION_CURRENT_OCCUPATION
        )}
        itemValue={backgroundInformation?.currentOccupation.value}
        note={backgroundInformation?.currentOccupation.note}
        index={1}
      />
      <SingleViewOnlyItem
        itemTitle={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_BACKGROUND_INFORMATION_PHARMACY)}
        itemValue={<RenderPharmacy />}
        note={backgroundInformation?.pharmacy.note}
        index={2}
      />
    </SectionWrapperWithTitle>
  );
};

export default ViewPatientBackgroundInformation;
