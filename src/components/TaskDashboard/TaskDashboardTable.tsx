import React, { SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { TasksListSortFields } from '@axios/tasks/tasksManagerTypes';
import { HeadCell } from '@components/Table/HeadCell';
import { Table, TableBody, TableHead, TableRow } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { tasksSelector } from '@redux/slices/tasks';
import { IHeadCell, SortOrder } from 'types/patient';
import { ITask } from 'types/reduxTypes/tasksStateTypes';

import { headCellsData } from './HeadCellData';
import TaskRow from './TaskDashboardRow';

export interface ITaskManagementTableProps {
  setSortField: React.Dispatch<SetStateAction<TasksListSortFields | null>>;
  setSortOrder: React.Dispatch<SetStateAction<SortOrder | null>>;
  sortOrder: SortOrder | null;
  sortField: TasksListSortFields | null;
}

const TableComponent = ({ setSortField, setSortOrder, sortOrder, sortField }: ITaskManagementTableProps) => {
  const [t] = useTranslation();
  const { tasks } = useAppSelector(tasksSelector.tasksList);
  const isTasksLoading = useAppSelector(tasksSelector.isTasksLoading);
  const headCells = headCellsData(t) as IHeadCell[];

  return (
    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <HeadCell
              headCell={headCell}
              sortOrder={sortOrder}
              sortField={sortField}
              setSortOrder={setSortOrder}
              setSortField={setSortField}
              key={headCell.id}
            />
          ))}
        </TableRow>
      </TableHead>

      <TableBody>{!isTasksLoading ? tasks?.map((row: ITask) => <TaskRow row={row} key={row.uuid} />) : null}</TableBody>
    </Table>
  );
};

export default TableComponent;
