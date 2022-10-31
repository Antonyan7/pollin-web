import React from 'react';
import { Box, Typography, TypographyProps } from '@mui/material';
import { BoxProps } from '@mui/system';
import { paddings } from 'themes/themeConstants';

import { WidgetProps } from '../types';

interface ListLayoutProps {
  items: WidgetProps['data']['items'];
  title?: string;
  renderAsList?: boolean;
  componentProps?: {
    list?: BoxProps;
    listWrapper?: BoxProps;
    title?: TypographyProps;
  };
}

const ListLayout = ({ items, title, renderAsList, componentProps }: ListLayoutProps) => (
  <Box {...componentProps?.listWrapper}>
    {title && (
      <Typography variant="body1" {...componentProps?.title}>
        {title}
      </Typography>
    )}
    <Box
      display="flex"
      px={3}
      py={4}
      flexDirection="column"
      {...(renderAsList && { component: 'ul' })}
      {...componentProps?.list}
    >
      {items?.map((item, index) => {
        const [leftSideValue, rightSideValue] = Object.values(item);

        const itemKey = leftSideValue;
        const shouldAddPaddingForNextItem = index > 0 && !renderAsList;

        return (
          <Box {...(renderAsList && { component: 'li' })}>
            <Box
              display="flex"
              alignItems="center"
              key={itemKey as string}
              {...(shouldAddPaddingForNextItem && { pt: paddings.top16 })}
            >
              <Box
                sx={{
                  flexBasis: renderAsList ? '100%' : '30%'
                }}
              >
                <Typography color={(theme) => theme.palette.secondary[800]}>{leftSideValue as string}</Typography>
              </Box>
              {!renderAsList && (
                <>
                  <Box sx={{ flexBasis: '10%', px: '5%' }}>
                    <Typography color={(theme) => theme.palette.secondary[800]}>:</Typography>
                  </Box>
                  <Box
                    sx={{
                      flexBasis: '30%'
                    }}
                  >
                    {Array.isArray(rightSideValue) ? (
                      rightSideValue?.map((lineItem, lineItemindex) => (
                        <Typography color={(theme) => theme.palette.grey[700]} {...(lineItemindex > 0 && { pt: 2 })}>
                          {lineItem.title}
                        </Typography>
                      ))
                    ) : (
                      <Typography>{rightSideValue}</Typography>
                    )}
                  </Box>
                </>
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  </Box>
);

export default ListLayout;
