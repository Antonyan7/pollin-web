import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PatientListStyled } from '@components/Patients/PatientListStyled';
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { margins } from 'themes/themeConstants';
import { IHeadCell } from 'types/patient';
import { ISpecimensListItem } from 'types/reduxTypes/resultsStateTypes';

import SpecimensStatsView from '@ui-component/profile/SpecimensStatsView';

import { InHouseSpecimensHeadCell } from './InHouseSpecimensHeadCell';
import { headCellsData } from './InHouseSpecimensHeadCellMockData';
import { InHouseSpecimensRow } from './InHouseSpecimensRow';

const InHouseSpecimensList = () => {
  const [page, setPage] = React.useState<number>(0);
  const pendingSpecimenStats = useAppSelector(resultsSelector.pendingSpecimenStats);
  const specimensList = useAppSelector(resultsSelector.specimensList);
  const isSpecimensListLoading = useAppSelector(resultsSelector.isSpecimensListLoading);

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

  return (
    <PatientListStyled>
      <Box sx={{ marginBottom: margins.bottom32 }}>
        <SpecimensStatsView stats={pendingSpecimenStats} />
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <InHouseSpecimensHeadCell headCell={headCell} />
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {specimensList?.specimens?.map((row: ISpecimensListItem) => (
              <InHouseSpecimensRow row={row} key={row.id} />
            ))}
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
