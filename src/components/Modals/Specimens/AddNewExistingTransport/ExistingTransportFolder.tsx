import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TransportsSortFields } from '@axios/results/resultsManagerTypes';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  DialogActions,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  SelectChangeEvent,
  Stack,
  Theme
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import defineSpecimenId from 'helpers/defineSpecimenId';
import { useRouter } from 'next/router';
import { margins } from 'themes/themeConstants';
import { ModalName } from 'types/modals';
import { SortOrder } from 'types/patient';
import { IAddNewExistingTransportModalProps, ITransportListFolderProps } from 'types/reduxTypes/resultsStateTypes';
import { TransportFolderStatus } from 'types/results';

import { BaseSelectWithLoading } from '@ui-component/BaseDropdownWithLoading';
import { ButtonWithLoading } from '@ui-component/common/buttons';
import PollinDatePickerWithTodayButton from '@ui-component/shared/DatePicker/PollinDatePickerWithTodayButton';
import { DateUtil } from '@utils/date/DateUtil';

const useStyles = makeStyles((theme: Theme) => ({
  menuPaper: {
    maxHeight: 200
  },
  select: {
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main
    }
  }
}));

const ExistingTransportFolder = (props: IAddNewExistingTransportModalProps) => {
  const { specimenIds, selectedIdentifiers, modalName } = props;
  const classes = useStyles();
  const transportList = useAppSelector(resultsSelector.transportList);
  const { folders: transportFolders } = transportList;
  const { query } = useRouter();
  const currentTransportFolderId = query?.id ?? '';
  const onlyReadyForTransitFolders = transportFolders.filter(
    (transportFolder) =>
      transportFolder.status === TransportFolderStatus.ReadyForTransport &&
      currentTransportFolderId !== transportFolder.id
  );
  const isTransportListLoading = useAppSelector(resultsSelector.isTransportListLoading);
  const isSpecimenAddedToFolder = useAppSelector(resultsSelector.isSpecimenAddedToFolder);
  const [calendarDate, setCalendarDate] = useState<Date | null>(DateUtil.representInClinicDate());
  const [t] = useTranslation();
  const [transportFolder, setTransportFolder] = useState<string>('');
  const confirmButtonLabel = t(Translation.MODAL_EXTERNAL_RESULTS_PATIENT_CONTACT_INFORMATION_CONFIRMATION_BUTTON);
  const selectDropdownLabel = t(
    Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_ADD_NEW_EXISTING_TRANSPORT_FOLDER_MODAL_TRANSPORT_FOLDER
  );

  const handleTransportFolderChange = (event: SelectChangeEvent) => {
    setTransportFolder(event.target.value as string);
  };

  const onConfirmAddToNewExistingTransport = () => {
    const specimenIdArray = defineSpecimenId(specimenIds);
    const specimens = specimenIdArray.map((specimenId: string) => ({
      id: specimenId
    }));

    dispatch(
      resultsMiddleware.addSpecimenToTransportFolder(specimens, transportFolder, modalName, selectedIdentifiers)
    );
  };

  useEffect(() => {
    const body = {
      date: calendarDate as Date,
      page: 1,
      sortByField: TransportsSortFields.STATUS,
      sortOrder: SortOrder.Asc
    };

    dispatch(resultsMiddleware.getTransportList(body));
  }, [calendarDate]);

  const isMoveToAnother = modalName === ModalName.MoveToAnotherTransport;

  const isTransportFoldersEmpty = onlyReadyForTransitFolders?.length === 0;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            {!isMoveToAnother && (
              <PollinDatePickerWithTodayButton
                disablePast
                calendarDate={calendarDate as Date}
                onChange={setCalendarDate}
                todayDataCy={CypressIds.MODAL_SPECIMEN_TRACKING_ADD_NEW_OR_EXISTING_TRANSPORT_TODAY_BUTTON}
                dateDataCy={CypressIds.MODAL_SPECIMEN_TRACKING_ADD_NEW_OR_EXISTING_TRANSPORT_DATE_PICKER}
              />
            )}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <BaseSelectWithLoading
                  isLoading={isTransportListLoading}
                  IconComponent={KeyboardArrowDownIcon}
                  className={classes.select}
                  labelId="add-transport-folder-label"
                  id="add-transport-folder"
                  value={transportFolder}
                  label={selectDropdownLabel}
                  MenuProps={{ classes: { paper: classes?.menuPaper } }}
                  onChange={handleTransportFolderChange}
                  {...(isTransportFoldersEmpty && {
                    disabled: true,
                    label: t(Translation.PAGE_SPECIMENS_TRACKING_NO_TRANSPORT_FOLDERS)
                  })}
                  data-cy={CypressIds.MODAL_SPECIMEN_TRACKING_ADD_NEW_OR_EXISTING_TRANSPORT_DESTINATION_FIELD}
                >
                  {onlyReadyForTransitFolders.map((transport: ITransportListFolderProps) => (
                    <MenuItem value={transport.id} key={transport.id}>
                      {transport.fullTitle}
                    </MenuItem>
                  ))}
                </BaseSelectWithLoading>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {!isMoveToAnother && <Divider sx={{ marginBottom: margins.bottom16 }} />}
        <DialogActions sx={{ marginTop: margins.top4 }}>
          <Grid container justifyContent="flex-end" alignItems="center">
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
                <ButtonWithLoading
                  disabled={!(calendarDate && transportFolder)}
                  sx={{
                    '&.MuiButton-root.MuiLoadingButton-root': {
                      backgroundColor: (theme) => theme.palette.primary.main
                    },
                    '&.MuiButton-root.MuiLoadingButton-root.Mui-disabled': {
                      backgroundColor: (theme) => theme.palette.primary.light
                    }
                  }}
                  isLoading={isSpecimenAddedToFolder}
                  variant="contained"
                  onClick={onConfirmAddToNewExistingTransport}
                  dataCy={CypressIds.MODAL_SPECIMEN_TRACKING_ADD_NEW_OR_EXISTING_TRANSPORT_CONFIRM_BUTTON}
                >
                  {confirmButtonLabel}
                </ButtonWithLoading>
              </Stack>
            </Grid>
          </Grid>
        </DialogActions>
      </Grid>
    </Grid>
  );
};

export default ExistingTransportFolder;
