import React from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';

import SubCardStyled from '@ui-component/cards/SubCardStyled';
import transformDataForListLayout from '@utils/transformDataForListLayout';

import { WidgetProps } from '../types';

import ListLayout from './List';
import SecondaryLayout from './SecondaryLayout';

const WidgetLayout = ({ data, secondary, sx, profile, emptyWidgetTitle, loading, listItemsHeading }: WidgetProps) => {
  const [t] = useTranslation();
  const listData = data ? transformDataForListLayout(data) : null;
  const theme = useTheme();

  return (
    <SubCardStyled
      sx={{
        ...sx
      }}
      title={data?.widgetTitle ?? emptyWidgetTitle}
      titleProps={{
        fontWeight: 500,
        fontSize: theme.typography.pxToRem(14),
        color: theme.palette.secondary[800]
      }}
      {...(secondary && { secondary })}
    >
      {profile && (
        <>
          <ListLayout
            items={[
              {
                title: t(Translation.PAGE_PATIENT_PARTNERS_PROFILE_NAME),
                subItems: [
                  {
                    title: profile.name
                  }
                ]
              },
              {
                title: t(Translation.PAGE_PATIENT_PARTNERS_PROFILE_CONTRIBUTION),
                subItems: [
                  {
                    title: profile.contribution
                  }
                ]
              }
            ]}
          />
          <Divider />
        </>
      )}
      {listData ? (
        <ListLayout items={listData} listItemsHeading={listItemsHeading} />
      ) : (
        <SecondaryLayout loading={loading} />
      )}
    </SubCardStyled>
  );
};

export default WidgetLayout;
