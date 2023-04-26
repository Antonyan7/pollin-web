import React, { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Add } from '@mui/icons-material';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

import { ButtonWithIcon } from '@ui-component/common/buttons';

const CreatePlanButton = ({ handleClick }: { handleClick: (event: MouseEvent<HTMLElement>) => void }) => {
  const [t] = useTranslation();

  return (
    <ButtonWithIcon
      sx={{ px: paddings.leftRight16 }}
      label={t(Translation.PAGE_PATIENT_PLANS_CREATE_A_PLAN_BTN)}
      variant="contained"
      icon={<Add />}
      handleClick={handleClick}
    />
  );
};

export default CreatePlanButton;
