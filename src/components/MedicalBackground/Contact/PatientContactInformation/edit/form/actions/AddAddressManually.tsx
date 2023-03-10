import React from 'react';
import { useTranslation } from 'react-i18next';
import { ConsultationFormSubTitle } from '@components/MedicalBackground/components/common';
import { ManuallyAddressModalMode } from '@components/Modals/MedicalBackground/AddAddressManually/helpers';
import AddIcon from '@mui/icons-material/Add';
import { Button, Grid, useTheme } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

interface AddAddressManuallyProps {
  actionType: ManuallyAddressModalMode;
}

const AddAddressManually = ({ actionType }: AddAddressManuallyProps) => {
  const theme = useTheme();
  const [t] = useTranslation();

  const openAddressModal = () => {
    dispatch(viewsMiddleware.openModal({ name: ModalName.AddAddressManually, props: { mode: actionType } }));
  };

  return (
    <Grid item container alignItems="center" justifyContent="center">
      <Button onClick={openAddressModal}>
        <AddIcon sx={{ color: theme.palette.primary.main }} />
        <ConsultationFormSubTitle
          sx={{
            color: theme.palette.primary.main,
            marginLeft: margins.left8
          }}
        >
          {t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_INFORMATION_ADD_ADDRESS_MANUALLY)}
        </ConsultationFormSubTitle>
      </Button>
    </Grid>
  );
};

export default AddAddressManually;
