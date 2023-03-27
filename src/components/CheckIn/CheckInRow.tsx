import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { statuses } from '@components/CheckIn/checkInStatuses';
import { TableCell, TableRow, useTheme } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { paddings } from 'themes/themeConstants';
import { AppointmentStatus, ICheckInAppointment } from 'types/reduxTypes/bookingStateTypes';

import { CheckedIcon } from '@assets/icons/CheckedIcon';
import CustomCheckbox from '@ui-component/orders/OrderGroupCheckbox';
import Chip from '@ui-component/patient/Chip';
import { DateUtil } from '@utils/date/DateUtil';

const CheckInRow = ({ row }: { row: ICheckInAppointment }) => {
  const theme = useTheme();
  const patientProfile = useAppSelector(patientsSelector.patientProfile);
  const { control, register, setValue } = useFormContext();
  const { field } = useController({
    name: `checkInAppointments`,
    control
  });
  const { onBlur, ref, name } = register('checkInAppointments');

  const onCheckBoxClick = (value: boolean) => {
    if (value) {
      setValue('checkInAppointments', field.value.length ? [...field.value, row.id] : [row.id]);
    } else {
      setValue(
        'checkInAppointments',
        field.value.filter((item: string) => item !== row.id)
      );
    }
  };

  const status = statuses(theme)[row.status];

  return (
    <TableRow tabIndex={-1} key={row.id}>
      <TableCell padding="checkbox">
        {row.checkInAllowed && patientProfile?.isIntakeComplete ? (
          <CustomCheckbox
            checkedIcon={<CheckedIcon />}
            key={row.id}
            onBlur={onBlur}
            ref={ref}
            onChange={(_, value) => onCheckBoxClick(value)}
            checkedColor={theme.palette.primary.light}
            name={name}
          />
        ) : null}
      </TableCell>
      <TableCell>{row.type}</TableCell>
      <TableCell align="left">{DateUtil.formatFullDate(row.date)}</TableCell>
      <TableCell align="center">
        <Chip
          sx={{
            background: status?.backgroundColor,
            color: status?.textColor,
            pr: paddings.right2,
            pl: paddings.left2
          }}
          label={AppointmentStatus[row.status]}
          size="small"
          chipColor="notActive"
        />
      </TableCell>
    </TableRow>
  );
};

export default CheckInRow;
