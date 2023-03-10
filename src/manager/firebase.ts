import React from 'react';
import * as Sentry from '@sentry/nextjs';
import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { AppCheck, getToken, initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';
import {
  Auth,
  connectAuthEmulator,
  EmailAuthProvider,
  getAuth,
  getIdToken,
  onAuthStateChanged,
  SAMLAuthProvider,
  signInWithCredential,
  signInWithPopup,
  User
} from 'firebase/auth';
import { FirebaseStorage, getDownloadURL, getStorage, ref, StorageError, uploadBytesResumable } from 'firebase/storage';
import {
  dispatchAuthError,
  dispatchDisabledUser,
  dispatchIsAuthChecked,
  dispatchLoginUser
} from 'layout/MainLayout/Login/loginHelpers';
import { v4 } from 'uuid';

import { getEnvironmentVariables } from '@utils/getEnvironmentVariables';
import { getFileExtension } from '@utils/stringUtils';

const { NEXT_PUBLIC_IDENTITY_PROVIDER_TENANT_ID, NEXT_PUBLIC_ENVIRONMENT } = getEnvironmentVariables();

export interface WindowWithCypress extends Window {
  cypressEmailsPassSingIn: Function;
}
declare const window: WindowWithCypress;
export class FirebaseManager {
  private static appCheck: AppCheck;

  private static app: FirebaseApp;

  private static auth: Auth;

  private static storage: FirebaseStorage;

  private static user: User;

  private static initializeAuth() {
    this.auth = getAuth(this.app);

    this.auth.tenantId = NEXT_PUBLIC_IDENTITY_PROVIDER_TENANT_ID;

    if (NEXT_PUBLIC_ENVIRONMENT === 'e2eTesting') {
      console.warn('Using Firebase Authentication emulator');
      connectAuthEmulator(this.auth, 'http://localhost:9099');

      // Expose sing in function via window object
      window.cypressEmailsPassSingIn = (email: string, password: string) =>
        signInWithCredential(this.auth, EmailAuthProvider.credential(email, password));

      // Unset tenant since tenants export doesn't work on Firebase emulator
      this.auth.tenantId = null;
    }

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
    const { NEXT_PUBLIC_IDENTITY_PROVIDER_ID } = getEnvironmentVariables();
    const samlProvider = new SAMLAuthProvider(NEXT_PUBLIC_IDENTITY_PROVIDER_ID);

    signInWithPopup(this.auth, samlProvider)
      .then((credential) => {
        dispatchLoginUser(credential.user);
        dispatchDisabledUser(false);
      })
      .catch((error) => {
        if (error.code === 'auth/user-disabled') {
          dispatchDisabledUser(true);
        }

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

      [this.app] = apps;

      const { NEXT_PUBLIC_FIREBASE_CONFIG, NEXT_PUBLIC_RECAPTURE_SITE_KEY } = getEnvironmentVariables();

      if (!apps.length) {
        this.app = initializeApp(JSON.parse(NEXT_PUBLIC_FIREBASE_CONFIG));
      } else {
        [this.app] = apps;
      }

      FirebaseManager.appCheck = initializeAppCheck(this.app, {
        provider: new ReCaptchaEnterpriseProvider(NEXT_PUBLIC_RECAPTURE_SITE_KEY),
        isTokenAutoRefreshEnabled: true
      });

      if (!this.auth) {
        this.initializeAuth();
      }

      if (!this.storage) {
        this.initiateStorage();
      }
    } catch (error) {
      Sentry.captureException(error);
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
      Sentry.captureException('App check not initiated');

      return '';
    }

    try {
      const tokenResult = await getToken(FirebaseManager.appCheck);

      token = tokenResult.token;
    } catch (error) {
      Sentry.captureException(error);
    }

    return token;
  }

  static async getIdToken(): Promise<string> {
    let idToken = '';
    const apps = getApps();

    if (!apps.length) {
      Sentry.captureException('Firebase client SDK not initiated, no Firebase apps');

      return '';
    }

    try {
      if (this.user) {
        idToken = await getIdToken(this.user);
      }
    } catch (error) {
      Sentry.captureException(error);
    }

    return idToken;
  }
}
