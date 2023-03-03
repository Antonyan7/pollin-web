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
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

import FamilyHistoryContent from './Content';
import FamilyHistoryTitle from './Title';
import FamilyHistoryViewMode from './ViewMode';

const FamilyHistoryDetails = () => {
  const [t] = useTranslation();
  const { getValues, setValue } = useFormContext();
  const fieldName = `${GeneralHealthFormFields.FamilyHistory}.exists`;
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const familyHistories = generalHealth?.familyHistory;
  const familyHistoryField = getValues(GeneralHealthFormFields.FamilyHistory);
  const { fields: familyHistory, remove } = useFamilyHistoryContext();
  const familyHistoryInitialValue = getValues(fieldName);
  const [isFamilyHistoryExists, setIsfamilyHistoryExists] = useState<boolean>(familyHistoryInitialValue);
  const onFamilyHistoryChange = (state: boolean) => setIsfamilyHistoryExists(state);
  const [showAdditionalNote, setShowAdditionalNote] = useState(false);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  useEffect(
    () => {
      if (!isFamilyHistoryExists) {
        const indexes = familyHistory.map((item) => familyHistory.indexOf(item));

        remove(indexes);
        setValue(GeneralHealthFormFields.FamilyHistory, {
          ...familyHistoryField,
          exists: isFamilyHistoryExists,
          items: []
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isFamilyHistoryExists, setValue]
  );

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
        {familyHistories?.isEditable ? (
          <>
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
                <MedicalBackgroundNote
                  onClick={onNoteClick}
                  visible={showAdditionalNote}
                  fieldName={GeneralHealthFormFields.FamilyHistory}
                />
              </>
            ) : null}
          </>
        ) : (
          <FamilyHistoryViewMode />
        )}
      </Grid>
    </Grid>
  );
};

export default FamilyHistoryDetails;
