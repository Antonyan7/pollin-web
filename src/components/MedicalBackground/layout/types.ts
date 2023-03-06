export enum CardMode {
  View = 'View',
  Edit = 'Edit'
}

export interface MedicalBackgroundCardProps {
  title: string;
  ViewModeContent: () => JSX.Element;
  EditModeContent: () => JSX.Element;
}
