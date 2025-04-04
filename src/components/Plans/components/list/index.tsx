import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import NoResultsFound from '@components/NoResultsFound';
import { PlanPage } from '@components/Plans/types';
import SimpleMenu, { IMenuItem } from '@components/SimpleMenu';
import { SendTwoTone } from '@mui/icons-material';
import { Grid, TablePagination, Tooltip, tooltipClasses, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { plansMiddleware, plansSelector } from '@redux/slices/plans';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';
import { SexAtBirth } from 'types/reduxTypes/patient-emrStateTypes';
import { IPatientPlan, IPatientPlansListData } from 'types/reduxTypes/plansTypes';

import CircularLoading from '@ui-component/circular-loading';
import { ButtonWithIcon } from '@ui-component/common/buttons';

import CreatePlanButton from './createPlanButton';
import PlanRow from './row';

const PatientPlansList = ({ changePage }: { changePage: (pageName: PlanPage, planTypeId: string) => void }) => {
  const theme = useTheme();
  const [t] = useTranslation();
  const patientProfile = useAppSelector(patientsSelector.patientProfile);
  const patientPlansList = useAppSelector(plansSelector.plansList);
  const categories = useAppSelector(plansSelector.categories);
  const isPatientProfileLoading = useAppSelector(patientsSelector.isPatientProfileLoading);
  const isStatusVariationsLoading = useAppSelector(plansSelector.isStatusVariationsLoading);
  const isCategoriesAndTypesLoading = useAppSelector(plansSelector.isCategoriesLoading);
  const isPlansListLoading = useAppSelector(plansSelector.isPlansListLoading);
  const {
    query: { id: patientId }
  } = useRouter();
  const [page, setPage] = useState(0);
  const isLoading =
    isPatientProfileLoading || isStatusVariationsLoading || isPlansListLoading || isCategoriesAndTypesLoading;

  useEffect(() => {
    if (patientProfile?.sexAtBirth === SexAtBirth.Female) {
      dispatch(plansMiddleware.getPatientPlansStatuses());
      dispatch(plansMiddleware.getPlanCategoriesAndTypes());
      dispatch(patientsMiddleware.getMedicationCategories());
    }
  }, [isPatientProfileLoading, patientId, patientProfile?.sexAtBirth]);

  useEffect(() => {
    if (patientProfile?.sexAtBirth === SexAtBirth.Female) {
      dispatch(plansMiddleware.getPatientPlansList(`${patientId}`, page));
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

  const isDisabledToSendPlans = !isReadyToOrder;

  return (
    <Grid>
      <>
        <Stack pt={paddings.top24} spacing={3} direction="row" justifyContent="flex-end">
          <Tooltip
            sx={{
              [`& .${tooltipClasses.tooltip}`]: {
                color: theme.palette.secondary[800]
              }
            }}
            title={isDisabledToSendPlans ? t(Translation.PAGE_PATIENT_PLANS_SEND_PLANS_TO_PATIENT_TOOLTIP) : ''}
          >
            <span>
              <ButtonWithIcon
                sx={{
                  px: paddings.leftRight16,
                  ...(isDisabledToSendPlans && {
                    color: theme.palette.primary.main,
                    borderColor: theme.palette.primary.main,
                    opacity: 0.5,
                    cursor: 'default'
                  }),
                  textTransform: 'none'
                }}
                label={t(Translation.PAGE_PATIENT_PLANS_SEND_PLANS_TO_PATIENT_BTN)}
                variant="outlined"
                disabled={!!isDisabledToSendPlans}
                onClick={handleSendPlansToPatientClick}
                icon={<SendTwoTone />}
              />
            </span>
          </Tooltip>
          <SimpleMenu
            onItemClick={(item) => {
              changePage(PlanPage.Create, item.id);
            }}
            ActionButton={CreatePlanButton}
            items={categories as IMenuItem[]}
          />
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
                page={
                  patientPlansList?.currentPage && patientPlansList?.currentPage > 1
                    ? patientPlansList.currentPage - 1
                    : 0
                }
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
