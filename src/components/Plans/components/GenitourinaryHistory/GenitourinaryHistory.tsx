import React from 'react';
import { useTranslation } from 'react-i18next';
import { ConsultationDivider, ConsultationFormTitle, ConsultationTitleWithIcon } from '@components/common';
import GenitourinaryHistoryRow from '@components/Plans/components/GenitourinaryHistory/GenitourinaryHistoryRow';
import { genitourinaryHistoryValues } from '@components/Plans/helpers';
import { InitialConsultationFormFields } from '@components/Plans/types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Grid } from '@mui/material';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const GenitourinaryHistoryHeader = () => {
  const [t] = useTranslation();

  return (
    <Grid item container>
      <ConsultationFormTitle>
        {t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_GENITOURINARY_HISTORY)}
      </ConsultationFormTitle>
    </Grid>
  );
};

const GenitourinaryHistory = () => (
  <Grid px={paddings.leftRight32} py={paddings.topBottom16} xs={12} gap={4} container item direction="column">
    <GenitourinaryHistoryHeader />
    {genitourinaryHistoryValues.map((historyRow) => {
      const showDisgnosedDropdown = historyRow.fieldName === InitialConsultationFormFields.DisgnosedConditions;

      return showDisgnosedDropdown ? (
        <Grid item container direction="row" alignItems="center" xs={12} key={historyRow.id}>
          <Grid item container xs={4} direction="row" alignItems="center" flexWrap="nowrap" gap={2}>
            <ConsultationTitleWithIcon description={historyRow.description} />
          </Grid>
          <Grid item xs={8}>
            <BaseDropdownWithLoading
              isLoading={false}
              options={[]}
              popupIcon={<KeyboardArrowDownIcon />}
              renderInputProps={{
                label: historyRow.description
              }}
            />
          </Grid>
        </Grid>
      ) : (
        <GenitourinaryHistoryRow
          key={historyRow.id}
          description={historyRow.description}
          fieldName={historyRow.fieldName}
        />
      );
    })}
    <ConsultationDivider />
  </Grid>
);

export default GenitourinaryHistory;
