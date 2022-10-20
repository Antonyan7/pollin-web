import { IPatientHighlightDetailsResponse } from '@axios/patientEmr/managerPatientEmrTypes';
import { PatientLineItemsModalProps } from '@components/Patients/PatientModals/PatientLineItemsModal';
import { PatientMedicationsModalProps } from '@components/Patients/PatientModals/PatientMedicationsModal';
import { PatientPartnersModalProps } from '@components/Patients/PatientModals/PatientPartnersModal';
import { ModalName } from 'types/modals';
import { IOpenedModal } from 'types/reduxTypes/viewsStateTypes';

const getModalParamsFromPatientHighlightDetails = (
  patientHighlightDetails: IPatientHighlightDetailsResponse
): IOpenedModal<PatientPartnersModalProps | PatientMedicationsModalProps | PatientLineItemsModalProps> => {
  const { title, highlightDetails } = patientHighlightDetails;
  const highlightDetailsTypes = highlightDetails.map(({ type }) => type);

  if (highlightDetailsTypes.includes('Partner')) {
    return {
      name: ModalName.PatientPartnersModal,
      props: {
        title,
        data: highlightDetails.reduce<PatientPartnersModalProps['data']>((modalData, highlightDetail) => {
          switch (highlightDetail.type) {
            case 'Partner': {
              const { title: fieldTitle, partner } = highlightDetail;

              return {
                ...modalData,
                [fieldTitle]: partner
              };
            }

            case 'LineItems': {
              const { title: fieldTitle, lineItems } = highlightDetail;

              return {
                ...modalData,
                [fieldTitle]: lineItems
              };
            }

            default:
              return modalData;
          }
        }, {})
      }
    };
  }

  if (highlightDetailsTypes.includes('Medications')) {
    return {
      name: ModalName.PatientMedicationsModal,
      props: {
        title,
        data: highlightDetails.reduce<PatientMedicationsModalProps['data']>((modalData, highlightDetail) => {
          switch (highlightDetail.type) {
            case 'Medications': {
              const { title: fieldTitle, medications } = highlightDetail;

              return {
                ...modalData,
                [fieldTitle]: medications
              };
            }

            case 'LineItems': {
              const { title: fieldTitle, lineItems } = highlightDetail;

              return {
                ...modalData,
                [fieldTitle]: lineItems
              };
            }

            default:
              return modalData;
          }
        }, {})
      }
    };
  }

  return {
    name: ModalName.PatientLineItemsModal,
    props: {
      title,
      data: highlightDetails.reduce<PatientLineItemsModalProps['data']>((modalData, highlightDetail) => {
        switch (highlightDetail.type) {
          case 'LineItems': {
            const { title: fieldTitle, lineItems } = highlightDetail;

            return {
              ...modalData,
              [fieldTitle]: lineItems
            };
          }

          default:
            return modalData;
        }
      }, {})
    }
  };
};

const patientEmrHelpers = {
  getModalParamsFromPatientHighlightDetails
};

export default patientEmrHelpers;
