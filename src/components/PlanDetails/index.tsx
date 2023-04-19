import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MedicationCardType } from '@axios/patientEmr/managerPatientEmrTypes';
import CycleMonitoring from '@components/PlanDetails/components/CycleMonitoring';
import SpermDetails from '@components/PlanDetails/components/SpermDetails';
import TestResults from '@components/PlanDetails/components/TestResults';
import { findStatus } from '@components/Plans/helpers';
import { Circle, KeyboardArrowLeft } from '@mui/icons-material';
import { Box, Chip, IconButton, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { margins, paddings } from 'themes/themeConstants';
import { v4 } from 'uuid';

import usePlansActions from '@hooks/contextMenu/usePlansActions';
import { ContextMenu } from '@ui-component/contextMenu';
import MedicationCard from '@ui-component/medications/MedicationCard';
import { DateUtil } from '@utils/date/DateUtil';

const PlanDetails = () => {
  const theme = useTheme();
  const [t] = useTranslation();
  const router = useRouter();
  const statusVariations = useAppSelector(patientsSelector.statusVariations);
  const planDetails = useAppSelector(patientsSelector.planDetails);
  const status = findStatus(statusVariations, planDetails?.status ?? '');
  const actionBindings = usePlansActions(planDetails?.id ?? '', status?.actions);
  const planId = router.query.planId as string;

  const onBackClick = () => {
    router.back();
  };

  useEffect(() => {
    dispatch(patientsMiddleware.getPatientPlansStatuses());
    dispatch(patientsMiddleware.getPlanCategoriesAndTypes());
  }, []);

  useEffect(() => {
    if (planId) {
      dispatch(patientsMiddleware.getPlanDetails(planId));
    }
  }, [planId]);

  return (
    <Box p={paddings.all24}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box fontSize="16px" fontWeight="500" display="flex" alignItems="center" color={theme.palette.secondary[800]}>
          <IconButton size="small" color="primary" onClick={onBackClick}>
            <KeyboardArrowLeft />
          </IconButton>
          <Box display="flex" alignItems="center">
            <Box>{planDetails?.title}</Box>
            <Circle
              sx={{
                fontSize: '0.5rem',
                color: theme.palette.common.black,
                margin: `${margins.topBottom0} ${margins.leftRight8}`
              }}
            />
            <Box>
              {planDetails?.status} {t(Translation.COMMON_WORD_ON)}{' '}
              {planDetails?.date ? DateUtil.formatDateOnly(planDetails?.date) : '-'}
            </Box>
          </Box>
        </Box>
        <Box display="flex">
          <Stack direction="row">
            <Chip
              sx={{
                color: status?.label.textColor ?? '',
                backgroundColor: status?.label.backgroundColor ?? '',
                '&:hover': {
                  backgroundColor: status?.label.textColor ?? '',
                  color: status?.label.backgroundColor ?? ''
                },
                px: paddings.leftRight36
              }}
              label={status?.title}
            />
            <ContextMenu actionBindings={actionBindings} />
          </Stack>
        </Box>
      </Box>
      <Box sx={{ marginTop: margins.top24 }} key="test-results">
        <TestResults />
      </Box>
      <Box sx={{ marginTop: margins.top24 }}>
        <CycleMonitoring />
      </Box>
      <Box sx={{ marginTop: margins.top24 }}>
        <SpermDetails />
      </Box>
      <Box
        sx={{
          marginTop: margins.top32,
          fontSize: theme.typography.pxToRem(16),
          color: theme.palette.secondary[800]
        }}
      >
        {t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_PLAN_MEDICATIONS_TITLE)}
      </Box>
      <Box sx={{ marginTop: margins.top24 }}>
        {planDetails?.medicationsByCategories?.map((data) => (
          <MedicationCard key={v4()} data={data} cardType={MedicationCardType.Plan} />
        ))}
      </Box>
    </Box>
  );
};

export default PlanDetails;
