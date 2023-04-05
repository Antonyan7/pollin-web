import React, { useEffect, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { DropdownOptionType } from '@axios/patientEmr/managerPatientEmrTypes';
import Dropdown from '@components/MedicalBackground/components/common/Dropdown';
import mappingPattern from '@components/MedicalBackground/mapper/femalePregnancyInformation';
import { Grid } from '@mui/material';
import { paddings } from 'themes/themeConstants';

const DynamicRow = (index: number, parentFieldName: string) => {
  const type = useWatch({
    name: `previousPregnancies.pregnancies.${index}.type`
  });
  const initialType = useRef(type);
  const { setValue } = useFormContext();

  useEffect(() => {
    if (type && type !== initialType.current) {
      initialType.current = type;

      const initialRowValues = Object.keys(mappingPattern[type]).reduce((previousValues, currentValue) => {
        previousValues[currentValue] = null;

        return previousValues;
      }, {} as Record<string, string | null>);

      // Reset pregnancies details when type of pregnancy changed.
      setValue(`previousPregnancies.pregnancies.${index}.details`, initialRowValues);
    }
  }, [type, index, setValue]);

  if (!mappingPattern[type]) {
    return null;
  }

  const row = Object.entries(mappingPattern[type]);

  return row.map((item) => {
    const fieldName = `details.${item[0]}`;
    const { componentData, title } = item[1];

    const rowColumnsCount = 12;
    const itemSize = Math.round(rowColumnsCount / row.length);
    const finalFieldName = parentFieldName ? `${parentFieldName}.${index}.${fieldName}` : fieldName;

    return (
      <Grid item xs={itemSize} px={paddings.leftRight4} py={paddings.topBottom4} key={finalFieldName}>
        <Dropdown
          label={title}
          fieldName={finalFieldName}
          dropdownType={componentData?.dropdownType as DropdownOptionType}
          key={finalFieldName}
        />
      </Grid>
    );
  });
};

export default DynamicRow;
