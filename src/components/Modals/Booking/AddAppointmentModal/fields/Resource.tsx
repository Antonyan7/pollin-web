import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, Grid } from '@mui/material';
import { Translation } from 'constants/translations';

import SharedResourceField from '@ui-component/shared/Fields/SharedResourceField';

const ResourceField = () => {
  const [t] = useTranslation();
  const fieldName = 'providerId';
  const fieldLabel = t(Translation.PAGE_APPOINTMENTS_SELECT_RESOURCE);

  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <SharedResourceField fieldName={fieldName} fieldLabel={fieldLabel} />
      </FormControl>
    </Grid>
  );
};

export default ResourceField;
