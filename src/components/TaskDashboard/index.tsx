import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITasksListReqBody, TasksListSortFields } from '@axios/tasks/tasksManagerTypes';
import NoResultsFound from '@components/NoResultsFound';
import { PatientListStyled } from '@components/Patients/PatientListStyled';
import { TaskDashboardLayout } from '@components/TaskDashboard/TaskDashboardLayout';
import { Box, CircularProgress, TableContainer, TablePagination } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { tasksMiddleware, tasksSelector } from '@redux/slices/tasks';
import { margins } from 'themes/themeConstants';
import { SortOrder } from 'types/patient';

import { Translation } from '../../constants/translations';

import Table from './TaskDashboardTable';

const TasksList = () => {
  const [sortOrder, setSortOrder] = useState<SortOrder | null>(null);
  const [sortField, setSortField] = useState<TasksListSortFields | null>(null);
  const [page, setPage] = useState<number>(0);
  const [onlyUserTasks, setOnlyUserTasks] = useState<boolean>(false);
  const { totalItems, pageSize, currentPage } = useAppSelector(tasksSelector.tasksList);
  const createdTaskId = useAppSelector(tasksSelector.createdTaskId);
  const isTaskStatusUpdated = useAppSelector(tasksSelector.isTaskStatusUpdated);
  const isTaskReassigned = useAppSelector(tasksSelector.isTaskReassigned);
  const isTasksLoading = useAppSelector(tasksSelector.isTasksLoading);
  const [t] = useTranslation();
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
      onlyUserTasks,
      page: page + 1
    };

    dispatch(tasksMiddleware.clearCreatedTaskState());
    dispatch(tasksMiddleware.getTasksList(data));
    dispatch(tasksMiddleware.setTaskStatusUpdate(false));
    dispatch(tasksMiddleware.clearTaskReassignState());
  }, [page, isTaskReassigned, sortField, sortOrder, onlyUserTasks, createdTaskId, isTaskStatusUpdated]);

  const handleUserTasksToggle = (isOnlyUserTasks: boolean) => {
    setOnlyUserTasks(isOnlyUserTasks);
    setPage(0);
  };

  return (
    <PatientListStyled>
      <TaskDashboardLayout onlyUserTasks={onlyUserTasks} handleUserTasksToggle={handleUserTasksToggle} />
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
        labelRowsPerPage={`${t(Translation.COMMON_PAGINATION_ROWS_COUNT)} :`}
        component="div"
        count={totalItems}
        rowsPerPage={pageSize}
        page={currentPage > 1 ? currentPage - 1 : 0}
        onPageChange={handleChangePage}
      />
    </PatientListStyled>
  );
};

export default TasksList;
