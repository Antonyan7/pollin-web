import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { statuses } from '@components/CheckIn/checkInStatuses';
import { TableCell, TableRow, useTheme } from '@mui/material';
import { format } from 'date-fns';
import { ICheckinAppointment } from 'types/reduxTypes/bookingStateTypes';

import { CheckedIcon } from '@assets/icons/CheckedIcon';
import CustomCheckbox from '@ui-component/orders/OrderGroupCheckbox';
import Chip from '@ui-component/patient/Chip';
import { convertToLocale, convertTZ, getClinicTimezone } from '@utils/dateUtils';

const CheckInRow = ({ row }: { row: ICheckinAppointment }) => {
  const theme = useTheme();
  const { control, register, setValue } = useFormContext();
  const { field } = useController({
    name: `checkInAppointments`,
    control
  });
  const { onBlur, ref, name } = register('checkInAppointments');

  const formatDate = () => {
    const date = new Date(convertToLocale(row.date));
    const currentClinicDateTime = convertTZ(new Date(), getClinicTimezone()) as Date;

    if (date.getDate() === currentClinicDateTime.getDate()) {
      return `Today ${format(date, 'HH:mm')}`;
    }

    return format(date, 'MMM dd, yyyy HH:mm');
  };
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
        {row.checkInAllowed ? (
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
      <TableCell align="left">{formatDate()} [EST]</TableCell>
      <TableCell align="center">
        <Chip
          sx={{
            background: status?.backgroundColor,
            color: status?.textColor
          }}
          label={row.status}
          size="small"
          chipColor="notActive"
        />
      </TableCell>
    </TableRow>
  );
};

export default CheckInRow;
