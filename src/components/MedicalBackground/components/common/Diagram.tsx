import React from 'react';
import { useTheme } from '@mui/material';
import { margins } from 'themes/themeConstants';

import SubCardStyled from '@ui-component/cards/SubCardStyled';

interface DiagramProps {
  children: React.ReactNode;
  titleComponent: React.ReactNode;
  titleContent?: Record<'id', string>;
}

const Diagram = ({ children, ...other }: DiagramProps) => {
  const theme = useTheme();

  return (
    <SubCardStyled
      key={other.titleContent?.id}
      title={other.titleComponent}
      sx={{
        backgroundColor: theme.palette.primary.light,
        marginTop: margins.top10
      }}
    >
      {children}
    </SubCardStyled>
  );
};

export default Diagram;
