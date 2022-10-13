import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScheduleBoxWrapper, StyledButtonNew } from '@components/Appointments/CommonMaterialComponents';
import { tableRowCount } from '@constants';
import AddIcon from '@mui/icons-material/Add';
import { Box, CircularProgress, TablePagination, Typography, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
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
      {/* to do //add header compoenent */}
      <ScheduleBoxWrapper>
        <StyledButtonNew
          theme={theme}
          variant="outlined"
          endIcon={<AddIcon sx={{ color: theme.palette.primary.main }} />}
          onClick={handleNewTemplate}
          sx={{ marginLeft: margins.auto }}
        >
          <Typography variant="h4" sx={{ marginRight: margins.right12 }}>
            {t(Translation.PAGE_SCHEDULING_TEMPLATES_BUTTON_CREATE)}
          </Typography>
        </StyledButtonNew>
        <ScheduleTemplatesTable page={page} rows={rows} />
        {isScheduleTemplatesLoading && (
          <Box sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center', marginTop: margins.top16 }}>
            <CircularProgress sx={{ margin: margins.auto }} />
            <p>{t(Translation.PAGE_SCHEDULING_TEMPLATES_TABLE_LOADING)}</p>
          </Box>
        )}
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
