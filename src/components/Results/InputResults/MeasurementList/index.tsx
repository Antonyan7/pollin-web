import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { useTranslation } from 'react-i18next';
import { IMeasurementsControl, IMeasurementsFieldValues } from '@components/Results/InputResults/types';
import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';
import { ITestResultItem } from 'types/reduxTypes/resultsStateTypes';

import DateReceivedField from './fields/DateReceivedField';
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
  listItems?: ITestResultItem[];
}

const MeasurementList: React.FC<MeasurementListProps> = ({ listItems }) => {
  const [t] = useTranslation();

  const { register, control }: { register: UseFormRegister<IMeasurementsFieldValues>; control: IMeasurementsControl } =
    useFormContext();

  const { fields } = useFieldArray({
    control,
    name: 'data'
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
            {MEASUREMENT_LIST_TABLE_HEADERS.map((header) => (
              <TableCell sx={{ border: 0 }} key={header.key} width={header.width}>
                <Typography fontWeight={600} component="h4">
                  {t(header.key)}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>
              <Typography fontWeight={600} variant="h5" component="h5">
                {t(Translation.PAGE_INPUT_RESULTS_TEST_MEASUREMENT_LIST_TITLE)}
              </Typography>
            </StyledTableCell>
          </StyledTableRow>
          {fields.map((item, index) => (
            <TableRow key={item.id}>
              <StyledTableCell>{listItems?.[index].type}</StyledTableCell>
              <StyledTableCell>{listItems?.[index].unit}</StyledTableCell>
              <StyledTableCell>
                <TextField
                  {...register(`data.${index}.result`)}
                  label={t(Translation.PAGE_INPUT_RESULTS_TEST_MEASUREMENT_LIST_FIELD_NAME_RESULT)}
                />
              </StyledTableCell>
              <StyledTableCell>
                <DateReceivedField name={`data.${index}.dateReceived`} control={control} />
              </StyledTableCell>
              <StyledTableCell>
                <ResultTypeField name={`data.${index}.resultType`} control={control} />
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MeasurementList;
