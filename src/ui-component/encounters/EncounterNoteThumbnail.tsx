import React from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { gridSpacing } from 'themes/themeConstants';
import { IEncounterListItem } from 'types/reduxTypes/patient-emrStateTypes';

import SubCardStyled from '@ui-component/cards/SubCardStyled';

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
                <Grid container justifyContent="space-between" alignItems="center">
                  <Typography fontSize="16px" fontWeight="400">
                    {date}
                  </Typography>
                  <IconButton>
                    <ChevronRightIcon sx={{ color: theme.palette.common.black }} />
                  </IconButton>
                </Grid>
              }
            >
              <Grid container direction="column" spacing={2}>
                <Grid item xs={12}>
                  <Typography fontSize="16px" fontWeight="400" sx={{ color: theme.palette.common.black }}>
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
