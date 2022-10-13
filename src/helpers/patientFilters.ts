import { GroupedByTitlesProps } from '@axios/patientEmr/managerPatientEmr';
import { IFilterCategory } from 'types/reduxTypes/patient-emr';

const reformattedFilterResults = (filterCategory: IFilterCategory[]) =>
  filterCategory.reduce((initialGroupedTitles: GroupedByTitlesProps[], nextGroupedTitles: IFilterCategory) => {
    const { type } = nextGroupedTitles;
    const groupedTitleRows: GroupedByTitlesProps[] = [];

    nextGroupedTitles.options.forEach((option) => {
      groupedTitleRows.push({
        options: {
          ...option,
          type
        }
      });
    });
    initialGroupedTitles = initialGroupedTitles.concat(groupedTitleRows);

    return initialGroupedTitles;
  }, []);

const filterByUniqueCategory = (filterResult: GroupedByTitlesProps[]) => {
  filterResult = filterResult.reduce(
    (initialFilteredResults: GroupedByTitlesProps[], nextFilteredResult: GroupedByTitlesProps) => {
      const istypesEqual = !initialFilteredResults.some((filteredResult: GroupedByTitlesProps, index: number) => {
        if (nextFilteredResult.options.type === filteredResult.options.type) {
          const filteredIndex = initialFilteredResults.indexOf(filteredResult);

          if (filteredIndex !== -1) {
            initialFilteredResults[index] = nextFilteredResult;
          }
        }

        return nextFilteredResult.options.type === filteredResult.options.type;
      });

      if (istypesEqual) {
        return [...initialFilteredResults, nextFilteredResult];
      }

      return initialFilteredResults;
    },
    []
  );

  return filterResult;
};

export { filterByUniqueCategory, reformattedFilterResults };
