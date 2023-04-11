import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IPreviousPregnancies } from '@axios/patientEmr/managerPatientEmrTypes';
import Item from '@components/MedicalBackground/components/common/Item';
import CardContentWrapper from '@components/MedicalBackground/components/styled/CartContent';
import { getLabelBySelectedValue } from '@components/MedicalBackground/helpers/mapper';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';

import CircularLoading from '@ui-component/circular-loading';

import PreviousPregnancies from './PreviousPregnancies';

const ViewModeContent = () => {
  const router = useRouter();
  const isDropdownsLoading = useAppSelector(patientsSelector.isDropdownsLoading);
  const femalePregnancyInformation = useAppSelector(patientsSelector.femalePregnancyInformation);
  const isFemalePregnancyInformationLoading = useAppSelector(patientsSelector.isFemalePregnancyInformationLoading);
  const previousPregnancies = femalePregnancyInformation?.previousPregnancies;
  const [t] = useTranslation();

  useEffect(() => {
    if (typeof router.query.id === 'string') {
      dispatch(patientsMiddleware.getFemalePregnancyInformation(router.query.id));
    }
  }, [router.query.id]);

  const isDataAvailable = !isFemalePregnancyInformationLoading && !isDropdownsLoading;

  return isDataAvailable ? (
    <CardContentWrapper key={v4()}>
      <Item
        title={t(
          Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_PREVIOUS_PREGNANCY
        )}
        value={getLabelBySelectedValue(!!previousPregnancies?.value)}
      />
      <PreviousPregnancies previousPregnancies={previousPregnancies as IPreviousPregnancies} />
      <Item
        title={t(
          Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_TOTAL_NUMBER_OF_PREGNANCIES
        )}
        value={femalePregnancyInformation?.numberOfPregnancies ?? 0}
        note={previousPregnancies?.note ?? ''}
      />
    </CardContentWrapper>
  ) : (
    <CircularLoading />
  );
};

export default ViewModeContent;
