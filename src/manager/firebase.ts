import { getApps, initializeApp } from 'firebase/app';
import { AppCheck, getToken, initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';

export class FirebaseManager {
  private static appCheck: AppCheck;

  static initiate() {
    // eslint-disable-next-line no-console
    console.debug('Initiate firebase');

    try {
      if (!getApps().length) {
        const app = initializeApp(JSON.parse(String(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)));

        FirebaseManager.appCheck = initializeAppCheck(app, {
          provider: new ReCaptchaEnterpriseProvider(String(process.env.NEXT_PUBLIC_RECAPTURE_SITE_KEY)),
          isTokenAutoRefreshEnabled: true
        });
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('initializeApp error');
      // eslint-disable-next-line no-console
      console.error(e);
    }
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
}
