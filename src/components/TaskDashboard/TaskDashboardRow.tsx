import React from 'react';
import { Grid, TableCell, TableRow } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { tasksSelector } from '@redux/slices/tasks';
import { viewsMiddleware } from '@redux/slices/views';
import { ModalName } from 'types/modals';
import { ITask } from 'types/reduxTypes/tasksStateTypes';

import OverdueIcon from '@assets/icons/OverdueIcon';
import useTaskDashboardActions from '@hooks/contextMenu/useTaskDashboardActions';
import { ContextMenu } from '@ui-component/contextMenu';
import Chip from '@ui-component/patient/Chip';
import { DateUtil } from '@utils/date/DateUtil';

import { findPriorityById, findStatusByID } from '../../helpers/tasks';

const TaskDashboardRow = ({ row }: { row: ITask }) => {
  const taskStatuses = useAppSelector(tasksSelector.tasksStatusList);
  const taskPriorities = useAppSelector(tasksSelector.tasksPrioritiesList);
  const status = findStatusByID(row.statusId, taskStatuses);
  const priority = findPriorityById(row.priorityId, taskPriorities);
  const actionBindings = useTaskDashboardActions(row, status?.actions);

  const handleRowClick = () => {
    dispatch(
      viewsMiddleware.openModal({
        name: ModalName.TaskDetailsModal,
        props: { row }
      })
    );
  };

  const isOverdue = row.overdueDays;

  return (
    <TableRow tabIndex={-1} key={row.uuid} onClick={handleRowClick}>
      <TableCell sx={{ textDecoration: 'underline', cursor: 'pointer' }}>{row.name}</TableCell>
      <TableCell>{row.patient?.name}</TableCell>
      <TableCell align="left">
        <Grid
          sx={{
            display: 'flex',
            gap: 1,
            ...(isOverdue && {
              color: (theme) => theme.palette.error.main
            })
          }}
        >
          {isOverdue && <OverdueIcon />} {DateUtil.formatDateOnly(row.dueDate)}
        </Grid>
      </TableCell>
      <TableCell align="left">{priority?.title}</TableCell>
      <TableCell align="center">{row.assignee?.name}</TableCell>
      <TableCell align="center">
        <Chip
          sx={{ background: status?.label?.backgroundColor, color: status?.label?.textColor }}
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
