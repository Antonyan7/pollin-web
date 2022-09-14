import React from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconPencil } from '@tabler/icons';

import { gridSpacing } from '../../themes/themeConstants';

const EncounterNotes = () => {
  interface IEncounterNotesData {
    title: string;
    text: string;
    author: string;
    date: string;
  }

  const theme = useTheme();

  const encounterNotesData: IEncounterNotesData[] = [
    {
      title: 'Encounter Note',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui offic...',
      author: 'Alexander Fernandes-Morgan',
      date: 'Updated on Oct 17, 2021 - 09:21a.m.'
    }
  ];

  return (
    <div style={{ backgroundColor: 'white' }}>
      {encounterNotesData.map((encounterNote) => (
        <Grid sx={{ padding: '30px' }} item lg={8} xs={12}>
          <Grid container direction="column" spacing={gridSpacing}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <Typography
                  sx={{ color: theme.palette.common.black, marginRight: '20px' }}
                  fontSize="16px"
                  fontWeight="400"
                >
                  {encounterNote.author}
                </Typography>
                <IconButton sx={{ '&:hover': { color: theme.palette.primary[200] } }} disableRipple>
                  <IconPencil stroke={2} size="1.5rem" />
                </IconButton>
              </Box>
              <Grid container direction="column" spacing={3}>
                <Grid item xs={12}>
                  <Typography fontSize="14px" fontWeight="400">
                    {encounterNote.text}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    sx={{ color: theme.palette.common.black, marginBottom: '10px' }}
                    fontSize="16px"
                    fontWeight="400"
                  >
                    {encounterNote.author}
                  </Typography>
                  <Typography fontSize="16px" fontWeight="400">
                    {encounterNote.date}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default EncounterNotes;
