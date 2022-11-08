import { IProfileTestResults, ITestResultHistory } from '@axios/patientEmr/managerPatientEmrTypes';
import { PatientProfileOverview } from 'types/reduxTypes/patient-emrStateTypes';

type TransformDataType = PatientProfileOverview | ITestResultHistory | IProfileTestResults['patient'];

interface ITransformedItem {
  title: string;
  listItems: {
    title: string;
    subItems: [];
  }[];
}

const transformDataForListLayout = (data: TransformDataType) => {
  // Omit widgetTitle
  const items = Object.values(data)[1];

  return items?.map((item: ITransformedItem[]) => {
    const [title, listItems] = Object.values(item);

    const subItems =
      Array.isArray(listItems) &&
      listItems?.map((subItem: { title: string; id?: string }) => {
        const [subItemTitle, id] = Object.values(subItem);

        return {
          title: subItemTitle,
          ...((id && { id }) as Record<string, string>)
        };
      });

    return {
      title,
      subItems
    };
  });
};

export default transformDataForListLayout;
