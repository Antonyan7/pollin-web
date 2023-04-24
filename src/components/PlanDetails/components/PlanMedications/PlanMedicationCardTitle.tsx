import React, { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { IPatientPlansCategories } from '@axios/patientEmr/managerPatientEmrTypes';
import { Box, Grid, Link, useTheme } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

interface IPlanMedicationCardTitleProps {
  categoryId: string;
  exists: boolean;
}

const PlanMedicationCardTitle = ({ categoryId, exists }: IPlanMedicationCardTitleProps) => {
  const theme = useTheme();
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const categories = useAppSelector(patientsSelector.categories);
  const [t] = useTranslation();

  const categoryTitle = useMemo(() => {
    const currentCategory = categories?.find((category: IPatientPlansCategories) => category.id === categoryId);

    return currentCategory?.title;
  }, [categories, categoryId]);

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      sx={{
        fontSize: theme.typography.pxToRem(16),
        color: theme.palette.secondary[800],
        fontWeight: 400
      }}
    >
      <Grid item xs={7}>
        <Box
          sx={{
            fontWeight: 500,
            fontSize: theme.typography.pxToRem(14),
            paddingLeft: paddings.left24,
            paddingBottom: paddings.bottom8
          }}
        >
          {categoryTitle}
        </Box>
      </Grid>

      <Grid item xs={2}>
        <Box sx={{ fontWeight: 400, fontSize: theme.typography.pxToRem(14) }}>
          {exists ? t(Translation.COMMON_BUTTON_YES) : t(Translation.COMMON_BUTTON_NO)}
        </Box>
      </Grid>
      <Grid item xs={0.5}>
        <Link component="a" ref={downloadRef} hidden href="#download" />
      </Grid>
    </Grid>
  );
};

export default PlanMedicationCardTitle;
