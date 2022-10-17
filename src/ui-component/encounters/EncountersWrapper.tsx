import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Typography, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import { borders } from 'themes/themeConstants';

import SubCardStyled from '@ui-component/cards/SubCardStyled';

interface EncountersWrapperProps {
  children: ReactNode;
  title: ReactNode;
}

const EncountersWrapper: React.FC<EncountersWrapperProps> = ({ children, title }) => {
  const [t] = useTranslation();
  const theme = useTheme();

  return (
    <Card sx={{ p: 3, mt: 1 }}>
      <Typography component="h2" variant="h2" sx={{ pb: 4 }}>
        {t(Translation.PAGE_ENCOUNTERS_LIST_TITLE)}
      </Typography>
      <SubCardStyled
        title={title}
        content
        sx={{
          outline: `${borders.solid1px} ${theme.palette.primary.light}`,
          '& > .MuiDivider-root': {
            borderColor: theme.palette.primary.light
          },
          '& > .MuiCardHeader-root': {
            p: 0
          }
        }}
      >
        {children}
      </SubCardStyled>
    </Card>
  );
};

export default EncountersWrapper;
