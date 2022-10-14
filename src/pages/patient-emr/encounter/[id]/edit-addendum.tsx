import React from 'react';
import { SimpleEditorMode } from 'types/patient';

import EditEncounterRecord from '@ui-component/encounters/EditEncounterRecord';

const EditEncounterAddendumPage = () => <EditEncounterRecord mode={SimpleEditorMode.Edit_Addendum} />;

export default EditEncounterAddendumPage;
