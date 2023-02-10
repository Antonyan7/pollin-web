import { useCallback } from 'react';

export interface IContextActionBinding {
  id: string;
  title?: string;
  actionCallback: () => void;
}

export const useContextMenuAction = (actionBindings: IContextActionBinding[]) =>
  useCallback(
    (actionId: string) => {
      const actionBinding = actionBindings.find((binding: IContextActionBinding) => binding.id === actionId);

      actionBinding?.actionCallback();
    },
    [actionBindings]
  );
