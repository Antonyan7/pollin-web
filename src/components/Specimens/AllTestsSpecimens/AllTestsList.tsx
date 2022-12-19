import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IAllTestsSpecimensReqBody, SpecimensListSortFields } from '@axios/results/resultsManagerTypes';
import { SeveritiesType } from '@components/Scheduling/types';
import SearchBox from '@components/SearchBox';
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
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { rowsPerPage } from 'helpers/constants';
import { handleSelectAllClick, onCheckboxClick } from 'helpers/handleCheckboxClick';
import { margins } from 'themes/themeConstants';
import { IHeadCell, SortOrder } from 'types/patient';
import { IAllTestsSpecimensListItem, ISpecimensListItemShort } from 'types/reduxTypes/resultsStateTypes';

import EnhancedTableToolbarExternalResults from '@ui-component/EnhancedTableToolbar/EnhancedTableToolbarExternalResults';

import { AllTestsHeadCell } from './AllTestsHeadCell';
import { headCellsData } from './AllTestsHeadCellMockData';
import { AllTestsRow } from './AllTestsRow';

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
const AllTestsList = () => {
  const [page, setPage] = useState<number>(0);
  const [identifiers, setIdentifiers] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SpecimensListSortFields | null>(SpecimensListSortFields.COLLECTION_AGE);
  const [sortOrder, setSortOrder] = useState<SortOrder | null>(SortOrder.Desc);
  const [toastHasBeenShown, setToastHasBeenShown] = useState(false);
  const allTestsSpecimensList = useAppSelector(resultsSelector.allTestsSpecimensList);
  const allTestsSpecimensListLoading = useAppSelector(resultsSelector.isAllTestsSpecimensListLoading);
  const theme = useTheme();
  const [t] = useTranslation();
  const headCells = headCellsData(t) as IHeadCell[];

  useEffect(() => {
    const data: IAllTestsSpecimensReqBody = {
      ...(identifiers.length > 0 ? { specimens: identifiers.map((identifier) => ({ identifier })) } : {}),
      ...(sortField ? { sortByField: sortField } : {}),
      ...(sortOrder ? { sortOrder } : {}),
      page: page + 1
    };

    dispatch(resultsMiddleware.getALLTestsSpecimensList(data));
  }, [page, identifiers, sortField, sortOrder]);

  useEffect(() => {
    setToastHasBeenShown(false);
  }, [identifiers]);

  useEffect(() => {
    const shouldShowToast = identifiers.length > 0 && !allTestsSpecimensListLoading && !toastHasBeenShown;

    if (shouldShowToast) {
      setToastHasBeenShown(true);

      if (allTestsSpecimensList.notFound?.length > 0) {
        dispatch(
          viewsMiddleware.setToastNotificationPopUpState({
            open: true,
            props: {
              severityType: SeveritiesType.error,
              description: generateDescription(
                t(Translation.PAGE_IN_HOUSE_SPECIMENS_SEARCH_FAIL),
                allTestsSpecimensList.notFound
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
  }, [allTestsSpecimensList.notFound, allTestsSpecimensListLoading, toastHasBeenShown]);

  useEffect(() => {
    dispatch(resultsMiddleware.getSpecimenActions());
  }, []);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const specimenActions = useAppSelector(resultsSelector.specimenActions);
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const numSelected = selected.length;
  const rowCount = allTestsSpecimensList?.specimens.length;
  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const searchByIdsHandler = useCallback((idArr: string[]) => {
    setPage(0);
    setIdentifiers(idArr);
  }, []);

  const inHouseSpecimensSearchPlaceholder = t(Translation.PAGE_IN_HOUSE_SPECIMENS_SEARCH_PLACEHOLDER);

  return (
    <>
      <SearchBox onSearch={searchByIdsHandler} placeholder={inHouseSpecimensSearchPlaceholder} />
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  sx={{ color: theme.palette.primary.main }}
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowsPerPage}
                  onChange={(e) =>
                    handleSelectAllClick(e, allTestsSpecimensList.specimens, setSelected, setSelectedStatuses)
                  }
                />
              </TableCell>

              {numSelected > 0 ? (
                <TableCell padding="none" colSpan={6}>
                  <EnhancedTableToolbarExternalResults
                    numSelected={numSelected}
                    specimenActions={specimenActions}
                    selectedStatuses={selectedStatuses}
                    selected={selected}
                  />
                </TableCell>
              ) : null}
              {numSelected <= 0 &&
                headCells.map((headCell) => (
                  <AllTestsHeadCell
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
            <TableBody />
            {allTestsSpecimensList?.specimens?.map((row: IAllTestsSpecimensListItem, index: number) => {
              const filteredSpecimenActions = specimenActions.find((item) => item.status === row.status);
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <AllTestsRow
                  row={row}
                  key={row.id}
                  actions={filteredSpecimenActions ? filteredSpecimenActions.actions : []}
                  isItemSelected={isItemSelected}
                  onClick={(e) => onCheckboxClick(e, row.id, row.status, selected, setSelected, setSelectedStatuses)}
                  labelId={labelId}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {allTestsSpecimensListLoading ? (
        <Box sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center', marginTop: margins.top16 }}>
          <CircularProgress sx={{ margin: margins.auto }} />
        </Box>
      ) : null}
      <TablePagination
        component="div"
        count={allTestsSpecimensList.totalItems}
        rowsPerPage={allTestsSpecimensList.pageSize}
        page={allTestsSpecimensList.currentPage - 1}
        onPageChange={handleChangePage}
      />
    </>
  );
};

export default AllTestsList;
