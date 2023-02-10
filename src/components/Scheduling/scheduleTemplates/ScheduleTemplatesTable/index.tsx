import React from 'react';
import { useTranslation } from 'react-i18next';
import EmptyScheduleState from '@components/Scheduling/EmptyStateSchedule';
import { Box, CircularProgress, Table, TableBody, TableContainer } from '@mui/material';
import { Translation } from 'constants/translations';
import { useScheduleTemplatesContext } from 'context/ScheduleTemplatesContext';
import { getComparator, stableSort } from 'helpers/tableSort';
import { useAppSelector } from 'redux/hooks';
import { schedulingSelector } from 'redux/slices/scheduling';
import { margins } from 'themes/themeConstants';
import { ArrangementOrder } from 'types';

import { CypressIds } from '../../../../constants/cypressIds';

import ScheduleTemplatesHead from './ScheduleTemplatesHead';
import ScheduleTemplatesRow from './ScheduleTemplatesRow';
import { ITableRow } from './Table';

interface Props {
  rows: ITableRow[];
  isScheduleTemplatesLoading: boolean;
}

const ScheduleTemplatesTable = ({ rows, isScheduleTemplatesLoading }: Props) => {
  const scheduleTemplates = useAppSelector(schedulingSelector.scheduleTemplates);
  const [t] = useTranslation();

  const [order, setOrder] = React.useState<ArrangementOrder>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('calories');
  const { selected, setSelected } = useScheduleTemplatesContext();
  const loadingIndicatorCyId = CypressIds.PAGE_SCHEDULING_TEMPLATES_LOADING_INDICATOR;

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelectedId = rows.map((n) => n.id);

      setSelected(newSelectedId);

      return;
    }

    setSelected([]);
  };

  const onClick = (event: React.MouseEvent, id: string) => {
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

  const handleRequestSort = (_event: React.SyntheticEvent, property: string) => {
    const isAsc = orderBy === property && order === 'asc';

    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  return (
    <TableContainer>
      <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
        <ScheduleTemplatesHead
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={scheduleTemplates.totalItems}
        />
        {!isScheduleTemplatesLoading && (
          <TableBody>
            {stableSort<ITableRow>(rows, getComparator<ITableRow>(order, orderBy)).map((row, index) => {
              /** Make sure no display bugs if row isn't an OrderData object */
              if (typeof row === 'number') {
                return null;
              }

              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <ScheduleTemplatesRow
                  key={`template-${row.id}`}
                  isItemSelected={isItemSelected}
                  row={row}
                  onClick={(e) => onClick(e, row.id)}
                  labelId={labelId}
                  index={index}
                />
              );
            })}
          </TableBody>
        )}
      </Table>
      {isScheduleTemplatesLoading ? (
        <Box sx={{ textAlign: 'center', marginTop: margins.top24 }}>
          <CircularProgress data-cy={loadingIndicatorCyId} sx={{ margin: margins.auto }} />
          <p>{t(Translation.PAGE_SCHEDULING_TEMPLATES_TABLE_LOADING)}</p>
        </Box>
      ) : (
        <EmptyScheduleState />
      )}
    </TableContainer>
  );
};

export default ScheduleTemplatesTable;
