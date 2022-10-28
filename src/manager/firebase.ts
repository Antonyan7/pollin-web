import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { AppCheck, getToken, initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';
import { Auth, getAuth, onAuthStateChanged, SAMLAuthProvider, signInWithPopup } from 'firebase/auth';
import { dispatchAuthError, dispatchIsAuthChecked, dispatchLoginUser } from 'layout/MainLayout/Login/loginHelpers';

export class FirebaseManager {
  private static appCheck: AppCheck;

  private static app: FirebaseApp;

  private static auth: Auth;

  private static initializeAuth() {
    this.auth = getAuth(this.app);
    this.auth.tenantId = process.env.NEXT_PUBLIC_IDENTITY_PROVIDER_TENANT_ID ?? '';
    onAuthStateChanged(this.auth, (user) => {
      dispatchIsAuthChecked(true);
      dispatchLoginUser(user);
    });
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
