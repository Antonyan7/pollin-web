import React from 'react';
import { useTranslation } from 'react-i18next';
import { Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import { Translation } from 'constants/translations';
import { borderRadius, margins, paddings } from 'themes/themeConstants';

import { SpecimenTestDataProps } from '../../types';

import SpecimenDataItem from './SpecimenDataItem';

const SpecimenTestData: React.FC<SpecimenTestDataProps> = ({ specimenTestData, isLastTestData }) => {
  const [t] = useTranslation();
  const specimenTests = specimenTestData.tests;

  return (
    <>
      <Stack spacing={3}>
        <SpecimenDataItem
          label={t(Translation.PAGE_SPECIMEN_TRACKING_MODAL_COLLECTION_SPECIMEN_ID_LABEL)}
          value={specimenTestData.identifier}
        />
        <SpecimenDataItem
          label={t(Translation.PAGE_SPECIMEN_TRACKING_MODAL_COLLECTION_TESTS_INCLUDED_LABEL)}
          value={`${specimenTests.length}`}
        />
        <Stack>
          {specimenTests.map((test, index) => {
            const currentTestIndex = index + 1;
            const currentTestLabel = `${t(
              Translation.PAGE_SPECIMEN_TRACKING_MODAL_COLLECTION_TEST_LABEL
            )} ${currentTestIndex}`;

            return <SpecimenDataItem key={currentTestLabel} label={currentTestLabel} value={test.title} />;
          })}
        </Stack>
        <SpecimenDataItem
          label={t(Translation.PAGE_SPECIMEN_TRACKING_MODAL_COLLECTION_VIAL_COLORS_LABEL)}
          value={
            <Grid
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: (theme) => theme.palette.primary[100],
                padding: `${paddings.topBottom2} ${paddings.leftRight8}`,
                borderRadius: borderRadius.radius4
              }}
            >
              <Chip
                sx={{
                  background: specimenTestData.vialColor.code,
                  width: 16,
                  height: 16,
                  marginRight: margins.right8
                }}
              />
              <Typography
                variant="h5"
                fontWeight={600}
                sx={{
                  color: (theme) => theme.palette.primary.dark
                }}
              >
                {`${specimenTestData.vialColor.title} ${t(
                  Translation.PAGE_SPECIMEN_TRACKING_MODAL_COLLECTION_VIAL_LABEL
                )}`}
              </Typography>
            </Grid>
          }
        />
      </Stack>
      {!isLastTestData && <Divider sx={{ my: margins.topBottom32 }} />}
    </>
  );
};

export default SpecimenTestData;
