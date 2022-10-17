import React, { useEffect, useState } from 'react';
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
import { Translation } from 'constants/translations';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';
import { margins } from 'themes/themeConstants';
import { IEncounterList } from 'types/reduxTypes/patient-emr';

import EncounterNotesHeader from '@ui-component/encounters/EncounterNotesHeader';
import EncounterNoteThumbnail from '@ui-component/encounters/EncounterNoteThumbnail';
import NothingFoundEncounters from '@ui-component/encounters/NothingFoundEncounters';

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

  useEffect(() => {
    dispatch(patientsMiddleware.getEncountersTypes());
  }, []);

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
                    key={encounter.id}
                    id={encounter.id}
                    author={encounter.author}
                    title={encounter.title}
                    contentPreview={encounter.contentPreview}
                    date={new Date(encounter.date).toLocaleDateString('en-us', {
                      day: 'numeric',
                      year: 'numeric',
                      month: 'short'
                    })}
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
      {isEncountersListLoading ? (
        <Box sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center', marginTop: margins.top16 }}>
          <CircularProgress sx={{ margin: margins.auto }} />
        </Box>
      ) : null}
    </>
  );
};

export default Encounters;
