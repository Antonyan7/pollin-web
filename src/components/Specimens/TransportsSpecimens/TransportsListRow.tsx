import React, { useMemo } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { resultsSelector } from '@redux/slices/results';
import Link from 'next/link';
import { ContextMenuAction, ITransportListFolderProps } from 'types/reduxTypes/resultsStateTypes';

import useTransportActions from '@hooks/contextMenu/useTransportActions';
import { ContextMenu } from '@ui-component/contextMenu';
import { DateUtil } from '@utils/date/DateUtil';
import { getStatusTitle } from '@utils/mappings';

interface AllTestsRowProps {
  row: ITransportListFolderProps;
  actions: ContextMenuAction[];
}

export const TransportsListRow = ({ row, actions }: AllTestsRowProps) => {
  const calendarDate = useAppSelector(resultsSelector.transportListDate);
  const isCurrentDay = useMemo(() => DateUtil.isSameDate(calendarDate), [calendarDate]);
  const folderCreateDate = DateUtil.formatDateOnly(row.date);
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
