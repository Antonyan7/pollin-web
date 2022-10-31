import React from 'react';

import SubCardStyled from '@ui-component/cards/SubCardStyled';

import { WidgetProps } from '../types';

import ListLayout from './List';

const WidgetLayout = ({ data, secondary, sx }: WidgetProps) => (
  <SubCardStyled
    sx={{
      maxWidth: '40%',
      ...sx
    }}
    title={data?.widgetTitle}
    titleProps={{
      fontWeight: 600,
      fontSize: '14px',
      color: (theme) => theme.palette.secondary[800]
    }}
    {...(secondary && { secondary })}
  >
    <ListLayout items={data?.items} />
  </SubCardStyled>
);

export default WidgetLayout;
