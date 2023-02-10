import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { tasksSelector } from '@redux/slices/tasks';
import { ITask } from 'types/reduxTypes/tasksStateTypes';

import Chip from '@ui-component/patient/Chip';
import { formatDate } from '@utils/dateUtils';

import { findPriorityById, findStatusByID } from '../../helpers/tasks';

const TaskDashboardRow = ({ row }: { row: ITask }) => {
  const taskStatuses = useAppSelector(tasksSelector.tasksStatusList);
  const taskPriorities = useAppSelector(tasksSelector.tasksPrioritiesList);
  const status = findStatusByID(row.statusId, taskStatuses);
  const priority = findPriorityById(row.priorityId, taskPriorities);

  return (
    <TableRow tabIndex={-1} key={row.uuid}>
      <TableCell sx={{ textDecoration: 'underline', cursor: 'pointer' }}>{row.name}</TableCell>
      <TableCell>{row.patient.name}</TableCell>
      <TableCell align="left">{formatDate(row.dueDate, 'MMM dd, yyyy HH:mm')}</TableCell>
      <TableCell align="left">{priority.title}</TableCell>
      <TableCell align="center">????</TableCell>
      <TableCell align="center">
        <Chip
          sx={{ background: status?.label?.background, color: status?.label?.text }}
          label={status?.title}
          size="small"
          chipColor="notActive"
        />
      </TableCell>
    </TableRow>
  );
};

export default TaskDashboardRow;
