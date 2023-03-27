import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { Translation } from 'constants/translations';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';
import { IEncounterList } from 'types/reduxTypes/patient-emrStateTypes';

import CircularLoading from '@ui-component/circular-loading';
import { DateUtil } from '@utils/date/DateUtil';

import EncounterNotesHeader from './EncounterNotesHeader';
import EncounterNoteThumbnail from './EncounterNoteThumbnail';
import EncountersEmptyState from './EncountersEmptyState';

const Encounters = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { t } = useTranslation();
  const isEncountersListLoading = useAppSelector(patientsSelector.isEncountersListLoading);
  const encountersList: IEncounterList = useAppSelector(patientsSelector.encountersList);

  const encounters = useMemo(() => [...encountersList.encounters], [encountersList.encounters]).sort(
    (firstEncounter, secondEncounter) =>
      new Date(secondEncounter.createdOn).getTime() - new Date(firstEncounter.createdOn).getTime()
  );

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
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
            {!!encounters.length && !isEncountersListLoading && (
              <>
                {encounters.map((encounter, index) => (
                  <EncounterNoteThumbnail
                    key={encounter.id}
                    id={encounter.id}
                    author={encounter.author}
                    title={encounter.title}
                    index={index}
                    contentPreview={encounter.contentPreview}
                    createdOn={encounter.createdOn ? DateUtil.formatDateOnly(encounter.createdOn) : ''}
                  />
                ))}
                <TablePagination
                  labelRowsPerPage={t(Translation.COMMON_PAGINATION_ROWS_COUNT)}
                  rowsPerPageOptions={[5, 25, 40, 100]}
                  component="div"
                  count={encountersList.totalItems}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {isEncountersListLoading ? <CircularLoading /> : <EncountersEmptyState />}
    </>
  );
};

export default Encounters;
