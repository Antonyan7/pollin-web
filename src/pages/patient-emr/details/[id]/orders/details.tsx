import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import CreateEditOrder from '@components/Orders/CreateEditOrder';
import { Paper, Stack } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { ordersMiddleware } from '@redux/slices/orders';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { margins } from 'themes/themeConstants';

const OrderDetailsPage = () => {
  const [t] = useTranslation();
  const router = useRouter();
  const { id: currentPatientId } = router.query;
  const patientProfile = useAppSelector(patientsSelector.patientProfile);

  const { orderId } = router.query;

  useEffect(() => {
    if (typeof currentPatientId === 'string' && patientProfile === null) {
      dispatch(patientsMiddleware.getPatientProfile(currentPatientId));
    }
  }, [currentPatientId, patientProfile]);

  useEffect(() => {
    dispatch(ordersMiddleware.getOrderDetails(orderId as string));
  }, [orderId]);

  return (
    <Stack gap={margins.all16}>
      <MainBreadcrumb
        data-cy={CypressIds.PAGE_ORDER_DETAILS_TITLE}
        currentPage={t(Translation.PAGE_ORDER_DETAILS_TITLE)}
        navigation={{
          basePath: '/',
          items: [
            {
              name: `${t(Translation.PAGE_PATIENT_LIST_TITLE)}`,
              path: `/patient-emr/list`
            },
            {
              name: `${patientProfile?.title}`,
              path: `/patient-emr/details/${currentPatientId}/orders`
            },
            {
              name: `${t(Translation.PAGE_ORDER_DETAILS_TITLE)}`,
              path: router.asPath
            }
          ]
        }}
      />
      <Paper elevation={0}>
        <CreateEditOrder isEdit />
      </Paper>
    </Stack>
  );
};

export default OrderDetailsPage;
