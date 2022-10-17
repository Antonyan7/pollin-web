import React, { useCallback } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Checkbox, IconButton, TableCell, TableRow, Typography, useTheme } from '@mui/material';
import { timeAdjuster } from 'helpers/timeAdjuster';
import { useRouter } from 'next/router';

import { ITableRow } from './Table';

interface TableComponentProps {
  isItemSelected: boolean;
  row: ITableRow;
  onClick: (event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>, name: string) => void;
  labelId: string;
}

const ScheduleTemplatesRow = ({ isItemSelected, row, onClick, labelId }: TableComponentProps) => {
  const theme = useTheme();
  const router = useRouter();
  const onViewClick = useCallback(
    (id: string) => {
      router.push({ pathname: '/scheduling/view-schedule', query: { scheduleId: id } });
    },
    [router]
  );

  const onEditClick = useCallback(
    (id: string) => {
      router.push({ pathname: '/scheduling/edit-template', query: { scheduleId: id } });
    },
    [router]
  );

  return (
    <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} selected={isItemSelected}>
      <TableCell padding="checkbox" onClick={(event) => onClick(event, row.name)}>
        <Checkbox
          sx={{ color: theme.palette.primary.main }}
          checked={isItemSelected}
          inputProps={{
            'aria-labelledby': labelId
          }}
        />
      </TableCell>
      <TableCell
        component="th"
        id={labelId}
        scope="row"
        onClick={(event) => onClick(event, row.name)}
        sx={{ cursor: 'pointer' }}
      >
        <Typography variant="subtitle1" sx={{ color: 'grey.900' }}>
          {' '}
          {row.name}{' '}
        </Typography>
      </TableCell>
      <TableCell>{row.duration}</TableCell>
      <TableCell align="right">{timeAdjuster(new Date(row.lastSavedDay)).customizedDate}</TableCell>
      <TableCell align="center">{row.status}</TableCell>
      <TableCell align="center" sx={{ pr: 3 }}>
        <IconButton onClick={() => onViewClick(row.id)} sx={{ color: theme.palette.primary.main }} size="large">
          <VisibilityOutlinedIcon sx={{ fontSize: '1.3rem' }} />
        </IconButton>
        <IconButton sx={{ color: theme.palette.primary.main }} size="large" onClick={() => onEditClick(row.id)}>
          <EditOutlinedIcon sx={{ fontSize: '1.3rem' }} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ScheduleTemplatesRow;
