interface StaticModalData {
  headerTitle: string;
  explanationMessage: string;
  actualQuestion?: string;
  cancelLabel?: string;
  confirmLabel: string;
}

export interface StaticModalProps {
  data: StaticModalData;
  onClose: () => void;
  toConfirm: () => void;
}
