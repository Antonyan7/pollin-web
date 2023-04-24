import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DropdownOptionType } from '@axios/patientEmr/managerPatientEmrTypes';
import SectionWrapperWithTitle from '@components/ICForm/components/common/SectionWrapperWithTitle';
import SingleViewOnlyItem from '@components/ICForm/components/common/SingleViewOnlyItem';
import { getDropdownByType } from '@components/MedicalBackground/helpers';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const ViewPatientContribution = () => {
  const [t] = useTranslation();
  const patientContribution = useAppSelector(patientsSelector.icForm)?.patientContribution.primaryPatientContribution;
  const dropdownOptions = useAppSelector(patientsSelector.dropdowns);
  const patientContributionOptions = getDropdownByType(
    dropdownOptions,
    DropdownOptionType.PrimaryPatientContribution
  )?.options;
  const patientContributionValue = useMemo(
    () => patientContributionOptions?.find((option) => option.id === patientContribution?.value),
    [patientContribution?.value, patientContributionOptions]
  )?.title;

  return (
    <SectionWrapperWithTitle title={t(Translation.PAGE_PATIENT_PLANS_PATIENT_CONTRIBUTION)}>
      <SingleViewOnlyItem
        itemTitle={t(Translation.PAGE_PATIENT_PLANS_PRIMARY_PATIENT_CONTRIBUTION)}
        itemValue={patientContributionValue}
        note={patientContribution?.note}
      />
    </SectionWrapperWithTitle>
  );
};

export default ViewPatientContribution;
