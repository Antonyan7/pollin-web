import React from 'react';
// assets
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
// material-ui
import { Checkbox, IconButton, TableCell, TableRow, Typography } from '@mui/material';
import { Row } from 'components/Scheduling/scheduleTemplates';

interface TableComponentProps {
  isItemSelected: boolean;
  row: Row;
  handleClick: (event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>, name: string) => void;
  labelId: string;
}

const ScheduleTempleteRow = ({ isItemSelected, row, handleClick, labelId }: TableComponentProps) => (
  <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} selected={isItemSelected}>
    <TableCell padding="checkbox" sx={{ pl: 3 }} onClick={(event) => handleClick(event, row.name)}>
      <Checkbox
        color="primary"
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
      onClick={(event) => handleClick(event, row.name)}
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
      <IconButton color="primary" size="large">
        <VisibilityTwoToneIcon sx={{ fontSize: '1.3rem' }} />
      </IconButton>
      <IconButton color="secondary" size="large">
        <EditTwoToneIcon sx={{ fontSize: '1.3rem' }} />
      </IconButton>
    </TableCell>
  </TableRow>
);

export default ScheduleTempleteRow;
