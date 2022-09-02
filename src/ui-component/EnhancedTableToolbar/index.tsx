import React, { useCallback, useState } from 'react';
import RemoveTemplatesModal from '@components/Scheduling/scheduleTemplates/RemoveTemplatesModal';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';

import { EnhancedTableToolbarProps } from '@types';

const EnhancedTableToolbar = ({ numSelected, selected }: EnhancedTableToolbarProps) => {
  const [open, setOpen] = useState(false);

  const handleOpenClose = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <Toolbar
      sx={{
        p: 0,
        pl: 1,
        pr: 1,
        ...(numSelected > 0 && {
          color: (theme) => theme.palette.secondary.main
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography color="inherit" variant="h4">
          {numSelected} Selected
        </Typography>
      ) : (
        <Typography variant="h6" id="tableTitle">
          Nutrition
        </Typography>
      )}
      <Box sx={{ flexGrow: 1 }} />
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton size="large">
            <RemoveTemplatesModal
              buttonVal={
                <DeleteIcon
                  fontSize="medium"
                  sx={{ color: (theme) => theme.palette.primary.main }}
                  onClick={handleOpenClose}
                />
              }
              handleOpenClose={handleOpenClose}
              open={open}
              selected={selected}
            />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
