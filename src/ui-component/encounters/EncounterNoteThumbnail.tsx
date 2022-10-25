import React from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import parse from 'html-react-parser';
import { useRouter } from 'next/router';
import { gridSpacing } from 'themes/themeConstants';
import { IEncounterListItem } from 'types/reduxTypes/patient-emrStateTypes';

import SubCardStyled from '@ui-component/cards/SubCardStyled';
import ParserTypographyWrapper from '@ui-component/common/Typography';

const EncounterNoteThumbnail = ({ author, title, contentPreview, createdOn, id }: IEncounterListItem) => {
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
                    {createdOn}
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
                  <ParserTypographyWrapper variant="body2">{parse(contentPreview)}</ParserTypographyWrapper>
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
