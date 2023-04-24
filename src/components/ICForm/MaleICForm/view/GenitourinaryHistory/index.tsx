import React from 'react';
import { useTranslation } from 'react-i18next';
import { IDiagnosedConditionsItem } from '@axios/patientEmr/managerPatientEmrTypes';
import RenderDiagnosed from '@components/ICForm/components/common/RenderDiagnosed';
import SectionWrapperWithTitle from '@components/ICForm/components/common/SectionWrapperWithTitle';
import SingleViewOnlyItem from '@components/ICForm/components/common/SingleViewOnlyItem';
import { defineSingleFieldValue } from '@components/MedicalBackground/helpers';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

import { genitourinaryHistoryMapper } from '../helpers';

const ViewGenitourinaryHistory = () => {
  const [t] = useTranslation();
  const genitourinaryHistory = useAppSelector(patientsSelector.icForm)?.genitourinaryHistory;
  const mappedData = genitourinaryHistoryMapper(genitourinaryHistory);
  const diagnosedField = t(
    Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GENITOURINARY_HISTORY_FIELD_DIAGNOSED_CONDITIONS
  );

  return (
    <SectionWrapperWithTitle
      title={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GENITOURINARY_HISTORY_TITLE)}
    >
      {mappedData?.map((history, historyIndex) => {
        if (history.itemTitle === diagnosedField) {
          const diagnosedFieldItems = history.item as IDiagnosedConditionsItem[];

          return (
            <SingleViewOnlyItem
              key={history.itemTitle}
              note={history.note}
              itemTitle={diagnosedField}
              itemValue={<RenderDiagnosed diagnosedFields={diagnosedFieldItems} />}
            />
          );
        }

        const historyValue = defineSingleFieldValue(history.item as boolean);

        return (
          <SingleViewOnlyItem
            key={history.itemTitle}
            note={history.note}
            itemTitle={history.itemTitle}
            itemValue={historyValue}
            index={historyIndex}
          />
        );
      })}
    </SectionWrapperWithTitle>
  );
};

export default ViewGenitourinaryHistory;
