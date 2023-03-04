export enum CardMode {
  View = 'View',
  Edit = 'Edit'
}

export interface MedicalBackgroundCardProps {
  title: string;
  ViewComponent: () => JSX.Element;
  EditComponent: () => JSX.Element;
}
