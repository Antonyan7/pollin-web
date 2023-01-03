import React from 'react';
import { ChipProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { margins, paddings } from 'themes/themeConstants';
import { TestType } from 'types/reduxTypes/resultsStateTypes';

import Chip from '@ui-component/patient/Chip';

interface Props {
  label?: string;
  type: TestType;
}

const TestTypeChip = ({ label, type }: Props) => {
  const theme = useTheme();
  const onClick: ChipProps['onClick'] = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    // TODO: hardcoded colors should be refactored once palette will be updated
    <Chip
      label={label}
      size="small"
      chipColor="notActive"
      onClick={onClick}
      clickable={false}
      sx={{
        order: 2,
        marginLeft: margins.left8,
        padding: `${paddings.all16} ${paddings.all8}`,
        color: type === TestType.OrderGroup ? theme.palette.warning.dark : '#323297',
        backgroundColor: type === TestType.OrderGroup ? theme.palette.warning.light : '#EDE7F6',
        width: 'fit-content',
        cursor: 'pointer',
        '&:hover': {
          color: type === TestType.OrderGroup ? theme.palette.warning.dark : '#323297',
          backgroundColor: type === TestType.OrderGroup ? theme.palette.warning.light : '#EDE7F6'
        }
      }}
    />
  );
};

export default TestTypeChip;
