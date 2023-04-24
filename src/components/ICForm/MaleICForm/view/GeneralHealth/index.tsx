import React from 'react';
import { useTranslation } from 'react-i18next';
import DrugAllergy from '@components/ICForm/components/common/generalHealth/DrugAllergy';
import FamilyHistory from '@components/ICForm/components/common/generalHealth/FamilyProblems';
import FoodAllergy from '@components/ICForm/components/common/generalHealth/FoodAllergy';
import MedicalProblems from '@components/ICForm/components/common/generalHealth/MedicalProblems';
import PastSurgeries from '@components/ICForm/components/common/generalHealth/PastSurgery';
import VitaminSupplements from '@components/ICForm/components/common/generalHealth/VitaminSupplements';
import SectionWrapperWithTitle from '@components/ICForm/components/common/SectionWrapperWithTitle';
import SingleViewOnlyItem from '@components/ICForm/components/common/SingleViewOnlyItem';
import { defineSingleFieldValue } from '@components/MedicalBackground/helpers';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

import { generalHealthMapper } from '../helpers';

const ViewGeneralHealth = () => {
  const [t] = useTranslation();
  const generalHealth = useAppSelector(patientsSelector.icForm)?.generalHealth;
  const mappedItems = generalHealthMapper(generalHealth);
  const medicalProblems = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_OTHER_MEDICAL_PROBLEMS);
  const pastSurgery = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_PAST_SURGERY);
  const drugAllergy = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_DRUG_ALLERGY);
  const foodAllergy = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_FOOD_ALLERGY);
  const vitaminSupplements = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_VITAMIN_SUPPLEMENTS);
  const familyProblems = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_FAMILY_HISTORY_PROBLEM);

  return (
    <SectionWrapperWithTitle title={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_GENERAL_HEALTH)}>
      <>
        <SingleViewOnlyItem
          itemTitle={medicalProblems}
          itemValue={<MedicalProblems />}
          note={generalHealth?.medicalProblems.note}
          index={0}
        />
        <SingleViewOnlyItem
          itemTitle={pastSurgery}
          itemValue={<PastSurgeries />}
          note={generalHealth?.pastSurgeries.note}
          index={1}
        />
        <SingleViewOnlyItem
          itemTitle={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_PROBLEM_WITH_ANESTHETICS)}
          itemValue={defineSingleFieldValue(generalHealth?.problemWithAnesthetics.value)}
          note={generalHealth?.problemWithAnesthetics.note}
          index={2}
        />
        <SingleViewOnlyItem
          itemTitle={vitaminSupplements}
          itemValue={<VitaminSupplements />}
          note={generalHealth?.vitaminSupplements.note}
          index={3}
        />
        <SingleViewOnlyItem
          itemTitle={drugAllergy}
          itemValue={<DrugAllergy />}
          note={generalHealth?.drugAllergies.note}
          index={4}
        />
        <SingleViewOnlyItem
          itemTitle={foodAllergy}
          itemValue={<FoodAllergy />}
          note={generalHealth?.foodAllergies.note}
          index={5}
        />
        {mappedItems.map((health, healthIndex) => {
          const healthValue = defineSingleFieldValue(health.item as boolean);

          if (health.itemTitle === familyProblems) {
            return (
              <SingleViewOnlyItem
                key={health.itemTitle}
                itemTitle={familyProblems}
                itemValue={<FamilyHistory />}
                note={generalHealth?.familyHistory.note}
                index={healthIndex}
              />
            );
          }

          return (
            <SingleViewOnlyItem
              key={health.itemTitle}
              itemTitle={health.itemTitle}
              note={health.note}
              itemValue={healthValue}
              index={healthIndex}
            />
          );
        })}
      </>
    </SectionWrapperWithTitle>
  );
};

export default ViewGeneralHealth;
