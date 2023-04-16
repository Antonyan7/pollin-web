import { useCallback, useMemo } from 'react';
import { SpecimenActionType } from '@axios/results/resultsManagerTypes';
import { dispatch } from '@redux/hooks';
import { resultsMiddleware } from '@redux/slices/results';
import { viewsMiddleware } from '@redux/slices/views';
import { CypressIds } from 'constants/cypressIds';
import { filterActionBindings, getActionTitleById } from 'helpers/contextMenu';
import { useRouter } from 'next/router';
import { ModalName } from 'types/modals';
import { ContextMenuAction } from 'types/reduxTypes/resultsStateTypes';

import { ISpecimenRowProps } from './types';

const useSpecimenActions = (rows: ISpecimenRowProps[], actions: ContextMenuAction[] = [], isBulk = false) => {
  const ids = useMemo(() => rows.map((row) => row.id), [rows]);
  const identifiers = useMemo(() => rows.map((row) => row.identifier), [rows]);

  const router = useRouter();
  const handleMoveToTransport = useCallback(() => {
    dispatch(resultsMiddleware.resetLastCreatedTransportFolderId());
    dispatch(
      viewsMiddleware.openModal({
        name: ModalName.AddNewExistingTransportModal,
        props: { specimenIds: ids, selectedIdentifiers: identifiers }
      })
    );
  }, [ids, identifiers]);

  const handleMoveToAnotherTransport = useCallback(() => {
    dispatch(
      viewsMiddleware.openModal({
        name: ModalName.MoveToAnotherTransport,
        props: { specimenIds: ids, selectedIdentifiers: identifiers }
      })
    );
  }, [ids, identifiers]);

  const handleMoveToInHouse = useCallback(() => {
    dispatch(resultsMiddleware.applyMoveToInHouse(ids, identifiers));
  }, [ids, identifiers]);

  const navigateToTestResultsPage = () => {
    // it's not bulk action, so we'll have only one item in it
    const { id: specimenId, identifier: specimenIdentifier } = rows[0];

    const inHouseTestResultsPagePath = `/clinic-test-results/in-house-tests/input-results/${specimenId}?specimenId=${specimenIdentifier}`;

    router.push(inHouseTestResultsPagePath);
  };

  const handleMarkAsAction = useCallback(
    (actionType: string) => {
      dispatch(
        viewsMiddleware.openModal({
          name: ModalName.SelectMachineModal,
          props: { specimens: [...rows], actionType }
        })
      );
    },
    [rows]
  );

  const moveSpecimenToAllTests = useCallback(() => {
    dispatch(resultsMiddleware.applyMoveToAllTests(ids));
  }, [ids]);

  const actionBindings = [
    {
      id: SpecimenActionType.MoveToTransport,
      title: getActionTitleById(SpecimenActionType.MoveToTransport, actions),
      actionCallback: () => {
        handleMoveToTransport();
      },
      dataCy: CypressIds.PAGE_SPECIMEN_TRACKING_ALL_TEST_NEW_TRANSPORT_BUTTON
    },
    {
      id: SpecimenActionType.MoveToAnotherTransport,
      title: getActionTitleById(SpecimenActionType.MoveToAnotherTransport, actions),
      actionCallback: () => {
        handleMoveToAnotherTransport();
      }
    },
    {
      id: SpecimenActionType.InProgress,
      title: getActionTitleById(SpecimenActionType.InProgress, actions),
      actionCallback: () => {
        handleMarkAsAction(SpecimenActionType.InProgress);
      }
    },
    {
      id: SpecimenActionType.Recollect,
      title: getActionTitleById(SpecimenActionType.Recollect, actions),
      actionCallback: () => {
        handleMarkAsAction(SpecimenActionType.Recollect);
      }
    },
    {
      id: SpecimenActionType.Retest,
      title: getActionTitleById(SpecimenActionType.Retest, actions),
      actionCallback: () => {
        handleMarkAsAction(SpecimenActionType.Retest);
      }
    },
    {
      id: SpecimenActionType.MoveInHouse,
      title: getActionTitleById(SpecimenActionType.MoveInHouse, actions),
      actionCallback: handleMoveToInHouse,
      dataCy: CypressIds.PAGE_SPECIMEN_TRACKING_ALL_TEST_IN_HOUSE_BUTTON
    },
    {
      id: SpecimenActionType.MoveToAllTests,
      title: getActionTitleById(SpecimenActionType.MoveToAllTests, actions),
      actionCallback: moveSpecimenToAllTests
    }
  ];

  if (!isBulk) {
    actionBindings.push(
      ...[
        {
          id: SpecimenActionType.InputTestResults,
          title: getActionTitleById(SpecimenActionType.InputTestResults, actions),
          actionCallback: navigateToTestResultsPage
        }
      ]
    );
  }

  return filterActionBindings(actions, actionBindings);
};

export default useSpecimenActions;
