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
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

import MedicalProblemsViewMode from './ViewMode';

const OtherMedicalProblemsDetails = () => {
  const [t] = useTranslation();
  const { getValues, setValue } = useFormContext();
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const medicalProblem = generalHealth?.medicalProblems;
  const fieldName = `${GeneralHealthFormFields.MedicalProblems}.exists`;
  const medicalProblemField = getValues(GeneralHealthFormFields.MedicalProblems);
  const { fields: medicalProblems, remove } = useMedicalProblemContext();
  const medicalProblemsInitialValue = getValues(fieldName);
  const [isMedicalProblemExists, setIsMedicalProblemExists] = useState<boolean>(medicalProblemsInitialValue);
  const onMedicalProblemChange = (state: boolean) => setIsMedicalProblemExists(state);
  const [showAdditionalNote, setShowAdditionalNote] = useState(false);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  useEffect(
    () => {
      if (!isMedicalProblemExists) {
        const indexes = medicalProblems.map((item) => medicalProblems.indexOf(item));

        remove(indexes);
        setValue(GeneralHealthFormFields.MedicalProblems, {
          ...medicalProblemField,
          exists: isMedicalProblemExists,
          items: []
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setValue, isMedicalProblemExists]
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
          description={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_OTHER_MEDICAL_PROBLEMS)}
        />
      </Grid>
      <Grid item container direction="column" xs={7} gap={2}>
        {medicalProblem?.isEditable ? (
          <>
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
                <MedicalBackgroundNote
                  onClick={onNoteClick}
                  visible={showAdditionalNote}
                  fieldName={GeneralHealthFormFields.MedicalProblems}
                />
              </>
            ) : null}
          </>
        ) : (
          <MedicalProblemsViewMode />
        )}
      </Grid>
    </Grid>
  );
};

export default OtherMedicalProblemsDetails;
