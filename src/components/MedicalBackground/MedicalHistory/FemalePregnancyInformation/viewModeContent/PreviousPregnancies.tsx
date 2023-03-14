import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { IPreviousPregnancies } from '@axios/patientEmr/managerPatientEmrTypes';
import Item from '@components/MedicalBackground/components/common/Item';
import { getDropdownOption } from '@components/MedicalBackground/helpers';
import mappingPattern, { typeOfPregnancyLabels } from '@components/MedicalBackground/mapper/femalePregnancyInformation';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';
import { v4 } from 'uuid';

const PreviousPregnancies = ({ previousPregnancies }: { previousPregnancies: IPreviousPregnancies }) => {
  const dropdownOptions = useAppSelector(patientsSelector.dropdowns);
  const [t] = useTranslation();

  return (
    <Grid>
      {previousPregnancies?.pregnancies?.map((pregnancy, index) => {
        const pregnancyType = (
          <Item
            title={t(
              Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_TYPE_OF_PREGNANCY
            )}
            value={typeOfPregnancyLabels[pregnancy.type]}
          />
        );

        const renderedValues = Object.entries(pregnancy.details).map((item) => {
          const [key, value] = item;

          const { label, dropdownType } = mappingPattern[pregnancy.type][key];

          return (
            <Item
              key={v4()}
              title={label}
              value={getDropdownOption(dropdownOptions, dropdownType, value)?.title as string}
            />
          );
        });

        return (
          <Fragment key={v4()}>
            <Item
              key={v4()}
              mt={margins.top24}
              title={t(
                Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_PREGNANCY,
                {
                  count: index + 1
                }
              )}
              index={0}
            />
            {pregnancyType}
            {renderedValues}
          </Fragment>
        );
      })}
    </Grid>
  );
};

export default PreviousPregnancies;
