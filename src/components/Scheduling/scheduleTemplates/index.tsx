import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledButtonNew } from '@components/Appointments/CommonMaterialComponents';
import { tableRowCount } from '@constants';
import AddIcon from '@mui/icons-material/Add';
import { Box, CardContent, CircularProgress, Grid, TablePagination, Typography, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { schedulingMiddleware, schedulingSelector } from 'redux/slices/scheduling';
import MainCard from 'ui-component/cards/MainCard';

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
      <MainCard content={false}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8}>
              <Typography variant="h3">{t(Translation.PAGE_SCHEDULING_TEMPLATES_TITLE)}</Typography>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={2}>
              <StyledButtonNew
                theme={theme}
                variant="outlined"
                endIcon={<AddIcon sx={{ color: theme.palette.primary.main }} />}
                onClick={handleNewTemplate}
              >
                <Typography variant="h4" sx={{ marginRight: '10px' }}>
                  {t(Translation.PAGE_SCHEDULING_TEMPLATES_BUTTON_CREATE)}
                </Typography>
              </StyledButtonNew>
            </Grid>
          </Grid>
        </CardContent>
        <ScheduleTemplatesTable page={page} rows={rows} />
        {isScheduleTemplatesLoading && (
          <Box sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center', marginTop: '16px' }}>
            <CircularProgress sx={{ margin: 'auto' }} />
            <p>{t(Translation.PAGE_SCHEDULING_TEMPLATES_TABLE_LOADING)}</p>
          </Box>
        )}
        {/* table pagination */}
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={scheduleTemplates.totalItems}
          rowsPerPage={tableRowCount}
          page={page}
          onPageChange={handleChangePage}
        />
      </MainCard>
    </>
  );
};

export default ScheduleTemplates;
