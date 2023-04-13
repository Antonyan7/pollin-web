import { ReactNode } from 'react';

interface StaticModalData {
  headerTitle: string;
  explanationMessage: string;
  actualQuestion?: string;
  cancelLabel?: string;
  confirmLabel: string;
  confirmCy?: string;
}

export interface StaticModalProps {
  data: StaticModalData;
  onClose: () => void;
  toConfirm: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  divider?: boolean;
  dynamicComponent?: ReactNode;
}

export interface StaticModalBodyProps {
  data: StaticModalData;
  dynamicComponent?: ReactNode;
}

export interface StaticModalActionsProps {
  data: StaticModalData;
  onClose: () => void;
  toConfirm: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
}
