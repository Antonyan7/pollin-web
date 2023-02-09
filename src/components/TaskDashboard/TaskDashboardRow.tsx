import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { tasksSelector } from '@redux/slices/tasks';
import { ITask } from 'types/reduxTypes/tasksStateTypes';

import Chip from '@ui-component/patient/Chip';
import { formatDate } from '@utils/dateUtils';

import { findStatusByID } from '../../helpers/tasks';

const TaskDashboardRow = ({ row }: { row: ITask }) => {
  const taskStatuses = useAppSelector(tasksSelector.tasksStatusList);
  const status = findStatusByID(row.statusId, taskStatuses);

  return (
    <TableRow tabIndex={-1} key={row.uuid}>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.patient.name}</TableCell>
      <TableCell align="left">{formatDate(row.dueDate, 'MMM dd, yyyy HH:mm')}</TableCell>
      <TableCell align="left">{row.priorityId}</TableCell>
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
