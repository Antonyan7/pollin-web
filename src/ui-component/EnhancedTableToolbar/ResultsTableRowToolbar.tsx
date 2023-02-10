import React from 'react';
import { useTranslation } from 'react-i18next';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Grid, MenuItem, Typography } from '@mui/material';
import { Translation } from 'constants/translations';

import { IContextActionBinding, useContextMenuAction } from '@hooks/useContextMenuAction';
import { BaseSelectWithLoading } from '@ui-component/BaseDropdownWithLoading';

interface EnhancedTableToolbarExternalResultsProps {
  actionBindings: IContextActionBinding[];
  selectionCount: number;
}

const ResultsTableRowToolbar = ({ actionBindings, selectionCount }: EnhancedTableToolbarExternalResultsProps) => {
  const [t] = useTranslation();

  const actionCallback = useContextMenuAction(actionBindings);

  return (
    <Grid container xs={12} sx={{ mt: '7px', mb: '7px' }}>
      {selectionCount ? (
        <Grid item container alignItems="center" xs={9}>
          <Typography color="inherit" variant="h4">
            {t(Translation.COMMON_BULK_SELECTED, { count: selectionCount })}
          </Typography>
        </Grid>
      ) : null}
      {actionBindings.length && selectionCount > 1 ? (
        <Grid item xs={3}>
          <BaseSelectWithLoading
            IconComponent={KeyboardArrowDownIcon}
            id="action-label"
            labelId="action-label"
            label={t(Translation.PAGE_SCHEDULING_TEMPLATES_TABLE_HEADER_ACTION)}
          >
            {actionBindings?.map((item: IContextActionBinding) => (
              <MenuItem
                key={item.id}
                value={item.id}
                onClick={() => {
                  actionCallback(item.id);
                }}
              >
                {item.title}
              </MenuItem>
            ))}
          </BaseSelectWithLoading>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default ResultsTableRowToolbar;
