import { UserProps } from 'types/reduxTypes/user';

export const getInitialState = (): UserProps => ({
  isAuthChecked: false,
  isUserDisabled: false,
  user: null,
  authError: null
});
