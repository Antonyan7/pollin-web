import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import Diagram from '@components/MedicalBackground/components/common/Diagram';
import MedicalBackgroundNote from '@components/MedicalBackground/components/common/MedicalBackgroundNote';
import MedicalFormRadio from '@components/MedicalBackground/components/common/MedicalFormRadio';
import { AddSurgery } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form/actions';
import PastSurgeriesContent from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form/fields/PastSurgeries/Content';
import PastSurgeriesTitle from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form/fields/PastSurgeries/Title';
import usePastSurgeryContext from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/hooks/usePastSurgeryContext';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Grid } from '@mui/material';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

const PastSurgeriesDetails = () => {
  const [t] = useTranslation();
  const { getValues, setValue } = useFormContext();
  const fieldName = `${GeneralHealthFormFields.PastSurgeries}.exists`;
  const pastSurgeryField = getValues(GeneralHealthFormFields.PastSurgeries);
  const { fields: pastSurgeries, remove } = usePastSurgeryContext();
  const pastSurgeriesInitialValue = getValues(fieldName);
  const [arePastSurgeriesExists, setArePastSurgeriesExists] = useState<boolean>(pastSurgeriesInitialValue);
  const onPastSurgeryChange = (state: boolean) => setArePastSurgeriesExists(state);
  const [showAdditionalNote, setShowAdditionalNote] = useState(false);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  useEffect(
    () => {
      if (!arePastSurgeriesExists) {
        const indexes = pastSurgeries.map((item) => pastSurgeries.indexOf(item));

        remove(indexes);
        setValue(GeneralHealthFormFields.PastSurgeries, {
          ...pastSurgeryField,
          exists: arePastSurgeriesExists,
          items: []
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [arePastSurgeriesExists, setValue]
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
          description={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_PAST_SURGERY)}
        />
      </Grid>
      <Grid item container direction="column" xs={7} gap={2}>
        <Grid>
          <MedicalFormRadio fieldName={fieldName} onChangeState={onPastSurgeryChange} />
        </Grid>
        {arePastSurgeriesExists ? (
          <>
            <Grid>
              {pastSurgeries.map((surgery, surgeryIndex) => (
                <Diagram
                  titleComponent={<PastSurgeriesTitle titleIndex={surgeryIndex} />}
                  titleContent={surgery}
                  key={surgery.id}
                >
                  <PastSurgeriesContent titleIndex={surgeryIndex} />
                </Diagram>
              ))}
            </Grid>
            <AddSurgery />
            <MedicalBackgroundNote
              onClick={onNoteClick}
              visible={showAdditionalNote}
              fieldName={GeneralHealthFormFields.PastSurgeries}
            />
          </>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default PastSurgeriesDetails;
