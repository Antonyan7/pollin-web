import React, { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DropdownOptionType, IDropdownOption } from '@axios/patientEmr/managerPatientEmrTypes';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import MedicalBackgroundNote from '@components/MedicalBackground/components/common/MedicalBackgroundNote';
import { getDropdownByType } from '@components/MedicalBackground/helpers';
import { GenitourinaryFields } from '@components/MedicalBackground/MedicalHistory/MaleGenitourinaryHistory/editView/types';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const DiagnosedConditions = () => {
  const [t] = useTranslation();
  const { control } = useFormContext();
  const fieldName = `${GenitourinaryFields.DiagnosedConditions}`;
  const dropdownOptions = useAppSelector(patientsSelector.dropdowns);
  const patientInformation = useAppSelector(patientsSelector.malePatientGenitourinaryHistory);
  const diagnosedConditions = patientInformation?.diagnosedConditions;
  const { field } = useController({
    name: fieldName,
    control
  });
  const diagnosedConditionsLabel = t(
    Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GENITOURINARY_HISTORY_FIELD_DIAGNOSED_CONDITIONS
  );
  const { onChange, value: fieldValue, ...fieldProps } = field;

  const conditionsOptions = getDropdownByType(dropdownOptions, DropdownOptionType.DiagnosedConditions)?.options;
  const [showAdditionalNote, setShowAdditionalNote] = useState(!!fieldValue.note);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  const onDiagnosedConditionsChange = (selectedDiagnosedConditions: IDropdownOption[]) => {
    const selectedDiagnosedConditionsIds = selectedDiagnosedConditions.map((condition) => ({
      id: condition.id
    }));

    onChange({ ...diagnosedConditions, items: selectedDiagnosedConditionsIds });
  };

  return (
    <Grid container item px={paddings.leftRight24} py={paddings.topBottom16} direction="row" xs={12}>
      <Grid
        item
        container
        direction="row"
        xs={5}
        alignItems="flex-start"
        flexWrap="nowrap"
        gap={1}
        sx={{
          marginTop: margins.top10
        }}
      >
        <ConsultationTitleWithIcon onClick={onNoteClick} description={diagnosedConditionsLabel} />
      </Grid>
      <Grid item container gap={1} xs={7}>
        <BaseDropdownWithLoading
          isLoading={false}
          multiple
          popupIcon={<KeyboardArrowDownIcon color="primary" />}
          fullWidth
          options={conditionsOptions as IDropdownOption[]}
          onChange={(e, value) => {
            const isSelectedValueValid = value && typeof value === 'object';

            if (isSelectedValueValid) {
              onDiagnosedConditionsChange(value as IDropdownOption[]);
            }
          }}
          ListboxProps={{
            style: {
              maxHeight: 220
            }
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => (typeof option === 'object' ? option.title : option)}
          clearIcon={<CloseIcon onClick={() => onChange({ ...diagnosedConditions, items: [] })} fontSize="small" />}
          renderInputProps={{
            ...fieldProps,
            label: diagnosedConditionsLabel,
            name: fieldName
          }}
        />
        <MedicalBackgroundNote
          onClick={onNoteClick}
          visible={showAdditionalNote}
          fieldName={GenitourinaryFields.DiagnosedConditions}
        />
      </Grid>
    </Grid>
  );
};

export default DiagnosedConditions;
