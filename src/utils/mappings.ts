interface IStatusMapping {
  title: string;
  status: string;
}

export const getStatusTitle = (variations: IStatusMapping[], statusId: string): string =>
  variations.find((variation) => variation.status === statusId)?.title ?? statusId;
