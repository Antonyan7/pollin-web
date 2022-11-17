import React, { SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { TestResultsListSortFields } from '@axios/results/resultsManagerTypes';
import { PendingTestResultHeadCell } from '@components/Results/PendingTestResultHeadCell';
import { headCellsData } from '@components/Results/PendingTestResultHeadCellMockData';
import PendingTestResultRow from '@components/Results/PendingTestResultRow';
import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow, useTheme } from '@mui/material';
import { resultsSelector } from '@redux/slices/results';
import { rowsPerPage } from 'helpers/constants';
import { useAppSelector } from 'redux/hooks';
import { IHeadCell, SortOrder } from 'types/patient';
import { IPatientContactInformationModalProps } from 'types/reduxTypes/resultsStateTypes';
import EnhancedTableToolbarExternalResults from 'ui-component/EnhancedTableToolbar/EnhacnedTableToolbarExternalResults';

interface TableProps {
  selected: string[];
  isSelected: (id: string) => boolean;
  numSelected: number;
  rowCount: number;
  onClick: (event: React.MouseEvent, id: string, status: string) => void;
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSortField: React.Dispatch<SetStateAction<TestResultsListSortFields | null>>;
  setSortOrder: React.Dispatch<SetStateAction<SortOrder | null>>;
  selectedStatuses: string[];
  sortOrder: SortOrder | null;
  sortField: TestResultsListSortFields | null;
}

const TableComponent = ({
  selected,
  selectedStatuses,
  isSelected,
  numSelected,
  rowCount,
  onClick,
  handleSelectAllClick,
  setSortField,
  setSortOrder,
  sortOrder,
  sortField
}: TableProps) => {
  const [t] = useTranslation();
  const theme = useTheme();
  const resultsList = useAppSelector(resultsSelector.resultsList);
  const headCells = headCellsData(t) as IHeadCell[];
  const specimenActions = useAppSelector(resultsSelector.specimenActions);

  return (
    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              sx={{ color: theme.palette.primary.main }}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowsPerPage}
              onChange={handleSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts'
              }}
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
          {headCells.map(
            (headCell) =>
              numSelected <= 0 && (
                <PendingTestResultHeadCell
                  headCell={headCell}
                  sortOrder={sortOrder}
                  sortField={sortField}
                  setSortOrder={setSortOrder}
                  setSortField={setSortField}
                  key={headCell.id}
                />
              )
          )}
        </TableRow>
      </TableHead>

      <TableBody>
        {resultsList?.testResults?.map((row: IPatientContactInformationModalProps, index: number) => {
          const filteredSpecimenActions = specimenActions.find((item) => item.status === row.status);
          const isItemSelected = isSelected(row.id);
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <PendingTestResultRow
              row={row}
              key={row.id}
              actions={filteredSpecimenActions ? filteredSpecimenActions.actions : []}
              isItemSelected={isItemSelected}
              onClick={(e) => onClick(e, row.id, row.status)}
              labelId={labelId}
            />
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TableComponent;
