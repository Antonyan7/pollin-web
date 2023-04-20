import React from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox, TableCell, TableRow, useTheme } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { resultsSelector } from '@redux/slices/results';
import { CypressIds } from 'constants/cypressIds';
import { getRowLabel } from 'helpers/getPatientRowLabel';
import { ContextMenuAction, ISpecimensInTransportListItem } from 'types/reduxTypes/resultsStateTypes';

import useSpecimenActions from '@hooks/contextMenu/useSpecimenActions';
import { ContextMenu } from '@ui-component/contextMenu';
import Chip from '@ui-component/patient/Chip';
import { getStatusTitle } from '@utils/mappings';

interface SpecimensInTransportListRowProps {
  index: number;
  row: ISpecimensInTransportListItem;
  actions: ContextMenuAction[];
  isItemSelected: boolean;
  labelId: string;
  onClick: (event: React.ChangeEvent<HTMLInputElement>, name: string) => void;
}

export const SpecimensInTransportListRow = ({
  index,
  row,
  actions,
  isItemSelected,
  labelId,
  onClick
}: SpecimensInTransportListRowProps) => {
  const [t] = useTranslation();
  const theme = useTheme();
  const actionVariations = useAppSelector(resultsSelector.specimenActions);

  const statusTitle = getStatusTitle(actionVariations, row.status);

  const actionBindings = useSpecimenActions([row], actions);

  return (
    <TableRow role="checkbox" hover>
      <TableCell padding="checkbox">
        <Checkbox
          sx={{ color: theme.palette.primary.main }}
          checked={isItemSelected}
          inputProps={{
            'aria-labelledby': labelId
          }}
          data-cy={`${CypressIds.COMMON_TABLE_CHECKBOX}-${index}`}
          onChange={(event) => {
            event.stopPropagation();
            onClick(event, row.id);
          }}
          key={row.id}
        />
      </TableCell>
      <TableCell>{row.identifier}</TableCell>
      <TableCell>{row.patientName}</TableCell>
      <TableCell>
        <Chip label={`${row.age} ${getRowLabel(row.age, t)}`} size="small" chipColor="notActive" />
      </TableCell>
      <TableCell>{statusTitle}</TableCell>
      <TableCell align="left" onClick={(e) => e.stopPropagation()}>
        <ContextMenu actionBindings={actionBindings} />
      </TableCell>
    </TableRow>
  );
};
