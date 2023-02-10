import React, { useEffect, useState } from 'react';
import { ITasksListReqBody, TasksListSortFields } from '@axios/tasks/tasksManagerTypes';
import NoResultsFound from '@components/NoResultsFound';
import { PatientListStyled } from '@components/Patients/PatientListStyled';
import { TaskDashboardLayout } from '@components/TaskDashboard/TaskDashboardLayout';
import { Box, CircularProgress, TableContainer, TablePagination } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { tasksMiddleware, tasksSelector } from '@redux/slices/tasks';
import { margins } from 'themes/themeConstants';
import { SortOrder } from 'types/patient';

import Table from './TaskDashboardTable';

const TasksList = () => {
  const [sortOrder, setSortOrder] = useState<SortOrder | null>(null);
  const [sortField, setSortField] = useState<TasksListSortFields | null>(null);
  const [page, setPage] = useState<number>(0);
  const [toggle, setToggle] = useState<boolean>(false);
  const { totalItems, pageSize, currentPage } = useAppSelector(tasksSelector.tasksList);
  const isTasksLoading = useAppSelector(tasksSelector.isTasksLoading);
  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    dispatch(tasksMiddleware.getTasksStatuses());
    dispatch(tasksMiddleware.getTaskPriorities());
  }, []);

  useEffect(() => {
    const data: ITasksListReqBody = {
      ...(sortField ? { sortByField: sortField } : {}),
      ...(sortOrder ? { sortOrder } : {}),
      onlyUserTasks: toggle,
      page: page + 1
    };

    dispatch(tasksMiddleware.getTasksList(data));
  }, [page, sortField, sortOrder, toggle]);

  return (
    <PatientListStyled>
      <TaskDashboardLayout toggle={toggle} setToggle={setToggle} />
      <TableContainer>
        <Table setSortField={setSortField} setSortOrder={setSortOrder} sortField={sortField} sortOrder={sortOrder} />
      </TableContainer>
      {totalItems === 0 && !isTasksLoading && <NoResultsFound />}
      {isTasksLoading ? (
        <Box sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center', marginTop: margins.top16 }}>
          <CircularProgress sx={{ margin: margins.auto }} />
        </Box>
      ) : null}
      <TablePagination
        component="div"
        count={totalItems}
        rowsPerPage={pageSize}
        page={currentPage - 1}
        onPageChange={handleChangePage}
      />
    </PatientListStyled>
  );
};

export default TasksList;
