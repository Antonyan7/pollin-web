import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import CreateEditOrder from '@components/Orders/CreateEditOrder';
import { Paper, Stack } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { margins } from 'themes/themeConstants';

const CreateOrderPage = () => {
  const [t] = useTranslation();
  const router = useRouter();
  const { id: currentPatientId } = router.query;

  useEffect(() => {
    if (typeof currentPatientId === 'string') {
      dispatch(patientsMiddleware.getPatientProfile(currentPatientId));
    }
  }, [currentPatientId]);

  const patientProfile = useAppSelector(patientsSelector.patientProfile);
  const patientFullName = (patientProfile?.title ?? '').split(' ').slice(0, 2).join(' ');

  return (
    <Stack gap={margins.all16}>
      <MainBreadcrumb
        data-cy={CypressIds.PAGE_CREATE_ORDER_TITLE}
        currentPage={t(Translation.PAGE_CREATE_ORDER_TITLE)}
        navigation={{
          basePath: '/',
          items: [
            {
              name: `${t(Translation.PAGE_PATIENT_LIST_TITLE)}`,
              path: `/patient-emr/list`
            },
            {
              name: `${patientFullName}`,
              path: `/patient-emr/details/${currentPatientId}/orders`
            },
            {
              name: `${t(Translation.PAGE_CREATE_ORDER_TITLE)}`,
              path: `/patient-emr/details/${currentPatientId}/orders/create`
            }
          ]
        }}
      />
      <Paper elevation={0}>
        <CreateEditOrder isEdit={false} />
      </Paper>
    </Stack>
  );
};

export default CreateOrderPage;
