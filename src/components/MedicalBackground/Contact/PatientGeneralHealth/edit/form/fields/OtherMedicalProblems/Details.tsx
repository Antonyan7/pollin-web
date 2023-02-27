import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import Diagram from '@components/MedicalBackground/components/common/Diagram';
import MedicalBackgroundNote from '@components/MedicalBackground/components/common/MedicalBackgroundNote';
import MedicalFormRadio from '@components/MedicalBackground/components/common/MedicalFormRadio';
import { AddMedicalProblem } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form/actions';
import MedicalPropblemContent from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form/fields/OtherMedicalProblems/Content';
import OtherMedicalProblemTitle from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form/fields/OtherMedicalProblems/Title';
import useMedicalProblemContext from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/hooks/useMedicalProblemContext';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Grid } from '@mui/material';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

const OtherMedicalProblemsDetails = () => {
  const [t] = useTranslation();
  const { getValues, setValue } = useFormContext();
  const fieldName = `${GeneralHealthFormFields.MedicalProblems}.exists`;
  const medicalProblemField = getValues(GeneralHealthFormFields.MedicalProblems);
  const { fields: medicalProblems } = useMedicalProblemContext();
  const medicalProblemsInitialValue = getValues(fieldName);
  const [isMedicalProblemExists, setIsMedicalProblemExists] = useState<boolean>(medicalProblemsInitialValue);
  const onMedicalProblemChange = (state: boolean) => setIsMedicalProblemExists(state);
  const [showAdditionalNote, setShowAdditionalNote] = useState(false);
  const onNoteClick = () => {
    if (medicalProblemField.note) {
      setShowAdditionalNote(!showAdditionalNote);
    }
  };

  useEffect(() => {
    if (!isMedicalProblemExists) {
      setValue(GeneralHealthFormFields.MedicalProblems, {
        ...medicalProblemField,
        exists: isMedicalProblemExists,
        items: []
      });
    }
  }, [isMedicalProblemExists, medicalProblemField, setValue]);

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
          description={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_OTHER_MEDICAL_PROBLEMS)}
        />
      </Grid>
      <Grid item container direction="column" xs={7} gap={2}>
        <Grid>
          <MedicalFormRadio fieldName={fieldName} onChangeState={onMedicalProblemChange} />
        </Grid>
        {isMedicalProblemExists ? (
          <>
            <Grid>
              {medicalProblems.map((problem, problemIndex) => (
                <Diagram
                  titleComponent={<OtherMedicalProblemTitle titleIndex={problemIndex} />}
                  titleContent={problem}
                  key={problem.id}
                >
                  <MedicalPropblemContent titleIndex={problemIndex} />
                </Diagram>
              ))}
            </Grid>
            <AddMedicalProblem />
            <MedicalBackgroundNote visible={showAdditionalNote} fieldName={GeneralHealthFormFields.MedicalProblems} />
          </>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default OtherMedicalProblemsDetails;
