import { useContext } from 'react';
import { ScheduledTemplatesListContext } from 'context/ScheduledTemplates';

const useScheduledTemplatesListContext = () => {
  const scheduledTemplatesListState = useContext(ScheduledTemplatesListContext);

  return scheduledTemplatesListState;
};

export default useScheduledTemplatesListContext;
