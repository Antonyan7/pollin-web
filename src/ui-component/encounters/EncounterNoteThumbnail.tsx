import React from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconChevronRight } from '@tabler/icons';
import { useRouter } from 'next/router';

import SubCardStyled from '@ui-component/cards/SubCardStyled';

import { gridSpacing } from '../../themes/themeConstants';
import { IEncounterListItem } from '../../types/reduxTypes/patient-emr';

const EncounterNoteThumbnail = ({ author, title, contentPreview, date, id }: IEncounterListItem) => {
  const theme = useTheme();
  const router = useRouter();

  const onEncounterClick = () => {
    router.push(`/patient-emr/encounter/${id}`);
  };

  return (
    <Box onClick={onEncounterClick} sx={{ backgroundColor: theme.palette.background.paper, cursor: 'pointer' }}>
      <Grid sx={{ marginBottom: '25px' }} item lg={8} xs={12}>
        <Grid container direction="column" spacing={gridSpacing}>
          <Grid item xs={12}>
            <SubCardStyled
              title={title}
              content
              secondary={
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '170px' }}>
                  <Typography fontSize="18px" fontWeight="400">
                    {date}
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
                    {author}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">{contentPreview}</Typography>
                </Grid>
              </Grid>
            </SubCardStyled>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EncounterNoteThumbnail;
