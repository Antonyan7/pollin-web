import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { timeAdjuster } from 'helpers/timeAdjuster';
import Link from 'next/link';
import { ContextMenuAction, ITransportListFolderProps } from 'types/reduxTypes/resultsStateTypes';

import useTransportActions from '@hooks/contextMenu/useTransportActions';
import { ContextMenu } from '@ui-component/contextMenu';
import { getCurrentDate, getDate } from '@utils/dateUtils';

interface AllTestsRowProps {
  row: ITransportListFolderProps;
  actions: ContextMenuAction[];
}

export const TransportsListRow = ({ row, actions }: AllTestsRowProps) => {
  const actionBindings = useTransportActions(row, actions);
  const currentDay = getCurrentDate();
  const isToday = getDate(currentDay) === getDate(row.date);
  const { customizedDate, customizedTransportCreationDate } = timeAdjuster(row.date);
  const folderCreateDate = isToday ? customizedTransportCreationDate : customizedDate;

  return (
    <Link href={`/clinic-test-results/specimen-tracking/transports/${row.id}`}>
      <TableRow sx={{ cursor: 'pointer' }} hover>
        <TableCell>{row.title}</TableCell>
        <TableCell>{folderCreateDate}</TableCell>
        <TableCell>{row.labName}</TableCell>
        <TableCell>{row.driver.name}</TableCell>
        <TableCell>{row.status}</TableCell>
        <TableCell align="left" onClick={(e) => e.stopPropagation()}>
          <ContextMenu actionBindings={actionBindings} />
        </TableCell>
      </TableRow>
    </Link>
  );
};
