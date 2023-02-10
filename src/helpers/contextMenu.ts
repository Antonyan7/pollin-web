import { ContextMenuAction } from 'types/reduxTypes/resultsStateTypes';

import { IContextActionBinding } from '@hooks/useContextMenuAction';

export const getActionTitleById = (id: string, actions: ContextMenuAction[]): string =>
  actions.find((action) => action.id === id)?.title ?? id;

export const filterActionBindings = (actions: ContextMenuAction[], actionBindings: IContextActionBinding[]) => {
  const ids = actions.map((action) => action.id);

  return actionBindings.filter((actionBinding) => ids.includes(actionBinding.id));
};
