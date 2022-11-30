import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ISpecimensListReqBody, SpecimensListSortFields } from '@axios/results/resultsManagerTypes';
import { PatientListStyled } from '@components/Patients/PatientListStyled';
import { SeveritiesType } from '@components/Scheduling/types';
import SearchBox from '@components/SearchBox';
import {
  Box,
  Checkbox,
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
import { margins } from 'themes/themeConstants';
import { IHeadCell, SortOrder } from 'types/patient';
import { ISpecimensListItem, ISpecimensListItemShort } from 'types/reduxTypes/resultsStateTypes';
import { ISpecimensFilterOptions } from 'types/results';

import EnhancedTableToolbarExternalResults from '@ui-component/EnhancedTableToolbar/EnhancedTableToolbarExternalResults';
import SpecimensStatsView from '@ui-component/profile/SpecimensStatsView';

import AutocompleteWrapper from './AutocompleteWrapper';
import { InHouseSpecimensHeadCell } from './InHouseSpecimensHeadCell';
import { headCellsData } from './InHouseSpecimensHeadCellMockData';
import { InHouseSpecimensRow } from './InHouseSpecimensRow';

const generateDescription = (headerText: string, notFoundSpecimens: ISpecimensListItemShort[] = []) => {
  const listElements = notFoundSpecimens.map((specimen) => `<li>${specimen.identifier}</li>`).join('');

  return `
    <div>
      <p>${headerText}</p>
      <ul>
        ${listElements}
      </ul>
    </div>
  `;
};

// eslint-disable-next-line max-lines-per-function
const InHouseSpecimensList = () => {
  const [page, setPage] = useState<number>(0);
  const [identifiers, setIdentifiers] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SpecimensListSortFields | null>(SpecimensListSortFields.COLLECTION_AGE);
  const [sortOrder, setSortOrder] = useState<SortOrder | null>(SortOrder.Desc);
  const [selectedFilters, setSelectedFilters] = useState<ISpecimensFilterOptions[]>([]);
  const [toastHasBeenShown, setToasHasBeenShown] = useState(false);
  const pendingSpecimenStats = useAppSelector(resultsSelector.pendingSpecimenStats);
  const specimensList = useAppSelector(resultsSelector.specimensList);
  const isSpecimensListLoading = useAppSelector(resultsSelector.isSpecimensListLoading);
  const filtersList = useAppSelector(resultsSelector.specimensFiltersList);
  const isFiltersLoading = useAppSelector(resultsSelector.isSpecimensFiltersLoading);
  const theme = useTheme();
  const [t] = useTranslation();
  const headCells = headCellsData(t) as IHeadCell[];

  const searchLabel = t(Translation.PAGE_IN_HOUSE_SPECIMENS_SEARCH_PLACEHOLDER);
  const filterLabel = t(Translation.PAGE_IN_HOUSE_SPECIMENS_FILTER_LABEL);

  useEffect(() => {
    dispatch(resultsMiddleware.getPendingSpecimenStats());
    dispatch(resultsMiddleware.getSpecimensFilters());
    dispatch(resultsMiddleware.getSpecimenActions());
  }, []);

  useEffect(() => {
    const data: ISpecimensListReqBody = {
      ...(identifiers.length > 0 ? { specimens: identifiers.map((identifier) => ({ identifier })) } : {}),
      ...(selectedFilters.length > 0 ? { filters: selectedFilters.map(({ type, id }) => ({ type, id })) } : {}),
      ...(sortField ? { sortByField: sortField } : {}),
      ...(sortOrder ? { sortOrder } : {}),
      page: page + 1
    };

    dispatch(resultsMiddleware.getSpecimensList(data));
  }, [page, identifiers, selectedFilters, sortField, sortOrder]);

  useEffect(() => {
    setToasHasBeenShown(false);
  }, [identifiers]);

  useEffect(() => {
    const shouldShowToast = identifiers.length > 0 && !isSpecimensListLoading && page === 0 && !toastHasBeenShown;

    if (shouldShowToast) {
      setToasHasBeenShown(true);

      if (specimensList.notFound?.length > 0) {
        dispatch(
          viewsMiddleware.setToastNotificationPopUpState({
            open: true,
            props: {
              severityType: SeveritiesType.error,
              description: generateDescription(
                t(Translation.PAGE_IN_HOUSE_SPECIMENS_SEARCH_FAIL),
                specimensList.notFound
              )
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
  }, [page, specimensList.notFound, isSpecimensListLoading, toastHasBeenShown]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const searchByIdsHandler = useCallback((idArr: string[]) => {
    setPage(0);
    setIdentifiers(idArr);
  }, []);

  const filterChangeHandler = useCallback((curFilters: ISpecimensFilterOptions[]) => {
    setPage(0);
    setSelectedFilters(curFilters);
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <SearchBox onSearch={searchByIdsHandler} placeholder={searchLabel} />
        </Grid>
        <Grid item xs={12} md={6}>
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
              {numSelected <= 0 &&
                headCells.map((headCell) => (
                  <InHouseSpecimensHeadCell
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
