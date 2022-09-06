import React from 'react';
import { Badge, TableCell, TableRow, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Chip from '@ui-component/patient/Chip';

import alertIcon from '../../assets/images/patient/icons/alertIcon.svg';
import avatarIconPatient from '../../assets/images/patient/icons/avatarIconPatient.svg';
import { IPatient } from '../../types/patient';

interface IPatientTableRow {
  row: IPatient;
  index: number;
}

const PatientTableRow = ({ row, index }: IPatientTableRow) => {
  const labelId = `enhanced-table-checkbox-${index}`;
  const router = useRouter();

  const onRowClick = (id: string) => {
    router.push({ pathname: '/patient-emr/patient-details', query: { patientId: id } });
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
        <Image src={avatarIconPatient} />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row">
        <Typography variant="subtitle1" sx={{ color: 'grey.900' }}>
          {row.name}
        </Typography>
        <Typography variant="caption">{row.subString}</Typography>
      </TableCell>
      <TableCell>{row.doctor}</TableCell>
      <TableCell align="center">
        {row.alertsCount ? (
          <Badge badgeContent={row.alertsCount} color="error">
            <Image src={alertIcon} />
          </Badge>
        ) : (
          <Typography>None</Typography>
        )}
      </TableCell>
      <TableCell align="center">{row.dateOfBirth}</TableCell>
      <TableCell align="center">
        <Chip label={row.cycleStatus} size="small" chipColor="notActive" />
      </TableCell>
    </TableRow>
  );
};

export default PatientTableRow;
