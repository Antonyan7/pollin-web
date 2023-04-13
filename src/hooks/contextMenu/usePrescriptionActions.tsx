import { RefObject, useCallback } from 'react';
import { IPrescriptionStatusesActions } from '@axios/patientEmr/managerPatientEmrTypes';
import { dispatch } from '@redux/hooks';
import { patientsMiddleware } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { filterActionBindings, getActionTitleById } from 'helpers/contextMenu';
import { useRouter } from 'next/router';
import { ModalName } from 'types/modals';
import { ContextMenuAction } from 'types/reduxTypes/resultsStateTypes';

const usePrescriptionActions = (
  downloadRef: RefObject<HTMLAnchorElement>,
  prescriptionId: string,
  actions: ContextMenuAction[] = []
) => {
  const router = useRouter();
  const patientId = router.query.id as string;

  const handleDownLoadAction = useCallback(async () => {
    const blob = await dispatch(patientsMiddleware.downloadPatientPrescription(prescriptionId));

    if (blob && downloadRef.current) {
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));

      downloadRef.current.href = url;
      downloadRef.current.download = `prescription.pdf`;
      downloadRef.current.click();
      window.URL.revokeObjectURL(url);
    }
  }, [prescriptionId, downloadRef]);

  const handleMarkAsDispensedAction = useCallback(() => {
    dispatch(patientsMiddleware.markPatientPrescriptionDispensed(prescriptionId, patientId));
  }, [prescriptionId, patientId]);

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
