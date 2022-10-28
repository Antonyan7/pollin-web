import { UserProps } from 'types/reduxTypes/user';

export const getInitialState = (): UserProps => ({
  isAuthChecked: false,
  user: null,
  authError: null
});
