import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PatientListStyled } from '@components/Patients/PatientListStyled';
import {
  Box,
  Checkbox,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  useTheme
} from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { rowsPerPage } from 'helpers/constants';
import { margins } from 'themes/themeConstants';
import { IHeadCell } from 'types/patient';
import { ISpecimensListItem } from 'types/reduxTypes/resultsStateTypes';

import EnhancedTableToolbarExternalResults from '@ui-component/EnhancedTableToolbar/EnhacnedTableToolbarExternalResults';
import SpecimensStatsView from '@ui-component/profile/SpecimensStatsView';

import { InHouseSpecimensHeadCell } from './InHouseSpecimensHeadCell';
import { headCellsData } from './InHouseSpecimensHeadCellMockData';
import { InHouseSpecimensRow } from './InHouseSpecimensRow';

const InHouseSpecimensList = () => {
  const [page, setPage] = React.useState<number>(0);
  const pendingSpecimenStats = useAppSelector(resultsSelector.pendingSpecimenStats);
  const specimensList = useAppSelector(resultsSelector.specimensList);
  const isSpecimensListLoading = useAppSelector(resultsSelector.isSpecimensListLoading);
  const theme = useTheme();
  const [t] = useTranslation();
  const headCells = headCellsData(t) as IHeadCell[];

  useEffect(() => {
    dispatch(resultsMiddleware.getPendingSpecimenStats());
  }, []);

  useEffect(() => {
    const data = {
      page: page + 1
    };

    dispatch(resultsMiddleware.getSpecimensList(data));
  }, [page]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    dispatch(resultsMiddleware.getSpecimenActions());
  }, []);

  const specimenActions = useAppSelector(resultsSelector.specimenActions);

  const [selected, setSelected] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelectedId = specimensList?.specimens.map((specimen) => specimen.id);
      const newSelectedStatus = specimensList?.specimens.map((specimen) => specimen.status);

      setSelected(newSelectedId);
      setSelectedStatuses(newSelectedStatus);

      return;
    }

    setSelected([]);
    setSelectedStatuses([]);
  };

  const onClickCheckbox = (event: React.MouseEvent, id: string, status: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];
    let newSelectedStatus: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
      newSelectedStatus = newSelectedStatus.concat(selectedStatuses, status);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newSelectedStatus = newSelectedStatus.concat(selectedStatuses.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newSelectedStatus = newSelectedStatus.concat(selectedStatuses.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
      newSelectedStatus = newSelectedStatus.concat(
        selectedStatuses.slice(0, selectedIndex),
        selectedStatuses.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    setSelectedStatuses(newSelectedStatus);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;
  const numSelected = selected.length;
  const rowCount = specimensList?.specimens.length;

  return (
    <PatientListStyled>
      <Box sx={{ marginBottom: margins.bottom32 }}>
        <SpecimensStatsView stats={pendingSpecimenStats} />
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  sx={{ color: theme.palette.primary.main }}
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowsPerPage}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              {numSelected > 0 && (
                <TableCell padding="none" colSpan={6}>
                  <EnhancedTableToolbarExternalResults
                    numSelected={numSelected}
                    specimenActions={specimenActions}
                    selectedStatuses={selectedStatuses}
                    selected={selected}
                  />
                </TableCell>
              )}
              {numSelected <= 0 && headCells.map((headCell) => <InHouseSpecimensHeadCell headCell={headCell} />)}
            </TableRow>
          </TableHead>

          <TableBody>
            {specimensList?.specimens?.map((row: ISpecimensListItem, index: number) => {
              const filteredSpecimenActions = specimenActions.find((item) => item.status === row.status);
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <InHouseSpecimensRow
                  row={row}
                  key={row.id}
                  actions={filteredSpecimenActions ? filteredSpecimenActions.actions : []}
                  isItemSelected={isItemSelected}
                  onClick={(e) => onClickCheckbox(e, row.id, row.status)}
                  labelId={labelId}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {isSpecimensListLoading ? (
        <Box sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center', marginTop: margins.top16 }}>
          <CircularProgress sx={{ margin: margins.auto }} />
        </Box>
      ) : null}
      <TablePagination
        component="div"
        count={specimensList.totalItems}
        rowsPerPage={specimensList.pageSize}
        page={specimensList.currentPage - 1}
        onPageChange={handleChangePage}
      />
    </PatientListStyled>
  );
};

export default InHouseSpecimensList;
