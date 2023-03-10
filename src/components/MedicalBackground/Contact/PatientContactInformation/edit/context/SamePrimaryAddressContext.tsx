import React, { createContext, PropsWithChildren, SetStateAction, useMemo, useState } from 'react';

interface SamePrimaryAddressProviderProps {
  isSameAddressChecked: boolean;
  setSameAddress?: React.Dispatch<SetStateAction<boolean>>;
}

export const SamePrimaryAddressContext = createContext<SamePrimaryAddressProviderProps>({
  isSameAddressChecked: false
});

export const SamePrimaryAddressProvider = ({ children }: PropsWithChildren) => {
  const [isSameAddressChecked, setSameAddress] = useState(false);

  const value = useMemo(
    () => ({
      isSameAddressChecked,
      setSameAddress
    }),
    [isSameAddressChecked]
  );

  return <SamePrimaryAddressContext.Provider value={value}>{children}</SamePrimaryAddressContext.Provider>;
};
