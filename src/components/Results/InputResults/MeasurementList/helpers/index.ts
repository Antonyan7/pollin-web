import { ITestResultItem, TestResultsDetails } from 'types/reduxTypes/resultsStateTypes';

const extractFormDataFromTestResultsDetails = (testResultsDetails: TestResultsDetails[]) => {
  const formFieldNames: string[] = [];
  const formDefaultValues = testResultsDetails.reduce((defaultValues, currentValue) => {
    const formFieldName = `data_${currentValue.id}`;

    formFieldNames.push(formFieldName);

    return {
      ...defaultValues,
      [formFieldName]: currentValue.items?.map((item: ITestResultItem) => ({
        resultType: item.resultType,
        dateReceived: item.dateReceived,
        result: item.result
      }))
    };
  }, {});

  return {
    formDefaultFieldValues: formDefaultValues,
    formDefaultFieldsNames: formFieldNames
  };
};

export default extractFormDataFromTestResultsDetails;
