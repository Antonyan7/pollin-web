import React from 'react';
import { useTranslation } from 'react-i18next';
import PatientAlert from '@components/Patients/PatientAlert';
import { TableCell, TableRow, Typography } from '@mui/material';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { dispatch } from 'redux/hooks';
import { patientsMiddleware } from 'redux/slices/patients';
import { IPatientListData } from 'types/reduxTypes/patient-emrStateTypes';

import Chip from '@ui-component/patient/Chip';

interface IPatientTableRow {
  row: IPatientListData;
  index: number;
}

const PatientTableRow = ({ row, index }: IPatientTableRow) => {
  const labelId = `enhanced-table-checkbox-${index}`;
  const router = useRouter();
  const [t] = useTranslation();

  const chipLabel = t(Translation.CYCLE_STATUS_NOT_ACTIVE);

  const onRowClick = (id: string) => {
    router.push(`/patient-emr/details/${id}/profile`);
    dispatch(patientsMiddleware.isPatientAlertViewOpen(true));
  };

  return (
    <TableRow
      sx={{ cursor: 'pointer' }}
      onClick={() => onRowClick(row.id)}
      hover
      role="checkbox"
      tabIndex={-1}
      key={row.id}
    >
      <TableCell component="th" id={labelId} scope="row" sx={{ cursor: 'pointer' }}>
        <Typography variant="subtitle1" sx={{ color: 'grey.900' }}>
          {row.name}
        </Typography>
        <Typography variant="caption">{row.subString}</Typography>
      </TableCell>
      <TableCell>{row.doctor}</TableCell>
      <TableCell align="center">
        <PatientAlert rowId={row.id} alertCount={row.alertsCount} />
      </TableCell>
      <TableCell align="center">{row.dateOfBirth}</TableCell>
      <TableCell align="center">
        <Chip label={chipLabel} size="small" chipColor="notActive" />
      </TableCell>
    </TableRow>
  );
};

export default PatientTableRow;
