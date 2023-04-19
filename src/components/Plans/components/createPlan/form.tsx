import React from 'react';
import { SpermSource, SpermType } from '@axios/patientEmr/managerPatientEmrTypes';
import { AdvancedFieldType, FieldWithNote } from '@components/common/Form/AdvancedField';
import { StaticDropdown } from '@components/common/Form/Dropdown';
import FormRadio from '@components/common/Form/Radio';
import { MonitoringLocation } from '@components/Plans/types';
import { Divider, Typography } from '@mui/material';
import { Translation } from 'constants/translations';
import { t } from 'i18next';
import { margins } from 'themes/themeConstants';

import { MedicationsForm } from './MedicationSections';

const MonitoringField = () => (
  <FieldWithNote
    fieldName="monitoring.monitoringLocation"
    type={AdvancedFieldType.Plan}
    fieldLabel={t(Translation.PAGE_PATIENT_PLANS_CREATE_MONITORING)}
    fieldComponent={<Typography>{MonitoringLocation.MonitoredInClinic}</Typography>}
  />
);

const Form = () => (
  <>
    <MonitoringField />
    <FieldWithNote
      fieldName="monitoring.cycleNumber"
      type={AdvancedFieldType.Plan}
      fieldLabel={t(Translation.PAGE_PATIENT_PLANS_CREATE_CYCLE_NUMBER)}
      fieldComponent={
        <StaticDropdown
          fieldName="monitoring.cycleNumber.value"
          label="Select"
          options={Array.from({ length: 15 }).map((_, index) => ({
            id: `${index + 1}`,
            title: `${index + 1}`
          }))}
        />
      }
    />
    <Divider
      sx={{
        my: margins.topBottom16
      }}
    />
    <FieldWithNote
      fieldName="sperm.source"
      type={AdvancedFieldType.Plan}
      fieldLabel={t(Translation.PAGE_PATIENT_PLANS_CREATE_SPERM_SOURCE)}
      fieldComponent={
        <FormRadio fieldName="sperm.source.value" firstOption={SpermSource.Partner} secondOption={SpermSource.Donor} />
      }
    />
    <FieldWithNote
      fieldName="sperm.type"
      type={AdvancedFieldType.Plan}
      fieldLabel={t(Translation.PAGE_PATIENT_PLANS_CREATE_SPERM_TYPE)}
      fieldComponent={
        <FormRadio fieldName="sperm.type.value" firstOption={SpermType.Fresh} secondOption={SpermType.Frozen} />
      }
    />
    <Divider
      sx={{
        my: margins.topBottom16
      }}
    />
    <MedicationsForm />
  </>
);

export default Form;
