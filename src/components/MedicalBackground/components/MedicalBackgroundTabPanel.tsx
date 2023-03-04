import React from 'react';
import { Box } from '@mui/material';
import { paddings } from 'themes/themeConstants';

interface MedicalBackgroundTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const MedicalBackgroundTabPanel = (props: MedicalBackgroundTabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`medical-background-tabpanel-${index}`}
      aria-labelledby={`medical-background-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ px: paddings.leftRight24, pt: paddings.top48 }}>{children}</Box>}
    </div>
  );
};

export default MedicalBackgroundTabPanel;
