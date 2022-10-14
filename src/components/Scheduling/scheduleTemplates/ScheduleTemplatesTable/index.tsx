import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, CircularProgress, Table, TableBody, TableContainer } from '@mui/material';
import { Translation } from 'constants/translations';
import { ScheduledTemplatesListContext } from 'context/ScheduledTemplates';
import { getComparator, stableSort } from 'helpers/tableSort';
import { useAppSelector } from 'redux/hooks';
import { schedulingSelector } from 'redux/slices/scheduling';
import { margins } from 'themes/themeConstants';
import { ArrangementOrder } from 'types';

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
  const [selected, setSelected] = React.useState<string[]>([]);

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

  const changeSelectedScheduledTemplate = useCallback((newSelected: string[]) => {
    setSelected(newSelected);
  }, []);

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const scheduledTemplatesListContextState = useMemo(
    () => ({
      selected,
      setSelected: changeSelectedScheduledTemplate
    }),
    [changeSelectedScheduledTemplate, selected]
  );

  return (
    <TableContainer>
      <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
        <ScheduledTemplatesListContext.Provider value={scheduledTemplatesListContextState}>
          <ScheduleTemplatesHead
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={scheduleTemplates.totalItems}
          />
        </ScheduledTemplatesListContext.Provider>
        {!isScheduleTemplatesLoading && (
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
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
                />
              );
            })}
          </TableBody>
        )}
      </Table>
      {isScheduleTemplatesLoading && (
        <Box sx={{ textAlign: 'center', marginTop: margins.top24 }}>
          <CircularProgress sx={{ margin: margins.auto }} />
          <p>{t(Translation.PAGE_SCHEDULING_TEMPLATES_TABLE_LOADING)}</p>
        </Box>
      )}
    </TableContainer>
  );
};

export default ScheduleTemplatesTable;
