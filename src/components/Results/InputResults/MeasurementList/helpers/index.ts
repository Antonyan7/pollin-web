import { ITestResultItem, TestResultsDetails } from 'types/reduxTypes/resultsStateTypes';

const extractFormDataFromTestResultsDetails = (testResultsDetails: TestResultsDetails[]) => {
  const formFieldNames: string[] = [];
  const formDefaultValues = testResultsDetails.reduce((defaultValues, currentTestDetails) => {
    const formFieldName = `data_${currentTestDetails.id}`;

    formFieldNames.push(formFieldName);

    return {
      ...defaultValues,
      [formFieldName]: {
        id: currentTestDetails.id,
        items: currentTestDetails.items?.map((item: ITestResultItem) => ({
          id: item.id,
          resultType: item.resultType,
          dateReceived: item?.dateReceived ? item?.dateReceived : null,
          result: item?.result ?? ''
        })),
        comment: currentTestDetails.comment ?? '',
        attachments: currentTestDetails?.attachments ?? []
      }
    };
  }, {});

  return {
    formDefaultFieldValues: formDefaultValues,
    formDefaultFieldsNames: formFieldNames
  };
};

export default extractFormDataFromTestResultsDetails;
