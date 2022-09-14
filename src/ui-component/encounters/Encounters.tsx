import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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

import EncounterNotes from '@ui-component/encounters/EncounterNotes';
import EncounterNotesHeader from '@ui-component/encounters/EncounterNotesHeader';
import EncounterNoteThumbnail from '@ui-component/encounters/EncounterNoteThumbnail';
import NothingFoundEncounters from '@ui-component/encounters/NothingFoundEncounters';

import { Translation } from '../../constants/translations';

const Encounters = () => {
  const [isLoading] = useState<boolean>(true);
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(25);
  const { t } = useTranslation();

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    if (event?.target.value) {
      setRowsPerPage(parseInt(event?.target.value, 10));
    }

    setPage(0);
  };

  return (
    <>
      <TableContainer sx={{ overflow: 'hidden' }}>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              <EncounterNotesHeader />
            </TableRow>
          </TableHead>
          <TableBody>
            <EncounterNoteThumbnail />
          </TableBody>
          <EncounterNotes />
          <NothingFoundEncounters />
        </Table>
      </TableContainer>
      <Box sx={{ marginTop: '50px', display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
        {isLoading && <CircularProgress />}
      </Box>
      <TablePagination
        labelRowsPerPage={<>{t(Translation.COMMON_PAGINATION_ROWS_COUNT)}</>}
        rowsPerPageOptions={[25, 40, 100]}
        component="div"
        count={10} // should be the length of the real encounters' array
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default Encounters;
