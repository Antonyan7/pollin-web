import { FirebaseError } from 'firebase/app';

export interface UserProps {
  isAuthChecked: boolean;
  isUserDisabled: boolean;
  user: IUser | null;
  authError: FirebaseError | null;
}

export interface IUser {}
