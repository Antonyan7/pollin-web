import { createContext } from 'react';

import { StaticModalProps } from '../types';

const StaticDataContext = createContext<StaticModalProps>({
  data: {
    headerTitle: '',
    explanationMessage: '',
    actualQuestion: '',
    cancelLabel: '',
    confirmLabel: ''
  },
  onClose: () => {},
  toConfirm: () => {}
});

export default StaticDataContext;
