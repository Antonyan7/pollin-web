import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledButtonNew } from '@components/Appointments/CommonMaterialComponents';
import { tableRowCount } from '@constants';
import AddIcon from '@mui/icons-material/Add';
// material-ui
import {
  Box,
  CardContent,
  Checkbox,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
  useTheme
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { Translation } from 'constants/translations';
import { getComparator, stableSort } from 'helpers/tableSort';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { schedulingMiddleware, schedulingSelector } from 'redux/slices/scheduling';
import { ArrangementOrder, EnhancedTableHeadProps, HeadCell } from 'types';
import MainCard from 'ui-component/cards/MainCard';
import EnhancedTableToolbar from 'ui-component/EnhancedTableToolbar';

import ScheduleTemplateRow from './ScheduleTemplateRow';

// table header options
const headCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    label: Translation.PAGE_SCHEDULING_TEMPLATES_TABLE_HEADER_NAME,
    align: 'left'
  },
  {
    id: 'duration',
    numeric: true,
    label: Translation.PAGE_SCHEDULING_TEMPLATES_TABLE_HEADER_DURATION,
    align: 'left'
  },
  {
    id: 'lastSavedOn',
    numeric: true,
    label: Translation.PAGE_SCHEDULING_TEMPLATES_TABLE_HEADER_LAST,
    align: 'right'
  },
  {
    id: 'status',
    numeric: true,
    label: Translation.PAGE_SCHEDULING_TEMPLATES_TABLE_HEADER_STATUS,
    align: 'center'
  },
  {
    id: 'action',
    numeric: false,
    label: Translation.PAGE_SCHEDULING_TEMPLATES_TABLE_HEADER_ACTION,
    align: 'center'
  }
];

// ==============================|| TABLE HEADER ||============================== //

interface CustomerListEnhancedTableHeadProps extends EnhancedTableHeadProps {
  selected: string[];
}

export interface Row {
  id: string;
  name: string;
  duration: string;
  lastSavedDay: string;
  status: string;
}

const EnhancedTableHead = ({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  selected
}: CustomerListEnhancedTableHeadProps) => {
  const theme = useTheme();
  const [t] = useTranslation();
  const createSortHandler = (property: string) => (event: React.SyntheticEvent<Element, Event>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={{ pl: 3 }}>
          <Checkbox
            sx={{ color: theme.palette.primary.main }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>
        {numSelected > 0 && (
          <TableCell padding="none" colSpan={6}>
            <EnhancedTableToolbar numSelected={selected.length} selected={selected} />
          </TableCell>
        )}
        {numSelected <= 0 &&
          headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.align}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {t(headCell.label)}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
};

// ==============================|| CUSTOMER LIST ||============================== //
// TODO update component to contain 150 lines
// eslint-disable-next-line max-lines-per-function
const ScheduleTemplates = () => {
  const [order, setOrder] = React.useState<ArrangementOrder>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('calories');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [rows, setRows] = React.useState<Row[]>([]);
  const router = useRouter();
  const theme = useTheme();
  const [t] = useTranslation();

  const scheduleTemplates = useAppSelector(schedulingSelector.scheduleTemplates);

  useEffect(() => {
    dispatch(schedulingMiddleware.getSchedulingTemplates());
  }, []);

  useEffect(() => {
    setRows(scheduleTemplates);
  }, [scheduleTemplates]);

  const handleRequestSort = useCallback(
    (event: React.SyntheticEvent<Element, Event>, property: string) => {
      const isAsc = orderBy === property && order === 'asc';

      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    },
    [order, orderBy]
  );

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelectedId = rows.map((n) => n.id);

      setSelected(newSelectedId);

      return;
    }

    setSelected([]);
  };

  const onClick = (event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleNewTemplate = () => {
    router.push('/scheduling/create-template');
  };

  const handleChangePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined,
    itemCount: number
  ) => {
    if (event?.target.value) {
      setRowsPerPage(parseInt(event?.target.value, itemCount));
    }

    setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      {/* to do //add header compoenent */}
      <MainCard content={false}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8}>
              <Typography variant="h3">{t(Translation.PAGE_SCHEDULING_TEMPLATES_TITLE)}</Typography>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={2}>
              <StyledButtonNew
                theme={theme}
                variant="outlined"
                endIcon={<AddIcon sx={{ color: theme.palette.primary.main }} />}
                onClick={handleNewTemplate}
              >
                <Typography variant="h4" sx={{ marginRight: '10px' }}>
                  {t(Translation.PAGE_SCHEDULING_TEMPLATES_BUTTON_CREATE)}
                </Typography>
              </StyledButtonNew>
            </Grid>
          </Grid>
        </CardContent>
        {/* table */}
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              selected={selected}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  /** Make sure no display bugs if row isn't an OrderData object */
                  if (typeof row === 'number') {
                    return null;
                  }

                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <ScheduleTemplateRow
                      key={`template-${row.id}-${row.name}`}
                      isItemSelected={isItemSelected}
                      row={row}
                      onClick={(e) => onClick(e, row.id)}
                      labelId={labelId}
                    />
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* table pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={(e) => handleChangeRowsPerPage(e, tableRowCount)}
        />
      </MainCard>
    </>
  );
};

export default ScheduleTemplates;
