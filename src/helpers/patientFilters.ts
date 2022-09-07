import { GroupedByTitlesProps, IFilterCategory } from '@axios/managerPatientEmr';

const reformatedFilterResults = (filterCategory: IFilterCategory[]) =>
  filterCategory.reduce((initialGroupedTitles: GroupedByTitlesProps[], nextGroupedTitles: IFilterCategory) => {
    const titleName = nextGroupedTitles.title;
    const groupedTitleRows: GroupedByTitlesProps[] = [];

    nextGroupedTitles.options.forEach((option) => {
      groupedTitleRows.push({
        options: {
          ...option,
          titleName
        }
      });
    });
    initialGroupedTitles = initialGroupedTitles.concat(groupedTitleRows);

    return initialGroupedTitles;
  }, []);

const filterByUniqueCategory = (filterResult: GroupedByTitlesProps[]) => {
  filterResult = filterResult.reduce(
    (initialFilteredResults: GroupedByTitlesProps[], nextFilteredResult: GroupedByTitlesProps) => {
      const isTitleNamesEqual = !initialFilteredResults.some((filteredResult: GroupedByTitlesProps, index: number) => {
        if (nextFilteredResult.options.titleName === filteredResult.options.titleName) {
          const filteredIndex = initialFilteredResults.indexOf(filteredResult);

          if (filteredIndex !== -1) {
            initialFilteredResults[index] = nextFilteredResult;
          }
        }

        return nextFilteredResult.options.titleName === filteredResult.options.titleName;
      });

      if (isTitleNamesEqual) {
        initialFilteredResults.push(nextFilteredResult);
      }

      return initialFilteredResults;
    },
    []
  );

  return filterResult;
};

export { filterByUniqueCategory, reformatedFilterResults };
