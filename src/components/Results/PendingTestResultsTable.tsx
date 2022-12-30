import React, { SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { TestResultsListSortFields } from '@axios/results/resultsManagerTypes';
import { PendingTestResultHeadCell } from '@components/Results/PendingTestResultHeadCell';
import { headCellsData } from '@components/Results/PendingTestResultHeadCellMockData';
import PendingTestResultRow from '@components/Results/PendingTestResultRow';
import { Table, TableBody, TableHead, TableRow } from '@mui/material';
import { resultsSelector } from '@redux/slices/results';
import { useAppSelector } from 'redux/hooks';
import { IHeadCell, SortOrder } from 'types/patient';
import { IPatientContactInformationModalProps } from 'types/reduxTypes/resultsStateTypes';

interface TableProps {
  setSortField: React.Dispatch<SetStateAction<TestResultsListSortFields | null>>;
  setSortOrder: React.Dispatch<SetStateAction<SortOrder | null>>;
  sortOrder: SortOrder | null;
  sortField: TestResultsListSortFields | null;
}

const TableComponent = ({ setSortField, setSortOrder, sortOrder, sortField }: TableProps) => {
  const [t] = useTranslation();
  const resultsList = useAppSelector(resultsSelector.resultsList);
  const isResultsLoading = useAppSelector(resultsSelector.isResultsLoading);
  const headCells = headCellsData(t) as IHeadCell[];

  return (
    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <PendingTestResultHeadCell
              headCell={headCell}
              sortOrder={sortOrder}
              sortField={sortField}
              setSortOrder={setSortOrder}
              setSortField={setSortField}
              key={headCell.id}
            />
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {!isResultsLoading
          ? resultsList?.testResults?.map((row: IPatientContactInformationModalProps, index: number) => {
              const labelId = `external-test-results-table-checkbox-${index}`;

              return <PendingTestResultRow row={row} key={row.id} labelId={labelId} />;
            })
          : null}
      </TableBody>
    </Table>
  );
};

export default TableComponent;
