import { useCallback } from 'react';

export interface IActionBinding {
  actionId: string;
  actionCallback: () => void;
}

export const useToolbarAction = (actionBindings: IActionBinding[]) =>
  useCallback(
    (actionId: string) => {
      const actionBinding = actionBindings.find((binding: IActionBinding) => binding.actionId === actionId);

      actionBinding?.actionCallback();
    },
    [actionBindings]
  );
