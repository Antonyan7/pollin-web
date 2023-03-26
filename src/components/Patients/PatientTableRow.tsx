import React from 'react';
import { useTranslation } from 'react-i18next';
import PatientAlert from '@components/Patients/PatientAlert';
import TableRowCell from '@components/Table/TableRowCell';
import { TableRow, Typography } from '@mui/material';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { dispatch } from 'redux/hooks';
import { patientsMiddleware } from 'redux/slices/patients';
import { IPatientListData } from 'types/reduxTypes/patient-emrStateTypes';

import AvatarIcon from '@assets/icons/AvatarIcon';
import Chip from '@ui-component/patient/Chip';
import { DateUtil } from '@utils/date/DateUtil';

interface IPatientTableRow {
  row: IPatientListData;
  index: number;
}

const PatientTableRow = ({ row, index }: IPatientTableRow) => {
  const router = useRouter();
  const [t] = useTranslation();
  const chipLabel = t(Translation.CYCLE_STATUS_NOT_ACTIVE);
  const labelId = `enhanced-table-checkbox-${index}`;
  const onRowClick = (id: string) => {
    router.push(`/patient-emr/details/${id}/profile`);
    dispatch(patientsMiddleware.isPatientAlertViewOpen(true));
  };

  const formattedDateOfBirth =
    row.dateOfBirth && row.dateOfBirth !== '-' ? DateUtil.formatDateOnly(row.dateOfBirth) : '-';

  return (
    <TableRow
      sx={{ cursor: 'pointer', borderColor: (theme) => theme.palette.primary.light }}
      onClick={() => onRowClick(row.id)}
      hover
      role="checkbox"
      tabIndex={-1}
      key={row.id}
    >
      <TableRowCell
        component="th"
        id={labelId}
        scope="row"
        width={10}
        sx={{
          paddingLeft: 0
        }}
      >
        <AvatarIcon
          sx={{
            mt: 1,
            fontSize: '2rem',
            fill: 'none'
          }}
        />
      </TableRowCell>
      <TableRowCell component="th" id={labelId} scope="row" sx={{ cursor: 'pointer' }}>
        <Typography
          sx={(theme) => ({
            fontSize: theme.typography.pxToRem(16),
            lineHeight: theme.typography.pxToRem(22.4),
            color: theme.palette.grey[600]
          })}
        >
          {row.name}
        </Typography>
        <Typography
          sx={(theme) => ({
            fontSize: theme.typography.pxToRem(12),
            lineHeight: theme.typography.pxToRem(16.8),
            color: theme.palette.grey[600]
          })}
        >
          {row.subString}
        </Typography>
      </TableRowCell>
      <TableRowCell
        sx={(theme) => ({
          fontSize: theme.typography.pxToRem(16),
          color: theme.palette.grey[600]
        })}
      >
        {row.doctor}
      </TableRowCell>
      <TableRowCell align="center">
        <PatientAlert rowId={row.id} alertCount={row.alertsCount} />
      </TableRowCell>
      <TableRowCell
        sx={(theme) => ({
          fontSize: theme.typography.pxToRem(16),
          color: theme.palette.grey[600]
        })}
        align="center"
      >
        {formattedDateOfBirth}
      </TableRowCell>
      <TableRowCell align="center">
        <Chip label={chipLabel} size="small" chipColor="notActive" />
      </TableRowCell>
    </TableRow>
  );
};

export default PatientTableRow;
