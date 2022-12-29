import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledButton } from '@components/Appointments/CommonMaterialComponents';
import useScheduleFormContext from '@components/Scheduling/scheduleTemplateForm/hooks/useScheduleFormContext';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';

const CancelButton = () => {
  const [t] = useTranslation();
  const { scheduleId } = useScheduleFormContext();
  const cancelButtonCyId = scheduleId
    ? CypressIds.PAGE_SCHEDULING_EDIT_TEMPLATES_BUTTON_CANCEL
    : CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_BUTTON_CANCEL;
  const cancelButtonLabel = scheduleId
    ? t(Translation.PAGE_SCHEDULING_EDIT_TEMPLATES_BUTTON_CANCEL)
    : t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_BUTTON_CANCEL);

  const onCancelClick = () => {
    dispatch(
      viewsMiddleware.setRedirectionState({
        path: '/scheduling/schedule-templates',
        params: '',
        apply: true
      })
    );
  };

  return (
    <StyledButton
      data-cy={cancelButtonCyId}
      color="primary"
      onClick={onCancelClick}
      variant="outlined"
      size="large"
      sx={{ marginRight: margins.all20, marginLeft: margins.auto }}
    >
      {cancelButtonLabel}
    </StyledButton>
  );
};

export default CancelButton;
