import React from 'react';
import EncountersLayout from 'layout/EncountersLayout';
import { SimpleEditorMode } from 'types/patient';

import EditEncounterRecord from '@ui-component/encounters/components/EditEncounterRecord';

const EditEncounterPage = () => <EditEncounterRecord mode={SimpleEditorMode.Edit_Note} />;

EditEncounterPage.PageLayout = EncountersLayout;

export default EditEncounterPage;
