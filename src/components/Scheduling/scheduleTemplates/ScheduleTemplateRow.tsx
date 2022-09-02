import React, { useCallback } from 'react';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import { Checkbox, IconButton, TableCell, TableRow, Typography, useTheme } from '@mui/material';
import { Row } from 'components/Scheduling/scheduleTemplates';
import { useRouter } from 'next/router';

interface TableComponentProps {
  isItemSelected: boolean;
  row: Row;
  onClick: (event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>, name: string) => void;
  labelId: string;
}

const ScheduleTemplateRow = ({ isItemSelected, row, onClick, labelId }: TableComponentProps) => {
  const theme = useTheme();
  const router = useRouter();
  const onViewClick = useCallback(
    (id: string) => {
      router.push({ pathname: '/scheduling/view-schedule', query: { scheduleId: id } });
    },
    [router]
  );

  return (
    <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} selected={isItemSelected}>
      <TableCell padding="checkbox" sx={{ pl: 3 }} onClick={(event) => onClick(event, row.name)}>
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
      <TableCell align="right">{row.lastSavedDay}</TableCell>
      <TableCell align="center">{row.status}</TableCell>
      <TableCell align="center" sx={{ pr: 3 }}>
        <IconButton onClick={() => onViewClick(row.id)} sx={{ color: theme.palette.primary.main }} size="large">
          <VisibilityTwoToneIcon sx={{ fontSize: '1.3rem' }} />
        </IconButton>
        <IconButton sx={{ color: theme.palette.secondary.main }} size="large">
          <EditTwoToneIcon sx={{ fontSize: '1.3rem' }} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ScheduleTemplateRow;
