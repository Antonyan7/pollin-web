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

const StyledTableRow = styled(TableRow)(() => ({
  border: 'none'
}));

export interface MeasurementListProps {
  listItems: ITestResultItem[];
  currentFormFieldName: string;
  title: string;
}

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
                <Typography fontWeight={600} component="h4">
                  {t(key)}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>
              <Typography variant="h5" component="h5">
                {t(title)}
              </Typography>
            </StyledTableCell>
          </StyledTableRow>
          {fields?.map((field, fieldIndex) => {
            const showResultOptionsDropdown = !!(
              listItems[fieldIndex].possibleResultOptions && listItems[fieldIndex].possibleResultOptions?.length
            );

            return (
              <TableRow key={field.id}>
                <StyledTableCell>{listItems[fieldIndex].type}</StyledTableCell>
                <StyledTableCell>{listItems[fieldIndex].unit}</StyledTableCell>
                <StyledTableCell>
                  <PossibleResultOptionsField
                    showResultOptionsDropdown={showResultOptionsDropdown}
                    name={`${currentFormFieldDataItems}.${fieldIndex}.result`}
                    control={control}
                    resultOptions={listItems[fieldIndex].possibleResultOptions as IPossibleResultOptions[]}
                    register={register}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <DateReceivedField
                    name={`${currentFormFieldDataItems}.${fieldIndex}.dateReceived`}
                    control={control}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <ResultTypeField name={`${currentFormFieldDataItems}.${fieldIndex}.resultType`} control={control} />
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
