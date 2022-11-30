import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScheduleBoxWrapper, StyledButtonNew } from '@components/Appointments/CommonMaterialComponents';
import { tableRowCount } from '@constants';
import AddIcon from '@mui/icons-material/Add';
import { TablePagination, Typography, useTheme } from '@mui/material';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { ScheduleTemplatesContext } from 'context/ScheduleTemplatesContext';
import { rowsPerPage } from 'helpers/constants';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { schedulingMiddleware, schedulingSelector } from 'redux/slices/scheduling';
import { margins } from 'themes/themeConstants';

import { ITableRow } from './ScheduleTemplatesTable/Table';
import ScheduleTemplatesTable from './ScheduleTemplatesTable';

// ==============================|| CUSTOMER LIST ||============================== //
const ScheduleTemplates = () => {
  const [page, setPage] = React.useState<number>(0);
  const [rows, setRows] = React.useState<ITableRow[]>([]);
  const router = useRouter();
  const theme = useTheme();
  const [t] = useTranslation();

  const scheduleTemplates = useAppSelector(schedulingSelector.scheduleTemplates);
  const isScheduleTemplatesLoading = useAppSelector(schedulingSelector.scheduleListLoadingStatus);
  const newTemplateButtonCyId = CypressIds.PAGE_SCHEDULING_TEMPLATES_BUTTON_CREATE;

  useEffect(() => {
    dispatch(schedulingMiddleware.getSchedulingTemplates(page + 1));
  }, [page]);

  useEffect(() => {
    setRows(scheduleTemplates.templates);
  }, [scheduleTemplates]);

  const handleNewTemplate = () => {
    router.push('/scheduling/create-template');
  };

  const handleChangePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  return (
    <>
      {/* to do //add header component */}
      <ScheduleBoxWrapper>
        <StyledButtonNew
          data-cy={newTemplateButtonCyId}
          theme={theme}
          variant="contained"
          endIcon={<AddIcon sx={{ color: theme.palette.primary.contrastText }} />}
          onClick={handleNewTemplate}
          sx={{ marginLeft: margins.auto }}
        >
          <Typography variant="h4" sx={{ color: theme.palette.primary.contrastText, marginRight: margins.right12 }}>
            {t(Translation.PAGE_SCHEDULING_TEMPLATES_BUTTON_CREATE)}
          </Typography>
        </StyledButtonNew>
        <ScheduleTemplatesContext>
          <ScheduleTemplatesTable isScheduleTemplatesLoading={isScheduleTemplatesLoading} rows={rows} />
        </ScheduleTemplatesContext>
        {/* table pagination */}
        <TablePagination
          rowsPerPageOptions={[rowsPerPage]}
          component="div"
          count={scheduleTemplates.totalItems}
          rowsPerPage={tableRowCount}
          page={page}
          onPageChange={handleChangePage}
        />
      </ScheduleBoxWrapper>
    </>
  );
};

export default ScheduleTemplates;
