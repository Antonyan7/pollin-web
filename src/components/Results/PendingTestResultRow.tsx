import React from 'react';
import { useTranslation } from 'react-i18next';
import { TableCell, TableRow, Typography } from '@mui/material';
import { IExternalResultListData } from 'types/reduxTypes/resultsStateTypes';

import Chip from '@ui-component/patient/Chip';

import { Translation } from '../../constants/translations';

interface IExternalResultsTableRow {
  row: IExternalResultListData;
  index: number;
}

const PendingTestResultRow = ({ row, index }: IExternalResultsTableRow) => {
  const labelId = `enhanced-table-checkbox-${index}`;
  const [t] = useTranslation();

  return (
    <TableRow sx={{ cursor: 'pointer' }} hover role="checkbox" tabIndex={-1} key={row.id}>
      <TableCell>{row.title}</TableCell>
      <TableCell component="th" id={labelId} scope="row" sx={{ cursor: 'pointer' }}>
        <Typography variant="subtitle1">{row.patient.name}</Typography>
        <Typography variant="subtitle2">{row.patient.id}</Typography>
        <Typography variant="subtitle2">{row.patient.dateOfBirth}</Typography>
      </TableCell>
      <TableCell align="left">{row.labName}</TableCell>
      <TableCell align="left">{t(Translation.PAGE_RESULTS_LIST_ITEM_STATUS)}</TableCell>
      <TableCell align="center">
        <Chip label={`${row.age} ${t(Translation.PAGE_RESULTS_LIST_ITEM_DAYS)}`} size="small" chipColor="notActive" />
      </TableCell>
    </TableRow>
  );
};

export default PendingTestResultRow;
