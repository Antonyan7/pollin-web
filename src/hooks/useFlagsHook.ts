import { useContext } from 'react';

import { FlagsContext } from '../HOCs/FlagProvider/FlagsContext';

export const useFlags = () => useContext(FlagsContext);
