import { ITestResultItem, TestResultsDetails } from 'types/reduxTypes/resultsStateTypes';

const extractFormDataFromTestResultsDetails = (testResultsDetails: TestResultsDetails[]) => {
  const formFieldNames: string[] = [];
  const formDefaultValues = testResultsDetails.reduce((defaultValues, currentTestDetail) => {
    const formFieldName = `data_${currentTestDetail.id}`;

    formFieldNames.push(formFieldName);

    return {
      ...defaultValues,
      [formFieldName]: {
        id: currentTestDetail.id,
        items: currentTestDetail.items?.map((item: ITestResultItem) => ({
          id: item.id,
          resultType: item.resultType,
          dateReceived: item.dateReceived,
          result: item?.result ?? ''
        })),
        comment: '',
        ...(currentTestDetail.isAttachmentRequired && {
          attachments: currentTestDetail?.attachments ?? []
        })
      }
    };
  }, {});

  return {
    formDefaultFieldValues: formDefaultValues,
    formDefaultFieldsNames: formFieldNames
  };
};

export default extractFormDataFromTestResultsDetails;
