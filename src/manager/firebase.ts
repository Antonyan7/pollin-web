import React from 'react';
import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { AppCheck, getToken, initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';
import { Auth, getAuth, getIdToken, onAuthStateChanged, SAMLAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { FirebaseStorage, getDownloadURL, getStorage, ref, StorageError, uploadBytesResumable } from 'firebase/storage';
import { dispatchAuthError, dispatchIsAuthChecked, dispatchLoginUser } from 'layout/MainLayout/Login/loginHelpers';
import { v4 } from 'uuid';

import { getFileExtension } from '@utils/stringUtils';

export class FirebaseManager {
  private static appCheck: AppCheck;

  private static app: FirebaseApp;

  private static auth: Auth;

  private static storage: FirebaseStorage;

  private static user: User;

  private static initializeAuth() {
    this.auth = getAuth(this.app);
    this.auth.tenantId = process.env.NEXT_PUBLIC_IDENTITY_PROVIDER_TENANT_ID ?? '';
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.user = user;
      }

      dispatchIsAuthChecked(true);
      dispatchLoginUser(user);
    });
  }

  private static initiateStorage() {
    this.storage = getStorage(this.app);
  }

  public static async login() {
    const samlProvider = new SAMLAuthProvider(process.env.NEXT_PUBLIC_IDENTITY_PROVIDER_ID ?? '');

    signInWithPopup(this.auth, samlProvider)
      .then((credential) => {
        dispatchLoginUser(credential.user);
      })
      .catch((error) => {
        dispatchAuthError(error);
      });
  }

  public static async logout() {
    this.auth.signOut();
  }

  static initiate() {
    // eslint-disable-next-line no-console
    console.debug('Initiate firebase');

    if (this.app) {
      return;
    }

    try {
      const apps = getApps();

      if (!apps.length) {
        this.app = initializeApp(JSON.parse(String(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)), 'staff');

        FirebaseManager.appCheck = initializeAppCheck(this.app, {
          provider: new ReCaptchaEnterpriseProvider(String(process.env.NEXT_PUBLIC_RECAPTURE_SITE_KEY)),
          isTokenAutoRefreshEnabled: true
        });
      } else {
        [this.app] = apps;
      }

      if (!this.auth) {
        this.initializeAuth();
      }

      if (!this.storage) {
        this.initiateStorage();
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('initializeApp error');
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }

  static uploadFile(file: File, path: string, setProgress?: React.Dispatch<React.SetStateAction<number>>) {
    const fileExtension = getFileExtension(file.name);

    const storageRef = ref(this.storage, `${path}/${v4()}${fileExtension}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise<string>((resolve, reject: (reason: StorageError) => void) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

          setProgress?.(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  }

  static async getToken(): Promise<string> {
    let token = ' ';

    if (!FirebaseManager.appCheck) {
      // eslint-disable-next-line no-console
      console.error('App check not initiated');

      return '';
    }

    try {
      const tokenResult = await getToken(FirebaseManager.appCheck);

      token = tokenResult.token;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }

    return token;
  }

  static async getIdToken(): Promise<string> {
    let idToken = '';

    if (!FirebaseManager.appCheck) {
      // eslint-disable-next-line no-console
      console.error('App check not initiated');

      return '';
    }

    try {
      if (this.user) {
        idToken = await getIdToken(this.user);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }

    return idToken;
  }
}
