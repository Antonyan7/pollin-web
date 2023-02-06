import React from 'react';
import EncountersLayout from 'layout/EncountersLayout';
import { SimpleEditorMode } from 'types/patient';

import EditEncounterRecord from '@ui-component/encounters/components/EditEncounterRecord';

const EditEncounterAddendumPage = () => <EditEncounterRecord mode={SimpleEditorMode.Edit_Addendum} />;

EditEncounterAddendumPage.PageLayout = EncountersLayout;

export default EditEncounterAddendumPage;
