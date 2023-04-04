import React from 'react';
import { Box } from '@mui/material';
import { paddings } from 'themes/themeConstants';

interface MedicationsTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const MedicationsTabPanel = (props: MedicationsTabPanelProps) => {
  const { children, value, index, ...other } = props;
  const isTabSelected = value === index;

  return (
    <div
      role="tabpanel"
      hidden={!isTabSelected}
      id={`MedicationsTabPanel-tabpanel-${index}`}
      aria-labelledby={`MedicationsTabPanel-tab-${index}`}
      {...other}
    >
      {isTabSelected && <Box sx={{ px: paddings.leftRight24, pt: paddings.top22 }}>{children}</Box>}
    </div>
  );
};

export default MedicationsTabPanel;
