import React, { useState } from 'react';
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
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

import DrugAllergyContent from './Content';
import DrugAllergyTitle from './Title';
import DrugAllergyViewMode from './ViewMode';

const DrugAllergiesDetails = () => {
  const [t] = useTranslation();
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const { getValues } = useFormContext();
  const fieldName = `${GeneralHealthFormFields.DrugAllergies}.exists`;
  const drugAllergy = generalHealth?.drugAllergies;
  const { fields: drugAllergies } = useDrugAllergyContext();
  const drugAllergyInitialValue = getValues(fieldName);
  const [isDrugAllergyExists, setIsDrugAllergyExists] = useState<boolean>(drugAllergyInitialValue);
  const onDrugAllergyChange = (state: boolean) => setIsDrugAllergyExists(state);
  const [showAdditionalNote, setShowAdditionalNote] = useState(false);
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
          description={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_DRUG_ALLERGY)}
        />
      </Grid>
      <Grid item container direction="column" xs={7} gap={2}>
        {drugAllergy?.isEditable ? (
          <>
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
              </>
            ) : null}
            <MedicalBackgroundNote
              onClick={onNoteClick}
              visible={showAdditionalNote}
              fieldName={GeneralHealthFormFields.DrugAllergies}
            />
          </>
        ) : (
          <DrugAllergyViewMode />
        )}
      </Grid>
    </Grid>
  );
};

export default DrugAllergiesDetails;
