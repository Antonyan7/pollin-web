import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ISpecimensListReqBody, SpecimensListSortFields } from '@axios/results/resultsManagerTypes';
import { PatientListStyled } from '@components/Patients/PatientListStyled';
import { SeveritiesType } from '@components/Scheduling/types';
import SearchBox from '@components/SearchBox';
import { HeadCell } from '@components/Table/HeadCell';
import NoResultsFound from '@components/Table/NoResultsFound';
import {
  Box,
  CircularProgress,
  Grid,
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
import { Translation } from 'constants/translations';
import { rowsPerPage } from 'helpers/constants';
import findCurrentAction from 'helpers/findCurrentAction';
import { handleSelectAllClick, onCheckboxClick } from 'helpers/handleCheckboxClick';
import { useRouter } from 'next/router';
import { margins } from 'themes/themeConstants';
import { IHeadCell, SortOrder } from 'types/patient';
import { ISpecimensListItem } from 'types/reduxTypes/resultsStateTypes';
import { ISpecimensFilterOptions } from 'types/results';

import { CheckedIcon } from '@assets/icons/CheckedIcon';
import ResultsTableRowToolbar from '@ui-component/EnhancedTableToolbar/ResultsTableRowToolbar';
import CustomCheckbox from '@ui-component/orders/OrderGroupCheckbox';
import SpecimensStatsView from '@ui-component/profile/SpecimensStatsView';

import { findFilterById } from '../../helpers/inHouse';

import AutocompleteWrapper from './AutocompleteWrapper';
import { headCellsData } from './InHouseSpecimensHeadCellMockData';
import { InHouseSpecimensRow } from './InHouseSpecimensRow';
// TODO: Refactor this file after demo reduce complexity + follow 150 lines rule - fhhealth.atlassian.net/browse/PCP-2227

// eslint-disable-next-line max-lines-per-function
const InHouseSpecimensList = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(0);
  const [identifiers, setIdentifiers] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SpecimensListSortFields | null>(SpecimensListSortFields.COLLECTION_AGE);
  const [sortOrder, setSortOrder] = useState<SortOrder | null>(SortOrder.Desc);
  const [selectedFilters, setSelectedFilters] = useState<ISpecimensFilterOptions[]>([]);
  const [toastHasBeenShown, setToastHasBeenShown] = useState(false);
  const pendingSpecimenStats = useAppSelector(resultsSelector.pendingSpecimenStats);
  const specimensList = useAppSelector(resultsSelector.specimensList);
  const isSpecimensListLoading = useAppSelector(resultsSelector.isSpecimensListLoading);
  const filtersList = useAppSelector(resultsSelector.specimensFiltersList);
  const isFiltersLoading = useAppSelector(resultsSelector.isSpecimensFiltersLoading);
  const isSpecimensConfirmationButtonClicked = useAppSelector(resultsSelector.isSpecimensConfirmationButtonClicked);
  const theme = useTheme();
  const [t] = useTranslation();
  const headCells = headCellsData(t) as IHeadCell[];

  const searchLabel = t(Translation.PAGE_IN_HOUSE_SPECIMENS_SEARCH_PLACEHOLDER);
  const filterLabel = t(Translation.PAGE_IN_HOUSE_SPECIMENS_FILTER_LABEL);
  const invalidSearchedItems = specimensList.notFound.map((notFoundItem) => notFoundItem.identifier);

  useEffect(() => {
    dispatch(resultsMiddleware.getPendingSpecimenStats());
    dispatch(resultsMiddleware.getSpecimensFilters());
    dispatch(resultsMiddleware.getSpecimenActions());
  }, []);

  useEffect(() => {
    const data: ISpecimensListReqBody = {
      ...(identifiers.length > 0 ? { specimens: identifiers.map((identifier) => ({ identifier })) } : {}),
      ...(selectedFilters.length ? { filters: selectedFilters.map(({ type, id }) => ({ type, id })) } : {}),
      ...(sortField ? { sortByField: sortField } : {}),
      ...(sortOrder ? { sortOrder } : {}),
      page: page + 1
    };

    dispatch(resultsMiddleware.getSpecimensList(data));
  }, [page, identifiers, selectedFilters, sortField, sortOrder, isSpecimensConfirmationButtonClicked]);

  useEffect(() => {
    const { selectedFilter, selectedPage, selectedSortField, selectedSortOrder, selectedSpecimens } = router.query;

    let specimens = selectedSpecimens && selectedSpecimens.length ? selectedSpecimens : ([] as string | string[]);

    specimens = !Array.isArray(specimens) ? [specimens] : (specimens as string[]);

    if (filtersList.length) {
      setPage(selectedPage ? Number(selectedPage) - 1 : 0);
      setSortField(
        selectedSortField ? (selectedSortField as SpecimensListSortFields) : SpecimensListSortFields.COLLECTION_AGE
      );
      setSortOrder(selectedSortOrder ? (selectedSortOrder as SortOrder) : SortOrder.Desc);
      setIdentifiers(specimens?.length ? (specimens as string[]).map((specimen) => specimen) : []);
      setSelectedFilters(findFilterById(filtersList, selectedFilter));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersList]);

  useEffect(() => {
    setToastHasBeenShown(false);
  }, [identifiers]);

  useEffect(() => {
    const shouldShowToast = identifiers.length > 0 && !isSpecimensListLoading && !toastHasBeenShown;

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
                items: invalidSearchedItems
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
  }, [specimensList.notFound, isSpecimensListLoading, toastHasBeenShown]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    const url = {
      pathname: router.pathname,
      query: { ...router.query, selectedPage: newPage + 1 }
    };

    router.push(url, undefined, { shallow: true });
    setPage(newPage);
  };

  const searchByIdsHandler = useCallback((idArr: string[]) => {
    setPage(0);
    setIdentifiers(idArr);

    const url = {
      pathname: router.pathname,
      query: { ...router.query, selectedSpecimens: idArr, selectedPage: 1 }
    };

    router.push(url, undefined, { shallow: true });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterChangeHandler = useCallback((curFilters: ISpecimensFilterOptions[]) => {
    const filters = curFilters?.map(({ id }) => id);

    setPage(0);
    setSelectedFilters(curFilters);

    const url = {
      pathname: router.pathname,
      query: { ...router.query, selectedFilter: filters, selectedPage: 1 }
    };

    router.push(url, undefined, { shallow: true });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const specimenActions = useAppSelector(resultsSelector.specimenActions);

  const [selected, setSelected] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const isSelected = (id: string) => selected.indexOf(id) !== -1;
  const numSelected = selected.length;
  const rowsCount = specimensList?.specimens.length;
  const isAllSelected = rowsCount > rowsPerPage ? rowsPerPage : rowsCount;
  const isAllSpecimensSelected = rowsCount > 0 && !!numSelected && !!isAllSelected;
  const areAvailableSpecimens = rowsCount > 0;
  const isResultsNotFound = !areAvailableSpecimens && !isSpecimensListLoading;

  return (
    <PatientListStyled>
      <Box sx={{ marginBottom: margins.bottom32 }}>
        <SpecimensStatsView stats={pendingSpecimenStats} />
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <SearchBox
            onSearch={searchByIdsHandler}
            placeholder={searchLabel}
            invalidSearchedItems={invalidSearchedItems}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <AutocompleteWrapper
            onChange={filterChangeHandler}
            label={filterLabel}
            filtersList={filtersList}
            loading={isFiltersLoading}
          />
        </Grid>
      </Grid>

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
                  onChange={(e) => handleSelectAllClick(e, specimensList.specimens, setSelected, setSelectedStatuses)}
                />
              </TableCell>
              {numSelected > 0 && (
                <TableCell padding="none" colSpan={6}>
                  <ResultsTableRowToolbar
                    numSelected={numSelected}
                    specimenActions={specimenActions}
                    selectedStatuses={selectedStatuses}
                    selected={selected}
                  />
                </TableCell>
              )}
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
              <TableCell />
            </TableRow>
          </TableHead>
          {!isSpecimensListLoading && (
            <TableBody>
              {specimensList?.specimens?.map((row: ISpecimensListItem) => {
                const filteredSpecimenAction = findCurrentAction(specimenActions, row);
                const isItemSelected = isSelected(row.id);

                return (
                  <InHouseSpecimensRow
                    row={row}
                    key={row.id}
                    actions={filteredSpecimenAction ? filteredSpecimenAction.actions : []}
                    isItemSelected={isItemSelected}
                    onClick={(e) => onCheckboxClick(e, row.id, row.status, selected, setSelected, setSelectedStatuses)}
                  />
                );
              })}
            </TableBody>
          )}
        </Table>
        {isSpecimensListLoading && (
          <Box sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center', marginTop: margins.top16 }}>
            <CircularProgress sx={{ margin: margins.auto }} />
          </Box>
        )}
      </TableContainer>
      {isResultsNotFound && <NoResultsFound />}
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
