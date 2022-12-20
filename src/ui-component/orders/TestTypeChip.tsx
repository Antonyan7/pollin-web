import React from 'react';
import { useTheme } from '@mui/material/styles';
import { margins, paddings } from 'themes/themeConstants';
import { TestType } from 'types/reduxTypes/resultsStateTypes';

import Chip from '@ui-component/patient/Chip';

const TestTypeChip = (props: { type: TestType }) => {
  const { type } = props;
  const theme = useTheme();

  return (
    // TODO: hardcoded colors should be refactored once palette will be updated
    <Chip
      label={type}
      size="small"
      chipColor="notActive"
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
