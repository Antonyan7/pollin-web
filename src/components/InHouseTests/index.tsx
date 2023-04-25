import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import { Translation } from 'constants/translations';
import { rowsPerPage } from 'helpers/constants';
import findCurrentAction from 'helpers/findCurrentAction';
import { handleSelectAllClick, onCheckboxClick } from 'helpers/handleCheckboxClick';
import { margins, paddings } from 'themes/themeConstants';
import { SortOrder } from 'types/patient';
import { ContextMenuAction, ISpecimensListItem, TableRowCheckboxProps } from 'types/reduxTypes/resultsStateTypes';

import { CheckedIcon } from '@assets/icons/CheckedIcon';
import { ISpecimenRowProps } from '@hooks/contextMenu/types';
import useSpecimenActions from '@hooks/contextMenu/useSpecimenActions';
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
  const theme = useTheme();
  const [t] = useTranslation();
  const [inHouseSpecimensList, setInHouseSpecimensList] = useState<InHouseSpecimensListState>({
    page: 0,
    searchedItems: [],
    sortField: SpecimensListSortFields.COLLECTION_AGE,
    sortOrder: SortOrder.Desc,
    selectedFilters: []
  });
  const specimensList = useAppSelector(resultsSelector.specimensList);
  const isLoading = useAppSelector(resultsSelector.isSpecimensListLoading);
  const actionVariations = useAppSelector(resultsSelector.specimenActions);
  const isSpecimensConfirmationButtonClicked = useAppSelector(resultsSelector.isSpecimensConfirmationButtonClicked);
  const inHouseSpecimensListCallbacks = useInHouseSpecimensListCallbacks(setInHouseSpecimensList);
  const { handlePageChange } = inHouseSpecimensListCallbacks;
  const [selectedRows, setSelectedRows] = useState<TableRowCheckboxProps[]>([]);

  const selectedIds = selectedRows.map((row) => row.id);
  const isSelected = (id: string) => selectedIds.indexOf(id) !== -1;
  const numSelected = selectedIds.length;
  const rowsCount = specimensList?.specimens.length;
  const isAllSelected = rowsCount > rowsPerPage ? rowsPerPage : rowsCount;
  const isAllSpecimensSelected = rowsCount > 0 && !!numSelected && !!isAllSelected;
  const areAvailableSpecimens = rowsCount > 0;
  const isResultsNotFound = !areAvailableSpecimens && !isLoading;

  useEffect(() => {
    if (!actionVariations.length) {
      dispatch(resultsMiddleware.getSpecimenActions());
    }
  }, [actionVariations]);

  useEffect(() => {
    setSelectedRows([]);
  }, [specimensList]);

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

  const listContextValues = useMemo(
    () => ({
      callbacks: inHouseSpecimensListCallbacks as InHouseSpecimensListCallbacks,
      inHouseSpecimensList
    }),
    [inHouseSpecimensList, inHouseSpecimensListCallbacks]
  );

  const actions = useMemo(() => {
    const statuses = selectedRows.map((row) => row.status);
    const uniqueStatuses = Array.from(new Set(statuses));

    if (uniqueStatuses.length === 1) {
      const onlyStatus = uniqueStatuses[0];
      const currentStatusActions: ContextMenuAction[] =
        actionVariations.find((variation) => variation.status === onlyStatus)?.actions ?? [];

      return currentStatusActions;
    }

    return [];
  }, [selectedRows, actionVariations]);

  const actionBindings = useSpecimenActions(selectedRows as ISpecimenRowProps[], actions, -1, true);
  const inHouseEmptyStateLabel = t(Translation.PAGE_IN_HOUSE_EMPTY_RESULTS_LABEL);

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
                    <ResultsTableRowToolbar actionBindings={actionBindings} selectionCount={numSelected} />
                  </TableCell>
                )}
                {numSelected <= 0 && <HeaderCells />}
                <TableCell />
              </TableRow>
            </TableHead>
            {!isLoading && (
              <TableBody>
                {specimensList?.specimens?.map((row: ISpecimensListItem) => {
                  const filteredSpecimenAction = findCurrentAction(actionVariations, row);
                  const isItemSelected = isSelected(row.id);
                  const isContextMenuAvailable = filteredSpecimenAction && numSelected < 2;

                  return (
                    <SpecimenListRow
                      row={row}
                      key={row.id}
                      actions={isContextMenuAvailable ? filteredSpecimenAction.actions : []}
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
          {isLoading && (
            <CircularLoading sx={{ margin: margins.auto, marginTop: margins.top16, py: paddings.topBottom16 }} />
          )}
        </TableContainer>
        {isResultsNotFound && <NoResultsFound label={inHouseEmptyStateLabel} />}
        <TablePagination
          labelRowsPerPage={`${t(Translation.COMMON_PAGINATION_ROWS_COUNT)} :`}
          component="div"
          count={specimensList.totalItems}
          rowsPerPage={specimensList.pageSize}
          page={specimensList.currentPage > 1 ? specimensList.currentPage - 1 : 0}
          onPageChange={handlePageChange}
        />
      </PatientListStyled>
    </SpecimensListContext.Provider>
  );
};

export default InHouseSpecimensList;
