import React, { MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IPatientPlan, IPatientPlansListData } from '@axios/patientEmr/managerPatientEmrTypes';
import NoResultsFound from '@components/NoResultsFound';
import SimpleMenu, { IMenuItem } from '@components/SimpleMenu';
import { Add, SendTwoTone } from '@mui/icons-material';
import { Grid, TablePagination, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';
import { SexAtBirth } from 'types/reduxTypes/patient-emrStateTypes';

import CircularLoading from '@ui-component/circular-loading';
import { ButtonWithIcon } from '@ui-component/common/buttons';

import PlanRow from './components/PlanRow';

const CreatePlanButton = ({ handleClick }: { handleClick: (event: MouseEvent<HTMLElement>) => void }) => {
  const [t] = useTranslation();

  return (
    <ButtonWithIcon
      sx={{ px: paddings.leftRight16 }}
      label={t(Translation.PAGE_PATIENT_PLANS_CREATE_A_PLAN_BTN)}
      variant="contained"
      icon={<Add />}
      handleClick={handleClick}
    />
  );
};

const PatientPlansList = () => {
  const theme = useTheme();
  const [t] = useTranslation();
  const patientProfile = useAppSelector(patientsSelector.patientProfile);
  const patientPlansList = useAppSelector(patientsSelector.plansList);
  const categories = useAppSelector(patientsSelector.categories);
  const isPatientProfileLoading = useAppSelector(patientsSelector.isPatientProfileLoading);
  const isStatusVariationsLoading = useAppSelector(patientsSelector.isStatusVariationsLoading);
  const isCategoriesAndTypesLoading = useAppSelector(patientsSelector.isCategoriesLoading);
  const isPlansListLoading = useAppSelector(patientsSelector.isPlansListLoading);
  const {
    query: { id: patientId }
  } = useRouter();
  const [page, setPage] = useState(0);
  const isLoading =
    isPatientProfileLoading || isStatusVariationsLoading || isPlansListLoading || isCategoriesAndTypesLoading;

  useEffect(() => {
    if (patientProfile?.sexAtBirth === SexAtBirth.Female) {
      dispatch(patientsMiddleware.getPatientPlansStatuses());
      dispatch(patientsMiddleware.getPlanCategoriesAndTypes());
    }
  }, [isPatientProfileLoading, page, patientId, patientProfile?.sexAtBirth]);

  useEffect(() => {
    if (patientProfile?.sexAtBirth === SexAtBirth.Female) {
      dispatch(patientsMiddleware.getPatientPlansList(`${patientId}`, page));
    }
  }, [page, patientId, patientProfile?.sexAtBirth]);

  const notFoundLabel = t(Translation.PAGE_PATIENT_PLANS_LIST_EMPTY);
  const malePatientLabel = t(Translation.PAGE_PATIENT_PLANS_FOR_MALE);
  const { isReadyToOrder = false, patientPlans = [] } = patientPlansList ?? ({} as IPatientPlansListData);

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, value: number) => {
    setPage(value);
  };

  const handleSendPlansToPatientClick = () =>
    dispatch(
      viewsMiddleware.openModal({
        name: ModalName.SendPlansToPatientModal,
        props: {}
      })
    );

  if (isLoading) {
    return <CircularLoading />;
  }

  if (!isLoading && patientProfile?.sexAtBirth === SexAtBirth.Male) {
    return <NoResultsFound label={malePatientLabel} />;
  }

  return (
    <Grid>
      <>
        <Stack pt={paddings.top24} spacing={3} direction="row" justifyContent="flex-end">
          <ButtonWithIcon
            sx={{
              px: paddings.leftRight16,
              [`&.Mui-disabled`]: {
                color: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
                opacity: 0.5
              }
            }}
            label={t(Translation.PAGE_PATIENT_PLANS_SEND_PLANS_TO_PATIENT_BTN)}
            variant="outlined"
            disabled={!isReadyToOrder}
            onClick={handleSendPlansToPatientClick}
            icon={<SendTwoTone />}
          />
          <SimpleMenu ActionButton={CreatePlanButton} items={categories as IMenuItem[]} />
        </Stack>
        <Stack spacing={3} pt={paddings.top24}>
          {patientPlans.length > 0 ? (
            <>
              {patientPlans?.map((plan: IPatientPlan) => (
                <PlanRow plan={plan} key={plan.id} />
              ))}
              <TablePagination
                labelRowsPerPage={`${t(Translation.COMMON_PAGINATION_ROWS_COUNT)} :`}
                component="div"
                count={patientPlansList?.totalItems ?? 0}
                rowsPerPage={patientPlansList?.pageSize ?? 0}
                page={patientPlansList?.currentPage ? patientPlansList.currentPage - 1 : 0}
                onPageChange={handleChangePage}
              />
            </>
          ) : (
            <NoResultsFound label={notFoundLabel} />
          )}
        </Stack>
      </>
    </Grid>
  );
};

export default PatientPlansList;
