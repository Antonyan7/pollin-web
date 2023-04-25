import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { margins } from 'themes/themeConstants';
import { IPossibleResultOptions, ITestResultItem } from 'types/reduxTypes/resultsStateTypes';

import DateReceivedField from './fields/DateReceivedField';
import PossibleResultOptionsField from './fields/PossibleResultOptionsField';
import ResultTypeField from './fields/ResultTypeField';
import MEASUREMENT_LIST_TABLE_HEADERS from './data';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.secondary[800],
  border: 'none'
}));

export interface MeasurementListProps {
  listItems: ITestResultItem[];
  currentFormFieldName: string;
  title: string;
}

const StyledTableRow = styled(TableRow)(() => ({
  border: 'none'
}));

const MeasurementList: React.FC<MeasurementListProps> = ({ listItems, currentFormFieldName, title }) => {
  const [t] = useTranslation();

  const { register, control } = useFormContext();

  const currentFormFieldDataItems = `${currentFormFieldName}.items`;

  const { fields } = useFieldArray({
    control,
    name: currentFormFieldDataItems
  });

  return (
    <TableContainer component={Paper} sx={{ overflow: 'hidden' }}>
      <Table
        sx={{
          mx: margins.leftRight16
        }}
      >
        <TableHead>
          <TableRow>
            {MEASUREMENT_LIST_TABLE_HEADERS.map(({ width, key }) => (
              <TableCell sx={{ border: 0 }} key={key} width={width}>
                <Typography fontWeight={500} component="h4">
                  {t(key)}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {fields?.length > 1 ? (
            <StyledTableRow>
              <StyledTableCell>
                <Typography variant="h5" component="h5" fontWeight={500}>
                  {t(title)}
                </Typography>
              </StyledTableCell>
            </StyledTableRow>
          ) : null}
          {fields?.map((field, fieldIndex: number) => {
            const showResultOptionsDropdown = !!(
              listItems[fieldIndex].possibleResultOptions && listItems[fieldIndex].possibleResultOptions?.length
            );

            return (
              <TableRow key={field.id}>
                <StyledTableCell>
                  <Typography
                    variant="h5"
                    component="h5"
                    fontWeight={500}
                    sx={{
                      color: (theme) => theme.palette.secondary[800]
                    }}
                  >
                    {listItems[fieldIndex].type}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>{listItems[fieldIndex].unit}</StyledTableCell>
                <StyledTableCell>
                  <PossibleResultOptionsField
                    showResultOptionsDropdown={showResultOptionsDropdown}
                    name={`${currentFormFieldDataItems}.${fieldIndex}.result`}
                    resultOptions={listItems[fieldIndex].possibleResultOptions as IPossibleResultOptions[]}
                    register={register}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <DateReceivedField name={`${currentFormFieldDataItems}.${fieldIndex}.dateReceived`} />
                </StyledTableCell>
                <StyledTableCell>
                  <ResultTypeField name={`${currentFormFieldDataItems}.${fieldIndex}.resultType`} />
                </StyledTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MeasurementList;
