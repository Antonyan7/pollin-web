import { styled, TableCell } from '@mui/material';
import { paddings } from 'themes/themeConstants';

const TableRowCell = styled(TableCell)({
  padding: `${paddings.topBottom24} ${paddings.leftRight16}`
});

export default TableRowCell;
