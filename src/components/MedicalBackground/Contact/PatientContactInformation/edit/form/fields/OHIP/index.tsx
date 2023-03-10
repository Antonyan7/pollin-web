import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import Diagram from '@components/MedicalBackground/components/common/Diagram';
import MedicalBackgroundNote from '@components/MedicalBackground/components/common/MedicalBackgroundNote';
import MedicalFormRadio from '@components/MedicalBackground/components/common/MedicalFormRadio';
import { ContactInformationFormFields } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/types';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';
import { v4 } from 'uuid';

import OHIPContent from './Content';
import OHIPTitle from './Title';
import OHIPViewMode from './ViewMode';

const FieldOHIP = () => {
  const [t] = useTranslation();
  const ohipLabel = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_INFORMATION_PATIENT_OHIP);
  const contactInformation = useAppSelector(patientsSelector.contactInformation);
  const { getValues, setValue } = useFormContext();
  const fieldName = `${ContactInformationFormFields.OHIP}.exists`;
  const OHIPField = getValues(ContactInformationFormFields.OHIP);
  const ohip = contactInformation?.OHIP;
  const OHIPFieldInitialValue = getValues(fieldName);
  const [isOHIPExists, setIsOHIPExists] = useState<boolean>(OHIPFieldInitialValue);
  const onOHIPChange = (state: boolean) => setIsOHIPExists(state);
  const [showAdditionalNote, setShowAdditionalNote] = useState(false);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  useEffect(
    () => {
      if (!isOHIPExists) {
        setValue(ContactInformationFormFields.OHIP, {
          ...OHIPField,
          exists: isOHIPExists,
          versionCode: '',
          number: ''
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isOHIPExists, setValue]
  );

  return (
    <Grid container item px={paddings.leftRight24} py={paddings.topBottom16} direction="row" xs={12}>
      <Grid
        item
        container
        direction="row"
        xs={5}
        alignItems="flex-start"
        flexWrap="nowrap"
        gap={1}
        sx={{
          marginTop: margins.top10
        }}
      >
        <ConsultationTitleWithIcon onClick={onNoteClick} description={ohipLabel} />
      </Grid>
      <Grid item container direction="column" xs={7} gap={2}>
        {ohip?.isEditable ? (
          <>
            <Grid>
              <MedicalFormRadio fieldName={fieldName} onChangeState={onOHIPChange} />
            </Grid>
            {isOHIPExists ? (
              <>
                <Grid>
                  <Diagram
                    titleComponent={<OHIPTitle />}
                    titleContent={{
                      id: v4()
                    }}
                  >
                    <OHIPContent />
                  </Diagram>
                </Grid>
                <MedicalBackgroundNote
                  onClick={onNoteClick}
                  visible={showAdditionalNote}
                  fieldName={ContactInformationFormFields.OHIP}
                />
              </>
            ) : null}
          </>
        ) : (
          <OHIPViewMode />
        )}
      </Grid>
    </Grid>
  );
};

export default FieldOHIP;
