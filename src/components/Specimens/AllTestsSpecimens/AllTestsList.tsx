import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IAllTestsSpecimensReqBody, SpecimensListSortFields } from '@axios/results/resultsManagerTypes';
import NoResultsFound from '@components/NoResultsFound';
import { SeveritiesType } from '@components/Scheduling/types';
import SearchBox from '@components/SearchBox';
import { headCellsData } from '@components/Specimens/AllTestsSpecimens/AllTestsHeadCellMockData';
import { AllTestsRow } from '@components/Specimens/AllTestsSpecimens/AllTestsRow';
import { HeadCell } from '@components/Table/HeadCell';
import {
  Checkbox,
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
import { viewsMiddleware } from '@redux/slices/views';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { rowsPerPage } from 'helpers/constants';
import findCurrentAction from 'helpers/findCurrentAction';
import { handleSelectAllClick, onCheckboxClick } from 'helpers/handleCheckboxClick';
import { IHeadCell, SortOrder } from 'types/patient';
import {
  ContextMenuAction,
  IAllTestsSpecimensListItem,
  TableRowCheckboxProps
} from 'types/reduxTypes/resultsStateTypes';

import { ISpecimenRowProps } from '@hooks/contextMenu/types';
import useSpecimenActions from '@hooks/contextMenu/useSpecimenActions';
import CircularLoading from '@ui-component/circular-loading';
import ResultsTableRowToolbar from '@ui-component/EnhancedTableToolbar/ResultsTableRowToolbar';

// eslint-disable-next-line max-lines-per-function
const AllTestsList = () => {
  const [t] = useTranslation();
  const theme = useTheme();
  const [page, setPage] = useState<number>(0);
  const [identifiers, setIdentifiers] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SpecimensListSortFields | null>(SpecimensListSortFields.COLLECTION_AGE);
  const [sortOrder, setSortOrder] = useState<SortOrder | null>(SortOrder.Desc);
  const [toastHasBeenShown, setToastHasBeenShown] = useState(false);
  const specimensList = useAppSelector(resultsSelector.allTestsSpecimensList);
  const isLoading = useAppSelector(resultsSelector.isAllTestsSpecimensListLoading);
  const actionVariations = useAppSelector(resultsSelector.specimenActions);
  const shouldRefetchInAllSpecimensList = useAppSelector(resultsSelector.shouldRefetchInAllSpecimensList);

  const headCells = headCellsData(t) as IHeadCell[];

  const [selectedRows, setSelectedRows] = useState<TableRowCheckboxProps[]>([]);
  const selectedIds = selectedRows.map((row) => row.id);
  const isSelected = (id: string) => selectedIds.indexOf(id) !== -1;
  const numSelected = selectedIds.length;
  const rowsCount = specimensList?.specimens.length;
  const isAllSelected = rowsCount > rowsPerPage ? rowsPerPage : rowsCount;
  const isAllSpecimensSelected = rowsCount > 0 && !!numSelected && !!isAllSelected;

  const rowCount = specimensList?.specimens.length;

  const listFetchParams: IAllTestsSpecimensReqBody = useMemo(
    () => ({
      ...(identifiers.length > 0 ? { specimens: identifiers.map((identifier) => ({ identifier })) } : {}),
      ...(sortField ? { sortByField: sortField } : {}),
      ...(sortOrder ? { sortOrder } : {}),
      page: page + 1
    }),
    [page, identifiers, sortField, sortOrder]
  );

  const searchByIdsHandler = useCallback((idArr: string[]) => {
    setPage(0);
    setIdentifiers(idArr);
  }, []);

  useEffect(() => {
    setSelectedRows([]);
  }, [specimensList]);

  useEffect(() => {
    dispatch(resultsMiddleware.getAllTestsSpecimensList(listFetchParams));
  }, [listFetchParams]);

  useEffect(() => {
    if (shouldRefetchInAllSpecimensList) {
      if (listFetchParams.page === 1) {
        dispatch(resultsMiddleware.getAllTestsSpecimensList(listFetchParams));
      } else {
        setPage(0);
      }

      dispatch(resultsMiddleware.setShouldRefetchAllSpecimensList(false));
    }
  }, [listFetchParams, shouldRefetchInAllSpecimensList]);

  useEffect(() => {
    setToastHasBeenShown(false);
  }, [identifiers]);

  useEffect(() => {
    const shouldShowToast = identifiers.length > 0 && !isLoading && !toastHasBeenShown;

    if (shouldShowToast) {
      setToastHasBeenShown(true);

      if (specimensList.notFound?.length > 0) {
        dispatch(
          viewsMiddleware.setToastNotificationPopUpState({
            open: true,
            props: {
              severityType: SeveritiesType.error,
              renderList: {
                header: t(Translation.PAGE_IN_HOUSE_SPECIMENS_SEARCH_FAIL),
                items: specimensList.notFound.map((specimen) => specimen.identifier)
              }
            }
          })
        );
      } else {
        dispatch(
          viewsMiddleware.setToastNotificationPopUpState({
            open: true,
            props: {
              severityType: SeveritiesType.success,
              description: t(Translation.PAGE_IN_HOUSE_SPECIMENS_SEARCH_SUCCESS)
            }
          })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specimensList.notFound, isLoading, toastHasBeenShown]);

  useEffect(() => {
    if (!actionVariations.length) {
      dispatch(resultsMiddleware.getSpecimenActions());
    }
  }, [actionVariations]);

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

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
  const inHouseSpecimensSearchPlaceholder = t(Translation.PAGE_IN_HOUSE_SPECIMENS_SEARCH_PLACEHOLDER);
  const inHouseSpecimensListEmptyMessage = t(Translation.PAGE_IN_HOUSE_SPECIMENS_LIST_EMPTY_MESSAGE);
  const showEmptyState = !isLoading && !rowsCount;
  const showSpecimensList = rowsCount && !isLoading;

  return (
    <>
      <SearchBox onSearch={searchByIdsHandler} placeholder={inHouseSpecimensSearchPlaceholder} />
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          data-cy={CypressIds.PAGE_SPECIMEN_TRACKING_ALL_TEST_LIST}
        >
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  sx={{ color: theme.palette.primary.main }}
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={isAllSpecimensSelected}
                  onChange={(e) => handleSelectAllClick(e, specimensList.specimens, setSelectedRows)}
                />
              </TableCell>

              {numSelected > 0 ? (
                <TableCell padding="none" colSpan={6}>
                  <ResultsTableRowToolbar actionBindings={actionBindings} selectionCount={numSelected} />
                </TableCell>
              ) : null}
              {numSelected <= 0 &&
                headCells.map((headCell) => (
                  <HeadCell
                    headCell={headCell}
                    key={headCell.id}
                    sortOrder={sortOrder}
                    sortField={sortField}
                    setSortOrder={setSortOrder}
                    setSortField={setSortField}
                  />
                ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {showSpecimensList
              ? specimensList?.specimens?.map((row: IAllTestsSpecimensListItem, index: number) => {
                  const filteredSpecimenActions = findCurrentAction(actionVariations, row);
                  const isItemSelected = isSelected(row.id);
                  const isContextMenuAvailable = filteredSpecimenActions && numSelected < 2;
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <AllTestsRow
                      row={row}
                      key={row.id}
                      index={index}
                      actions={isContextMenuAvailable ? filteredSpecimenActions.actions : []}
                      isItemSelected={isItemSelected}
                      onClick={(e: React.ChangeEvent<HTMLInputElement>) =>
                        onCheckboxClick(e, row, selectedRows, setSelectedRows)
                      }
                      labelId={labelId}
                    />
                  );
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      {isLoading && <CircularLoading />}
      {showEmptyState ? <NoResultsFound label={inHouseSpecimensListEmptyMessage} /> : null}
      <TablePagination
        labelRowsPerPage={`${t(Translation.COMMON_PAGINATION_ROWS_COUNT)} :`}
        component="div"
        count={specimensList.totalItems}
        rowsPerPage={specimensList.pageSize}
        page={specimensList.currentPage > 1 ? specimensList.currentPage - 1 : 0}
        onPageChange={handleChangePage}
      />
    </>
  );
};

export default AllTestsList;
