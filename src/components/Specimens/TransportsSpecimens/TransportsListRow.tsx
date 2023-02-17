import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { resultsSelector } from '@redux/slices/results';
import { timeAdjuster } from 'helpers/timeAdjuster';
import Link from 'next/link';
import { ContextMenuAction, ITransportListFolderProps } from 'types/reduxTypes/resultsStateTypes';

import useTransportActions from '@hooks/contextMenu/useTransportActions';
import { ContextMenu } from '@ui-component/contextMenu';
import { getCurrentDate, getDate } from '@utils/dateUtils';
import { getStatusTitle } from '@utils/mappings';

interface AllTestsRowProps {
  row: ITransportListFolderProps;
  actions: ContextMenuAction[];
}

export const TransportsListRow = ({ row, actions }: AllTestsRowProps) => {
  const currentDay = getCurrentDate();
  const isCurrentDay = getDate(currentDay) === getDate(row.date);
  const { customizedDate, customizedTransportCreationDate } = timeAdjuster(row.date);
  const folderCreateDate = isCurrentDay ? customizedTransportCreationDate : customizedDate;
  const actionBindings = useTransportActions(row, actions, !isCurrentDay);
  const actionVariations = useAppSelector(resultsSelector.transportActions);
  const statusTitle = getStatusTitle(actionVariations, row.status);

  const linkToInsideTransportFolder = `/clinic-test-results/specimen-tracking/transports/${row.id}`;

  return (
    <Link href={linkToInsideTransportFolder}>
      <TableRow sx={{ cursor: 'pointer' }} hover>
        <TableCell>{row.title}</TableCell>
        <TableCell>{folderCreateDate}</TableCell>
        <TableCell>{row.labName}</TableCell>
        <TableCell>{row.driver.name}</TableCell>
        <TableCell>{statusTitle}</TableCell>
        <TableCell align="left" onClick={(e) => e.stopPropagation()}>
          <ContextMenu actionBindings={actionBindings} />
        </TableCell>
      </TableRow>
    </Link>
  );
};
