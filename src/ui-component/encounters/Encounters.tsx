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

import EncounterNotesHeader from '@ui-component/encounters/EncounterNotesHeader';
import EncounterNoteThumbnail from '@ui-component/encounters/EncounterNoteThumbnail';
import NothingFoundEncounters from '@ui-component/encounters/NothingFoundEncounters';

import { Translation } from '../../constants/translations';
import { useAppSelector } from '../../redux/hooks';
import { patientsSelector } from '../../redux/slices/patients';
import { IEncounterList } from '../../types/reduxTypes/patient-emr';

const Encounters = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const { t } = useTranslation();
  const isEncountersListLoading = useAppSelector(patientsSelector.isEncountersListLoading);
  const encountersList: IEncounterList = useAppSelector(patientsSelector.encountersList);

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
              <EncounterNotesHeader page={page} />
            </TableRow>
          </TableHead>
          <TableBody>
            {isEncountersListLoading || encountersList.encounters.length ? (
              <>
                {encountersList.encounters.map((encounter) => (
                  <EncounterNoteThumbnail
                    id={encounter.id}
                    author={encounter.author}
                    title={encounter.title}
                    contentPreview={encounter.contentPreview}
                    date={encounter.date}
                  />
                ))}
                <TablePagination
                  labelRowsPerPage={<>{t(Translation.COMMON_PAGINATION_ROWS_COUNT)}</>}
                  rowsPerPageOptions={[25, 40, 100]}
                  component="div"
                  count={encountersList.encounters.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            ) : (
              <NothingFoundEncounters />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Keeping this block for addendums */}
      {/* <Box sx={{ marginTop: '50px', display: 'flex', justifyContent: 'center', textAlign: 'center' }}> */}
      {/*  {isLoading && <CircularProgress />} */}
      {/* </Box> */}
      {/* <EncounterNotes /> */}
      {isEncountersListLoading ? (
        <Box sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center', marginTop: '16px' }}>
          <CircularProgress sx={{ margin: 'auto' }} />
        </Box>
      ) : null}
    </>
  );
};

export default Encounters;
