import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, TextFieldProps } from '@mui/material';
import { Translation } from 'constants/translations';
import { ISingleTemplate } from 'types/create-schedule';

import { TimePeriodsFieldProps } from './TimePeriodsFieldProps';

interface IPlaceholderLabelFieldProps extends TimePeriodsFieldProps {
  singleTemplate: ISingleTemplate;
}

const PlaceholderLabelField = ({ index, updateInputValue, singleTemplate }: IPlaceholderLabelFieldProps) => {
  const [t] = useTranslation();

  const onPlaceholderLabelChange: TextFieldProps['onChange'] = (e) =>
    updateInputValue('placeholderName', e.target.value, index);

  return (
    <TextField
      className="schedule-inputs"
      fullWidth
      id="outlined-email-address"
      value={singleTemplate.placeholderName}
      placeholder={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_PLACEHOLDER)}
      onChange={onPlaceholderLabelChange}
    />
  );
};

export default PlaceholderLabelField;
