import React, { PropsWithChildren, useEffect, useState } from 'react';
import * as Sentry from '@sentry/nextjs';
import { fetchAndActivate, getAll, getRemoteConfig, RemoteConfig } from 'firebase/remote-config';

import { getFirebaseApp } from '@utils/getFirebaseApp';

import { FlagsContext } from './FlagsContext';

let remoteConfig: RemoteConfig;
const prefix = `WEB_`;

const FlagsProvider = ({ children }: PropsWithChildren) => {
  const [flags, setFlags] = useState({});

  useEffect(() => {
    if (typeof window !== undefined || !!remoteConfig) {
      const app = getFirebaseApp();

      remoteConfig = getRemoteConfig(app);
      remoteConfig.settings.minimumFetchIntervalMillis = 1000;

      if (!!app && !!remoteConfig) {
        fetchAndActivate(remoteConfig)
          .then(() => getAll(remoteConfig))
          .then((fetchedFlags) => {
            const remoteFlags: Record<string, boolean> = {};

            Object.entries(fetchedFlags)
              .filter(([key]) => key.startsWith(prefix))
              .forEach(([key, config]) => {
                remoteFlags[key.replace(prefix, '')] = config.asBoolean();
              });

            setFlags(remoteFlags);
          })
          .catch((error) => {
            Sentry.captureException(error);
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <FlagsContext.Provider value={flags}>{children}</FlagsContext.Provider>;
};

export default FlagsProvider;
