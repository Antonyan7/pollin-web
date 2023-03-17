import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FirebaseManager } from '@axios/firebase';
import { coreSelector } from '@redux/slices/core';

import { FlagsContext } from './FlagsContext';

const FlagsProvider = ({ children }: PropsWithChildren) => {
  const initializationStatus = useSelector(coreSelector.initializationStatus);
  const [flags, setFlags] = useState({});

  useEffect(() => {
    if (initializationStatus.featureFlags) {
      setFlags(FirebaseManager.getRemoteFlags());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initializationStatus.featureFlags]);

  return <FlagsContext.Provider value={flags}>{children}</FlagsContext.Provider>;
};

export default FlagsProvider;
