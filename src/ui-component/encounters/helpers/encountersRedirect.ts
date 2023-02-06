import { ConfirmationPaths, EncounterPaths } from 'constants/confirmationModalPaths';
import { NextRouter } from 'next/router';

export enum EncountersPageTypes {
  ADD_ADDENDUM = 'ADD_ADDENDUM',
  EDIT_ADDENDUM = 'EDIT_ADDENDUM',
  EDIT_ENCOUNTER = 'EDIT_ENCOUNTER',
  ADD_ENCOUNTER = 'ADD_ENCOUNTER',
  BACK = 'BACK'
}

const encountersRedirect = (router: NextRouter, type: string, id?: string) => {
  switch (type) {
    case EncountersPageTypes.ADD_ADDENDUM:
      router.push(
        `${EncounterPaths.patientBase}/${router.query.id}${EncounterPaths.encounterBase}/${router.query.encounterId}${ConfirmationPaths.Add_Addendum}`
      );

      return;
    case EncountersPageTypes.EDIT_ENCOUNTER:
      router.push(
        `${EncounterPaths.patientBase}/${router.query.id}${EncounterPaths.encounterBase}/${router.query.encounterId}${ConfirmationPaths.Edit_Note}`
      );

      return;
    case EncountersPageTypes.EDIT_ADDENDUM:
      router.push({
        pathname: `${EncounterPaths.patientBase}/${router.query.id}${EncounterPaths.encounterBase}/${router.query.encounterId}${ConfirmationPaths.Edit_Addendum}`,
        query: { addendumId: id }
      });

      return;
    case EncountersPageTypes.ADD_ENCOUNTER:
      router.push(`${EncounterPaths.patientBase}/${router.query.id}${ConfirmationPaths.Add_Note}`);

      return;
    default:
      router.push(`${EncounterPaths.patientBase}/${router.query.id}/encounters`);
  }
};

export default encountersRedirect;
