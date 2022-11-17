import React from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox, TableCell, TableRow, Typography, useTheme } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { ModalName } from 'types/modals';
import { IPatientContactInformationModalProps, SpecimenActionsValues } from 'types/reduxTypes/resultsStateTypes';

import ContextMenu from '@ui-component/contextMenu';
import Chip from '@ui-component/patient/Chip';

import { Translation } from '../../constants/translations';

interface IExternalResultsTableRow {
  row: IPatientContactInformationModalProps;
  actions: SpecimenActionsValues[];
  isItemSelected: boolean;
  onClick: (event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>, name: string) => void;
  labelId: string;
}

const PendingTestResultRow = ({ row, actions, isItemSelected, onClick, labelId }: IExternalResultsTableRow) => {
  const [t] = useTranslation();
  const theme = useTheme();

  return (
    <TableRow
      onClick={() => {
        dispatch(viewsMiddleware.openModal({ name: ModalName.PatientContactInformation, props: row }));
      }}
      sx={{ cursor: 'pointer' }}
      hover
      role="checkbox"
      tabIndex={-1}
      key={row.id}
    >
      <TableCell
        padding="checkbox"
        onClick={(event) => {
          event.stopPropagation();
          onClick(event, row.patient.name);
        }}
      >
        <Checkbox
          sx={{ color: theme.palette.primary.main }}
          checked={isItemSelected}
          inputProps={{
            'aria-labelledby': labelId
          }}
          key={row.id}
        />
      </TableCell>
      <TableCell>{row.title}</TableCell>
      <TableCell component="th" id={labelId} scope="row" sx={{ cursor: 'pointer' }}>
        <Typography variant="subtitle1">{row.patient.name}</Typography>
        <Typography variant="subtitle2">{row.patient.id}</Typography>
        <Typography variant="subtitle2">{row.patient.dateOfBirth}</Typography>
      </TableCell>
      <TableCell align="left">{row.labName}</TableCell>
      <TableCell align="left">{row.status}</TableCell>
      <TableCell align="center">
        <Chip label={`${row.age} ${t(Translation.PAGE_RESULTS_LIST_ITEM_DAYS)}`} size="small" chipColor="notActive" />
      </TableCell>
      <TableCell align="left" onClick={(e) => e.stopPropagation()}>
        <ContextMenu actions={actions} row={row} />
      </TableCell>
    </TableRow>
  );
};

export default PendingTestResultRow;
