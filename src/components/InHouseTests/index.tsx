import React, { useEffect, useMemo, useState } from 'react';
import { ISpecimensListReqBody, SpecimensListSortFields } from '@axios/results/resultsManagerTypes';
import NoResultsFound from '@components/NoResultsFound';
import { PatientListStyled } from '@components/Patients/PatientListStyled';
import {
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
import findCurrentAction from 'helpers/findCurrentAction';
import { handleSelectAllClick, onCheckboxClick } from 'helpers/handleCheckboxClick';
import { margins, paddings } from 'themes/themeConstants';
import { SortOrder } from 'types/patient';
import { ISpecimensListItem, TableRowCheckboxProps } from 'types/reduxTypes/resultsStateTypes';

import { CheckedIcon } from '@assets/icons/CheckedIcon';
import CircularLoading from '@ui-component/circular-loading';
import ResultsTableRowToolbar from '@ui-component/EnhancedTableToolbar/ResultsTableRowToolbar';
import CustomCheckbox from '@ui-component/orders/OrderGroupCheckbox';

import useInHouseSpecimensListCallbacks from './hooks/useInHouseTestsCallbacks';
import SpecimensListContext from './context';
import SpecimenListHeader from './ListHeader';
import HeaderCells from './ListHeaderCell';
import SpecimenListRow from './ListRow';
import SpecimenStatistics from './Statistics';
import { InHouseSpecimensListCallbacks, InHouseSpecimensListState } from './types';

const InHouseSpecimensList = () => {
  const [inHouseSpecimensList, setInHouseSpecimensList] = useState<InHouseSpecimensListState>({
    page: 0,
    searchedItems: [],
    sortField: SpecimensListSortFields.COLLECTION_AGE,
    sortOrder: SortOrder.Desc,
    selectedFilters: []
  });

  const specimensList = useAppSelector(resultsSelector.specimensList);
  const isSpecimensListLoading = useAppSelector(resultsSelector.isSpecimensListLoading);

  const isSpecimensConfirmationButtonClicked = useAppSelector(resultsSelector.isSpecimensConfirmationButtonClicked);
  const theme = useTheme();

  useEffect(() => {
    dispatch(resultsMiddleware.getSpecimenActions());
  }, []);

  const inHouseSpecimensListCallbacks = useInHouseSpecimensListCallbacks(setInHouseSpecimensList);

  const { handlePageChange } = inHouseSpecimensListCallbacks;

  useEffect(() => {
    const { page, searchedItems, sortField, sortOrder, selectedFilters } = inHouseSpecimensList;

    const data: ISpecimensListReqBody = {
      ...(searchedItems.length > 0 ? { specimens: searchedItems.map((identifier) => ({ identifier })) } : {}),
      ...(selectedFilters.length ? { filters: selectedFilters.map(({ type, id }) => ({ type, id })) } : {}),
      ...(sortField ? { sortByField: sortField } : {}),
      ...(sortOrder ? { sortOrder } : {}),
      page: page + 1
    };

    dispatch(resultsMiddleware.getSpecimensList(data));
  }, [inHouseSpecimensList, isSpecimensConfirmationButtonClicked]);

  const specimenActions = useAppSelector(resultsSelector.specimenActions);

  const [selectedRows, setSelectedRows] = useState<TableRowCheckboxProps[]>([]);
  const selectedIds = selectedRows.map((row) => row.id);
  const isSelected = (id: string) => selectedIds.indexOf(id) !== -1;
  const numSelected = selectedIds.length;

  const rowsCount = specimensList?.specimens.length;
  const isAllSelected = rowsCount > rowsPerPage ? rowsPerPage : rowsCount;
  const isAllSpecimensSelected = rowsCount > 0 && !!numSelected && !!isAllSelected;
  const areAvailableSpecimens = rowsCount > 0;
  const isResultsNotFound = !areAvailableSpecimens && !isSpecimensListLoading;

  const listContextValues = useMemo(
    () => ({
      callbacks: inHouseSpecimensListCallbacks as InHouseSpecimensListCallbacks,
      inHouseSpecimensList
    }),
    [inHouseSpecimensList, inHouseSpecimensListCallbacks]
  );

  return (
    <SpecimensListContext.Provider value={listContextValues}>
      <PatientListStyled>
        <SpecimenStatistics />
        <SpecimenListHeader />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <CustomCheckbox
                    checkedIcon={<CheckedIcon />}
                    checkedColor={theme.palette.primary.light}
                    indeterminate={numSelected > 0 && numSelected < rowsCount}
                    checked={isAllSpecimensSelected}
                    onChange={(e) => handleSelectAllClick(e, specimensList.specimens, setSelectedRows)}
                  />
                </TableCell>
                {numSelected > 0 && (
                  <TableCell padding="none" colSpan={6}>
                    <ResultsTableRowToolbar
                      numSelected={numSelected}
                      specimenActions={specimenActions}
                      selectedRows={selectedRows}
                    />
                  </TableCell>
                )}
                {numSelected <= 0 && <HeaderCells />}
                <TableCell />
              </TableRow>
            </TableHead>
            {!isSpecimensListLoading && (
              <TableBody>
                {specimensList?.specimens?.map((row: ISpecimensListItem) => {
                  const filteredSpecimenAction = findCurrentAction(specimenActions, row);
                  const isItemSelected = isSelected(row.id);
                  const isActionsAvailable = filteredSpecimenAction && numSelected === 0;

                  return (
                    <SpecimenListRow
                      row={row}
                      key={row.id}
                      actions={isActionsAvailable ? filteredSpecimenAction.actions : []}
                      isItemSelected={isItemSelected}
                      onClick={(e) =>
                        // TODO: https://fhhealth.atlassian.net/browse/PCP-2409 The same logic used in a few create common solution for this.
                        onCheckboxClick(e, row, selectedRows, setSelectedRows)
                      }
                    />
                  );
                })}
              </TableBody>
            )}
          </Table>
          {isSpecimensListLoading && (
            <CircularLoading sx={{ margin: margins.auto, marginTop: margins.top16, py: paddings.topBottom16 }} />
          )}
        </TableContainer>
        {isResultsNotFound && <NoResultsFound />}
        <TablePagination
          component="div"
          count={specimensList.totalItems}
          rowsPerPage={specimensList.pageSize}
          page={specimensList.currentPage - 1}
          onPageChange={handlePageChange}
        />
      </PatientListStyled>
    </SpecimensListContext.Provider>
  );
};

export default InHouseSpecimensList;
