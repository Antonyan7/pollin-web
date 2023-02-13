import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { tasksSelector } from '@redux/slices/tasks';
import { ITask } from 'types/reduxTypes/tasksStateTypes';

import useTaskDashboardActions from '@hooks/contextMenu/useTaskDashboardActions';
import { ContextMenu } from '@ui-component/contextMenu';
import Chip from '@ui-component/patient/Chip';
import { formatDate } from '@utils/dateUtils';

import { findPriorityById, findStatusByID } from '../../helpers/tasks';

const TaskDashboardRow = ({ row }: { row: ITask }) => {
  const taskStatuses = useAppSelector(tasksSelector.tasksStatusList);
  const taskPriorities = useAppSelector(tasksSelector.tasksPrioritiesList);
  const status = findStatusByID(row.statusId, taskStatuses);
  const priority = findPriorityById(row.priorityId, taskPriorities);
  const actionBindings = useTaskDashboardActions(row, status.actions);

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
      <TableCell align="left" onClick={(e) => e.stopPropagation()}>
        <ContextMenu actionBindings={actionBindings} />
      </TableCell>
    </TableRow>
  );
};

export default TaskDashboardRow;
