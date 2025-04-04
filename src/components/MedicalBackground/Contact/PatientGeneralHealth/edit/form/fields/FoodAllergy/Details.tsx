import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import Diagram from '@components/MedicalBackground/components/common/Diagram';
import MedicalBackgroundNote from '@components/MedicalBackground/components/common/MedicalBackgroundNote';
import MedicalFormRadio from '@components/MedicalBackground/components/common/MedicalFormRadio';
import { AddFoodAllergy } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form/actions';
import useFoodAllergyContext from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/hooks/useFoodAllergyContext';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

import FoodAllergyContent from './Content';
import FoodAllergyTitle from './Title';
import FoodAllergyViewMode from './ViewMode';

const FoodAllergiesDetails = () => {
  const [t] = useTranslation();
  const { getValues } = useFormContext();
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const foodAllergy = generalHealth?.foodAllergies;
  const fieldName = `${GeneralHealthFormFields.FoodAllergies}.exists`;
  const { fields: foodAllergies } = useFoodAllergyContext();
  const foodAllergyInitialValue = getValues(fieldName);
  const [isFoodAllergyExists, setIsFoodAllergyExists] = useState<boolean>(foodAllergyInitialValue);
  const onFoodAllergyChange = (state: boolean) => setIsFoodAllergyExists(state);
  const [showAdditionalNote, setShowAdditionalNote] = useState(!!foodAllergy?.note);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

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
          description={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_FOOD_ALLERGY)}
        />
      </Grid>
      <Grid item container direction="column" xs={7} gap={2}>
        {foodAllergy?.isEditable ? (
          <>
            <Grid>
              <MedicalFormRadio fieldName={fieldName} onChangeState={onFoodAllergyChange} />
            </Grid>
            {isFoodAllergyExists ? (
              <>
                <Grid>
                  {foodAllergies.map((allergy, allergyIndex) => (
                    <Diagram
                      titleComponent={<FoodAllergyTitle titleIndex={allergyIndex} />}
                      titleContent={allergy}
                      key={allergy.id}
                    >
                      <FoodAllergyContent titleIndex={allergyIndex} />
                    </Diagram>
                  ))}
                </Grid>
                <AddFoodAllergy />
              </>
            ) : null}
            <MedicalBackgroundNote
              onClick={onNoteClick}
              visible={showAdditionalNote}
              fieldName={GeneralHealthFormFields.FoodAllergies}
            />
          </>
        ) : (
          <FoodAllergyViewMode />
        )}
      </Grid>
    </Grid>
  );
};

export default FoodAllergiesDetails;
