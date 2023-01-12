import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTheme } from '@mui/material';
import { margins } from 'themes/themeConstants';

const CollapseMenuArrowDownIcon = (props: { isOpen: boolean }) => {
  const { isOpen } = props;
  const theme = useTheme();

  return (
    <KeyboardArrowDownIcon
      sx={{
        marginLeft: margins.left32,
        color: theme.palette.primary.main,
        rotate: `${isOpen ? 180 : 0}deg`
      }}
    />
  );
};

export default CollapseMenuArrowDownIcon;
