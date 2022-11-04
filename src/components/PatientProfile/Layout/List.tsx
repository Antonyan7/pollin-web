import React from 'react';
import { Box, Typography } from '@mui/material';
import { paddings } from 'themes/themeConstants';

import TestHistoryHint from '../TestHistoryHint';
import { ListLayoutProps } from '../types';

const ListLayout = ({ items, title, renderAsList, componentProps }: ListLayoutProps) => (
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
      {items?.map((item, index) => {
        const itemKey = item.title;
        const shouldAddPaddingForNextItem = index > 0 && !renderAsList;

        return (
          <Box {...(renderAsList && { component: 'li', sx: { fontSize: '14px' } })} key={itemKey}>
            <Box display="flex" {...(shouldAddPaddingForNextItem && { pt: paddings.top16 })}>
              <Box
                sx={{
                  flexBasis: renderAsList ? '100%' : '30%'
                }}
              >
                <Typography {...(!renderAsList && { color: (theme) => theme.palette.secondary[800], fontWeight: 600 })}>
                  {item.title}
                </Typography>
              </Box>
              {!renderAsList && (
                <>
                  <Box sx={{ flexBasis: '10%' }}>
                    <Typography color={(theme) => theme.palette.secondary[800]}>:</Typography>
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
                            sx={{ textDecoration: 'underline' }}
                            color={(theme) => theme.palette.grey[700]}
                            {...(subItemIndex > 0 && { pt: paddings.top16 })}
                          >
                            {subItem.title}
                          </Typography>
                        </TestHistoryHint>
                      ) : (
                        <Typography
                          key={subItem.title}
                          color={(theme) => theme.palette.grey[700]}
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

export default ListLayout;
