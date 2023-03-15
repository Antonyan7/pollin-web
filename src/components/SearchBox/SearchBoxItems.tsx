import React from 'react';
import { HighlightOffOutlined } from '@mui/icons-material';
import { Box, Chip, chipClasses } from '@mui/material';
import { borderRadius, margins, paddings } from 'themes/themeConstants';

import { SearchBoxItemsProps } from './types';

export const SearchBoxItems: React.FC<SearchBoxItemsProps> = ({
  currentSearchboxValues,
  invalidSearchedItems,
  searchboxValueDeleteHandler
}) =>
  currentSearchboxValues.length > 0 ? (
    <Box
      sx={(theme) => ({
        height: '100%',
        overflowX: 'overlay',
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        order: 2,
        cursor: 'default',
        '::-webkit-scrollbar': {
          height: 5
        },
        '::-webkit-scrollbar-thumb': {
          background: theme.palette.grey[500]
        },

        '::-webkit-scrollbar-thumb:hover': {
          background: theme.palette.grey[700]
        }
      })}
    >
      {currentSearchboxValues.map((value) => {
        const isSearchedItemInvalid = invalidSearchedItems?.includes(value);

        return (
          <Chip
            color="primary"
            variant="outlined"
            sx={(theme) => ({
              ml: margins.left8,
              background: theme.palette.primary[100],
              borderRadius: borderRadius.radius7,
              border: isSearchedItemInvalid ? `1px solid ${theme.palette.error.main}` : 'none',
              color: theme.palette.primary.dark,
              fontWeight: 500,
              py: paddings.topBottom2,
              fontSize: theme.typography.pxToRem(14),
              lineHeight: '140%',
              maxHeight: theme.typography.pxToRem(24),
              [`.${chipClasses.label}`]: {
                pl: paddings.left8,
                pr: 0
              },
              [`.${chipClasses.deleteIcon}`]: {
                ml: theme.typography.pxToRem(9.33),
                fontSize: theme.typography.pxToRem(16),
                fill: theme.palette.primary.main
              }
            })}
            deleteIcon={<HighlightOffOutlined />}
            key={value}
            label={value}
            onDelete={() => searchboxValueDeleteHandler(value)}
          />
        );
      })}
    </Box>
  ) : null;
