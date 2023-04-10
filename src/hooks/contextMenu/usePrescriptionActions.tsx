import { useCallback } from 'react';
import { IPrescriptionStatusesActions } from '@axios/patientEmr/managerPatientEmrTypes';
import { dispatch } from '@redux/hooks';
import { patientsMiddleware } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { filterActionBindings, getActionTitleById } from 'helpers/contextMenu';
import { ModalName } from 'types/modals';
import { ContextMenuAction } from 'types/reduxTypes/resultsStateTypes';

const usePrescriptionActions = (prescriptionId: string, actions: ContextMenuAction[] = []) => {
  const handleDownLoadAction = useCallback(() => {
    dispatch(patientsMiddleware.downloadPatientPrescription(prescriptionId));
  }, [prescriptionId]);

  const handleMarkAsDispensedAction = useCallback(() => {
    dispatch(patientsMiddleware.markPatientPrescriptionDispensed(prescriptionId));
  }, [prescriptionId]);

  const handleArchivePrescriptionAction = useCallback(() => {
    dispatch(
      viewsMiddleware.openModal({
        name: ModalName.PrescriptionsArchive,
        props: { prescriptionId }
      })
    );
  }, [prescriptionId]);

  const actionBindings = [
    {
      id: IPrescriptionStatusesActions.Download,
      title: getActionTitleById(IPrescriptionStatusesActions.Download, actions),
      actionCallback: () => {
        handleDownLoadAction();
      }
    },
    {
      id: IPrescriptionStatusesActions.ArchivePrescription,
      title: getActionTitleById(IPrescriptionStatusesActions.ArchivePrescription, actions),
      actionCallback: () => {
        handleArchivePrescriptionAction();
      }
    },
    {
      id: IPrescriptionStatusesActions.MarkAsDispensed,
      title: getActionTitleById(IPrescriptionStatusesActions.MarkAsDispensed, actions),
      actionCallback: () => {
        handleMarkAsDispensedAction();
      }
    }
  ];

  return filterActionBindings(actions, actionBindings);
};

export default usePrescriptionActions;
