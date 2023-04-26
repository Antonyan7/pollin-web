import React, { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { plansMiddleware, plansSelector } from '@redux/slices/plans';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { ModalName } from 'types/modals';

import CircularLoading from '@ui-component/circular-loading';
import StaticModal from '@ui-component/StaticModal';

interface AvailablePlansProps {
  handleCheck: (value: string) => void;
}

const AvailablePlans: FC<AvailablePlansProps> = ({ handleCheck }) => {
  const router = useRouter();
  const patientId = router.query.id as string;
  const readyToOrderPatientPlans = useAppSelector(plansSelector.readyToOrderPatientPlans);
  const isReadyToOrderPlansLoading = useAppSelector(plansSelector.isReadyToOrderPlansLoading);

  useEffect(() => {
    dispatch(plansMiddleware.getPatientPlansReadyToOrder(patientId));
  }, [patientId]);

  if (isReadyToOrderPlansLoading) {
    return <CircularLoading />;
  }

  return (
    <FormGroup>
      {readyToOrderPatientPlans.map((plan) => (
        <FormControlLabel
          key={plan.id}
          control={<Checkbox onClick={() => handleCheck(plan.id)} />}
          label={plan.title}
        />
      ))}
    </FormGroup>
  );
};

const SendPlansToPatient = () => {
  const [t] = useTranslation();
  const isReadyToOrderPlansUpdating = useAppSelector(plansSelector.isReadyToOrderPlansUpdating);
  const [checkedPlans, setCheckedPlans] = useState<string[]>([]);
  const router = useRouter();
  const patientId = router.query.id as string;
  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.SendPlansToPatientModal));
  }, []);

  const handleCheck = (value: string) => {
    if (checkedPlans.includes(value)) {
      const filteredCheckedPlans = [...checkedPlans].filter((checkedPlan) => checkedPlan !== value);

      setCheckedPlans(filteredCheckedPlans);
    } else {
      setCheckedPlans([...checkedPlans, value]);
    }
  };

  const handleConfirm = useCallback(() => {
    dispatch(
      plansMiddleware.orderPlansToPatient(patientId, {
        patientPlans: checkedPlans.map((checkedPlan) => ({ id: checkedPlan }))
      })
    );
    onClose();
  }, [checkedPlans, onClose, patientId]);

  return (
    <StaticModal
      data={{
        headerTitle: t(Translation.MODAL_PATIENT_PLANS_SEND_PLANS_TO_PATIENT_HEADER),
        explanationMessage: t(Translation.MODAL_PATIENT_PLANS_SEND_PLANS_TO_PATIENT_EXPLANATION_MESSAGE) ?? '',
        confirmLabel: t(Translation.COMMON_BUTTON_CONFIRM_LABEL)
      }}
      dynamicComponent={<AvailablePlans handleCheck={handleCheck} />}
      toConfirm={handleConfirm}
      onClose={onClose}
      isLoading={isReadyToOrderPlansUpdating}
      isDisabled={!checkedPlans.length}
      divider
    />
  );
};

export default SendPlansToPatient;
