import React from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { IconChevronRight } from '@tabler/icons';

import SubCard from '@ui-component/cards/SubCard';

import { gridSpacing } from '../../themes/themeConstants';

export interface IEncounter {
  encounterType: string;
  encounterDate: string;
  authorName: string;
  text: string;
}

const EncounterNoteThumbnail = () => {
  const encounterData: IEncounter[] = [
    {
      encounterType: 'Consultation - In Clinic',
      encounterDate: 'Oct 15, 2021',
      authorName: 'Alexander Fernandes-Morgan',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui offic...'
    },
    {
      encounterType: 'Consultation - In Clinic',
      encounterDate: 'Oct 15, 2021',
      authorName: 'Alexander Fernandes-Morgan',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui offic...'
    },
    {
      encounterType: 'Consultation - In Clinic',
      encounterDate: 'Oct 15, 2021',
      authorName: 'Alexander Fernandes-Morgan',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui offic...'
    },
    {
      encounterType: 'Consultation - In Clinic',
      encounterDate: 'Oct 15, 2021',
      authorName: 'Alexander Fernandes-Morgan',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui offic...'
    },
    {
      encounterType: 'Consultation - In Clinic',
      encounterDate: 'Oct 15, 2021',
      authorName: 'Alexander Fernandes-Morgan',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui offic...'
    }
  ];

  return (
    <div style={{ backgroundColor: 'white' }}>
      {encounterData.map((encounter) => (
        <Grid sx={{ marginBottom: '25px' }} item lg={8} xs={12}>
          <Grid container direction="column" spacing={gridSpacing}>
            <Grid item xs={12}>
              <SubCard
                title={encounter.encounterType}
                secondary={
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '170px' }}>
                    <Typography fontSize="18px" fontWeight="400">
                      {encounter.encounterDate}
                    </Typography>
                    <IconButton>
                      <IconChevronRight stroke={1.5} size="1.3rem" />
                    </IconButton>
                  </Box>
                }
              >
                <Grid container direction="column" spacing={2}>
                  <Grid item xs={12}>
                    <Typography fontSize="16px" fontWeight="400">
                      {encounter.authorName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">{encounter.text}</Typography>
                  </Grid>
                </Grid>
              </SubCard>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default EncounterNoteThumbnail;
