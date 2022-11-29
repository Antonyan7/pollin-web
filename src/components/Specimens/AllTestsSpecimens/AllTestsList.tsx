import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IAllTestsSpecimensReqBody, SpecimensListSortFields } from '@axios/results/resultsManagerTypes';
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
import { margins } from 'themes/themeConstants';
import { IHeadCell, SortOrder } from 'types/patient';
import { IAllTestsSpecimensListItem } from 'types/reduxTypes/resultsStateTypes';

import { AllTestsHeadCell } from './AllTestsHeadCell';
import { headCellsData } from './AllTestsHeadCellMockData';
import { AllTestsRow } from './AllTestsRow';

const AllTestsList = () => {
  const [page, setPage] = useState<number>(0);
  const [sortField, setSortField] = useState<SpecimensListSortFields | null>(SpecimensListSortFields.COLLECTION_AGE);
  const [sortOrder, setSortOrder] = useState<SortOrder | null>(SortOrder.Desc);
  const allTestsSpecimensList = useAppSelector(resultsSelector.allTestsSpecimensList);
  const allTestsSpecimensListLoading = useAppSelector(resultsSelector.isAllTestsSpecimensListLoading);
  const theme = useTheme();
  const [t] = useTranslation();
  const headCells = headCellsData(t) as IHeadCell[];

  useEffect(() => {
    const data: IAllTestsSpecimensReqBody = {
      ...(sortField ? { sortByField: sortField } : {}),
      ...(sortOrder ? { sortOrder } : {}),
      page: page + 1
    };

    dispatch(resultsMiddleware.getALLTestsSpecimensList(data));
  }, [page, sortField, sortOrder]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox sx={{ color: theme.palette.primary.main }} />
              </TableCell>

              {headCells.map((headCell) => (
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
            {allTestsSpecimensList?.specimens?.map((row: IAllTestsSpecimensListItem) => (
              <AllTestsRow row={row} key={row.id} />
            ))}
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
