import React from 'react';
import { SimpleEditorMode } from 'types/patient';

import EditEncounterRecord from '@ui-component/encounters/EditEncounterRecord';

const EditEncounterPage = () => <EditEncounterRecord mode={SimpleEditorMode.Edit_Note} />;

export default EditEncounterPage;
