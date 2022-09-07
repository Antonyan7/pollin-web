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

export { reformatedFilterResults };
