import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TableCell, TableRow, Typography, useTheme } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { patientsMiddleware } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { getChipColor } from 'helpers/resultsChipColor';
import { ModalName } from 'types/modals';
import { IPatientContactInformationModalProps } from 'types/reduxTypes/resultsStateTypes';

import Chip from '@ui-component/patient/Chip';

interface IExternalResultsTableRow {
  row: IPatientContactInformationModalProps;
  labelId: string;
}

const PendingTestResultRow = ({ row, labelId }: IExternalResultsTableRow) => {
  const [t] = useTranslation();
  const theme = useTheme();

  const chipColor = useMemo(
    () => getChipColor(row.age, theme.palette),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [row.age]
  );

  const onContactInformationModalOpen = () => {
    dispatch(
      viewsMiddleware.openModal({
        name: ModalName.PatientContactInformation,
        props: { ...row, shouldBeRedirected: true }
      })
    );
    dispatch(patientsMiddleware.getPatientContactInformation(row.patient.id));
  };

  return (
    <TableRow
      onClick={onContactInformationModalOpen}
      sx={{ cursor: 'pointer' }}
      hover
      role="checkbox"
      tabIndex={-1}
      key={row.id}
    >
      <TableCell>{row.title}</TableCell>
      <TableCell component="th" id={labelId} scope="row" sx={{ cursor: 'pointer' }}>
        <Typography variant="subtitle1">{row.patient.name}</Typography>
        <Typography variant="subtitle2">{row.patient.identifier}</Typography>
        <Typography variant="subtitle2">{row.patient.dateOfBirth}</Typography>
      </TableCell>
      <TableCell align="left">{row.labName}</TableCell>
      <TableCell align="left">{row.status}</TableCell>
      <TableCell align="center">
        <Chip
          sx={{ background: chipColor.light, color: chipColor.dark }}
          label={`${row.age} ${t(Translation.PAGE_RESULTS_LIST_ITEM_DAYS)}`}
          size="small"
          chipColor="notActive"
        />
      </TableCell>
    </TableRow>
  );
};

export default PendingTestResultRow;
