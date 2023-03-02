import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import Diagram from '@components/MedicalBackground/components/common/Diagram';
import MedicalBackgroundNote from '@components/MedicalBackground/components/common/MedicalBackgroundNote';
import MedicalFormRadio from '@components/MedicalBackground/components/common/MedicalFormRadio';
import { AddDrugAllergy } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form/actions';
import useDrugAllergyContext from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/hooks/useDrugAllergyContext';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Grid } from '@mui/material';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

import DrugAllergyContent from './Content';
import DrugAllergyTitle from './Title';

const DrugAllergiesDetails = () => {
  const [t] = useTranslation();
  const { getValues, setValue } = useFormContext();
  const fieldName = `${GeneralHealthFormFields.DrugAllergies}.exists`;
  const drugAllergyField = getValues(GeneralHealthFormFields.DrugAllergies);
  const { fields: drugAllergies, remove } = useDrugAllergyContext();
  const drugAllergyInitialValue = getValues(fieldName);
  const [isDrugAllergyExists, setIsDrugAllergyExists] = useState<boolean>(drugAllergyInitialValue);
  const onDrugAllergyChange = (state: boolean) => setIsDrugAllergyExists(state);
  const [showAdditionalNote, setShowAdditionalNote] = useState(false);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  useEffect(
    () => {
      if (!isDrugAllergyExists) {
        const indexes = drugAllergies.map((item) => drugAllergies.indexOf(item));

        remove(indexes);
        setValue(GeneralHealthFormFields.DrugAllergies, {
          ...drugAllergyField,
          exists: isDrugAllergyExists,
          items: []
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isDrugAllergyExists, setValue]
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
          description={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_DRUG_ALLERGY)}
        />
      </Grid>
      <Grid item container direction="column" xs={7} gap={2}>
        <Grid>
          <MedicalFormRadio fieldName={fieldName} onChangeState={onDrugAllergyChange} />
        </Grid>
        {isDrugAllergyExists ? (
          <>
            <Grid>
              {drugAllergies.map((allergy, allergyIndex) => (
                <Diagram
                  titleComponent={<DrugAllergyTitle titleIndex={allergyIndex} />}
                  titleContent={allergy}
                  key={allergy.id}
                >
                  <DrugAllergyContent titleIndex={allergyIndex} />
                </Diagram>
              ))}
            </Grid>
            <AddDrugAllergy />
            <MedicalBackgroundNote
              onClick={onNoteClick}
              visible={showAdditionalNote}
              fieldName={GeneralHealthFormFields.DrugAllergies}
            />
          </>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default DrugAllergiesDetails;
