import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { paddings } from 'themes/themeConstants';

import { isDashValue } from '@utils/stringUtils';

import TestHistoryHint from '../TestHistoryHint';
import { ListLayoutProps } from '../types';

const ListLayout = ({ items, title, renderAsList, componentProps, listItemsHeading }: ListLayoutProps) => {
  const theme = useTheme();

  return (
    <Box {...componentProps?.listWrapper}>
      {title && (
        <Typography variant="body1" {...componentProps?.title}>
          {title}
        </Typography>
      )}
      <Box
        display="flex"
        px={paddings.leftRight20}
        py={paddings.topBottom32}
        flexDirection="column"
        {...(renderAsList && { component: 'ul' })}
        {...componentProps?.list}
      >
        {listItemsHeading && (
          <Typography pb={paddings.bottom16} component="h5" variant="h5" fontWeight={500}>
            {listItemsHeading}
          </Typography>
        )}
        {items?.map((item, index) => {
          const itemKey = item.title;
          const shouldAddPaddingForNextItem = index > 0 && !renderAsList;

          return (
            <Box
              {...(renderAsList && { component: 'li', sx: { fontSize: theme.typography.pxToRem(14) } })}
              key={itemKey}
            >
              <Box display="flex" {...(shouldAddPaddingForNextItem && { pt: paddings.top16 })}>
                <Box
                  sx={{
                    flexBasis: renderAsList ? '100%' : '30%'
                  }}
                >
                  <Typography {...(!renderAsList && { color: theme.palette.secondary[800], fontWeight: 500 })}>
                    {item.title}
                  </Typography>
                </Box>
                {!renderAsList && (
                  <>
                    <Box sx={{ flexBasis: '10%' }}>
                      <Typography color={theme.palette.secondary[800]}>:</Typography>
                    </Box>
                    <Box
                      sx={{
                        flexBasis: '30%'
                      }}
                    >
                      {item.subItems?.map((subItem, subItemIndex) =>
                        subItem.id ? (
                          <TestHistoryHint testResultId={subItem.id} key={subItem.id}>
                            <Typography
                              sx={{ textDecoration: isDashValue(subItem.title) ? 'none' : 'underline' }}
                              color={theme.palette.grey[700]}
                              {...(subItemIndex > 0 && { pt: paddings.top16 })}
                            >
                              {subItem.title}
                            </Typography>
                          </TestHistoryHint>
                        ) : (
                          <Typography
                            key={subItem.title}
                            color={theme.palette.grey[700]}
                            {...(subItemIndex > 0 && { pt: paddings.top16 })}
                          >
                            {subItem.title}
                          </Typography>
                        )
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
};

export default ListLayout;
