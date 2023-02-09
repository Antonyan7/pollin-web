import { FirebaseApp, getApps, initializeApp } from 'firebase/app';

import { getEnvironmentVariables } from '@utils/getEnvironmentVariables';

const { NEXT_PUBLIC_FIREBASE_CONFIG } = getEnvironmentVariables();

let app: FirebaseApp;

export const getFirebaseApp = () => {
  if (!app) {
    const apps = getApps();

    if (!apps.length) {
      app = initializeApp(JSON.parse(NEXT_PUBLIC_FIREBASE_CONFIG));
    } else {
      [app] = apps;
    }
  }

  return app;
};
