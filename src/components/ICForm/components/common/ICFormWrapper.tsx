import React, { PropsWithChildren } from 'react';
import { cardHeaderClasses, useTheme } from '@mui/material';
import { borders, paddings } from 'themes/themeConstants';

import SubCardStyled from '@ui-component/cards/SubCardStyled';

const ICFormWrapper = ({ children }: PropsWithChildren) => {
  const theme = useTheme();

  return (
    <SubCardStyled
      sx={{
        outline: `${borders.solid1px} ${theme.palette.primary.main}`,
        '& > .MuiDivider-root': {
          borderColor: theme.palette.primary.main
        },
        [`.${cardHeaderClasses.root}`]: {
          py: paddings.topBottom16,
          pl: paddings.left20,
          pr: paddings.right16
        }
      }}
    >
      {children}
    </SubCardStyled>
  );
};

export default ICFormWrapper;
