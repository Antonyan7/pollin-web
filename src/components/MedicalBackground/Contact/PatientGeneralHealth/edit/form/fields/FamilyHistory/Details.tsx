import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import Diagram from '@components/MedicalBackground/components/common/Diagram';
import MedicalBackgroundNote from '@components/MedicalBackground/components/common/MedicalBackgroundNote';
import MedicalFormRadio from '@components/MedicalBackground/components/common/MedicalFormRadio';
import { AddFamilyHistory } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form/actions';
import useFamilyHistoryContext from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/hooks/useFamilyHistoryContext';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Grid } from '@mui/material';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

import FamilyHistoryContent from './Content';
import FamilyHistoryTitle from './Title';

const FamilyHistoryDetails = () => {
  const [t] = useTranslation();
  const { getValues, setValue } = useFormContext();
  const fieldName = `${GeneralHealthFormFields.FamilyHistory}.exists`;
  const familyHistoryField = getValues(GeneralHealthFormFields.FamilyHistory);
  const { fields: familyHistory } = useFamilyHistoryContext();
  const familyHistoryInitialValue = getValues(fieldName);
  const [isFamilyHistoryExists, setIsfamilyHistoryExists] = useState<boolean>(familyHistoryInitialValue);
  const onFamilyHistoryChange = (state: boolean) => setIsfamilyHistoryExists(state);
  const [showAdditionalNote, setShowAdditionalNote] = useState(false);
  const onNoteClick = () => {
    if (familyHistoryField.note) {
      setShowAdditionalNote(!showAdditionalNote);
    }
  };

  useEffect(() => {
    if (!isFamilyHistoryExists) {
      setValue(GeneralHealthFormFields.FamilyHistory, {
        ...familyHistoryField,
        exists: isFamilyHistoryExists,
        items: []
      });
    }
  }, [isFamilyHistoryExists, familyHistoryField, setValue]);

  return (
    <Grid container item px={paddings.leftRight32} py={paddings.topBottom16} direction="row" xs={12}>
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
        <ConsultationTitleWithIcon
          onClick={onNoteClick}
          description={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_FAMILY_HISTORY_PROBLEM)}
        />
      </Grid>
      <Grid item container direction="column" xs={7} gap={2}>
        <Grid>
          <MedicalFormRadio fieldName={fieldName} onChangeState={onFamilyHistoryChange} />
        </Grid>
        {isFamilyHistoryExists ? (
          <>
            <Grid>
              {familyHistory.map((history, historyIndex) => (
                <Diagram
                  titleComponent={<FamilyHistoryTitle titleIndex={historyIndex} />}
                  titleContent={history}
                  key={history.id}
                >
                  <FamilyHistoryContent titleIndex={historyIndex} />
                </Diagram>
              ))}
            </Grid>
            <AddFamilyHistory />
            <MedicalBackgroundNote visible={showAdditionalNote} fieldName={GeneralHealthFormFields.FamilyHistory} />
          </>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default FamilyHistoryDetails;
