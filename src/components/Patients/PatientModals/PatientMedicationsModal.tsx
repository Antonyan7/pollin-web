import React, { useCallback, useMemo } from 'react';
import { IPatientMedicationData } from '@axios/patientEmr/managerPatientEmr';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { ModalName } from 'constants/modals';

import ObjectViewModal from '@ui-component/Modal/ObjectViewModal';

export interface PatientMedicationsModalProps {
  title: string;
  data: Record<string, IPatientMedicationData[] | string[]>;
}

const PatientMedicationsModal = ({ title, data }: PatientMedicationsModalProps) => {
  const onClose = useCallback(() => dispatch(viewsMiddleware.closeModal(ModalName.PatientMedicationsModal)), []);

  const modalData = useMemo(
    () =>
      Object.entries(data).reduce<React.ComponentProps<typeof ObjectViewModal>['data']>(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value.map((item) => {
            if (typeof item === 'string') {
              return item;
            }

            return {
              text: item.title,
              subText: item.dosage
            };
          })
        }),
        {}
      ),
    [data]
  );

  return <ObjectViewModal title={title} data={modalData} onClose={onClose} />;
};

export default PatientMedicationsModal;
