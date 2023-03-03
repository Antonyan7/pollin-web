import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import Diagram from '@components/MedicalBackground/components/common/Diagram';
import MedicalBackgroundNote from '@components/MedicalBackground/components/common/MedicalBackgroundNote';
import MedicalFormRadio from '@components/MedicalBackground/components/common/MedicalFormRadio';
import { AddVitamin } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form/actions';
import VitaminSupplementsContent from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form/fields/VitaminSupplements/Content';
import VitaminSupplementsTitle from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form/fields/VitaminSupplements/Title';
import useVitaminSupplementsContext from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/hooks/useVitaminSupplementsContext';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

import VitaminSupplementsViewMode from './ViewMode';

const VitaminSupplementDetails = () => {
  const [t] = useTranslation();
  const { getValues, setValue } = useFormContext();
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const vitaminSupplement = generalHealth?.vitaminSupplements;
  const fieldName = `${GeneralHealthFormFields.VitaminSupplements}.exists`;
  const vitaminSupplementField = getValues(GeneralHealthFormFields.VitaminSupplements);
  const { fields: vitaminSupplements, remove } = useVitaminSupplementsContext();
  const vitaminSupplementsInitialValue = getValues(fieldName);
  const [areVitaminSupplementsExists, setAreVitaminSupplementsExists] =
    useState<boolean>(vitaminSupplementsInitialValue);
  const onVitaminSupplementChange = (state: boolean) => setAreVitaminSupplementsExists(state);
  const [showAdditionalNote, setShowAdditionalNote] = useState(false);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  useEffect(
    () => {
      if (!areVitaminSupplementsExists) {
        const indexes = vitaminSupplements.map((item) => vitaminSupplements.indexOf(item));

        remove(indexes);
        setValue(GeneralHealthFormFields.VitaminSupplements, {
          ...vitaminSupplementField,
          exists: areVitaminSupplementsExists,
          items: []
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [areVitaminSupplementsExists, setValue]
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
          description={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_VITAMIN_SUPPLEMENTS)}
        />
      </Grid>
      <Grid item container direction="column" xs={7} gap={2}>
        {vitaminSupplement?.isEditable ? (
          <>
            <Grid>
              <MedicalFormRadio fieldName={fieldName} onChangeState={onVitaminSupplementChange} />
            </Grid>
            {areVitaminSupplementsExists ? (
              <>
                <Grid>
                  {vitaminSupplements.map((supplement, supplementIndex) => (
                    <Diagram
                      titleComponent={<VitaminSupplementsTitle titleIndex={supplementIndex} />}
                      titleContent={supplement}
                      key={supplement.id}
                    >
                      <VitaminSupplementsContent titleIndex={supplementIndex} />
                    </Diagram>
                  ))}
                </Grid>
                <AddVitamin />
                <MedicalBackgroundNote
                  onClick={onNoteClick}
                  visible={showAdditionalNote}
                  fieldName={GeneralHealthFormFields.VitaminSupplements}
                />
              </>
            ) : null}
          </>
        ) : (
          <VitaminSupplementsViewMode />
        )}
      </Grid>
    </Grid>
  );
};

export default VitaminSupplementDetails;
