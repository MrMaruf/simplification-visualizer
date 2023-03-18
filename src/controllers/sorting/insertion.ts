import { Item, Stage } from "@/types/store/SortingTypes";

export const sortArray = (toSort: Item[]) => {
  const length = toSort.length;
  for (let index = 1; index < length; index++) {
    let index2 = index;
    do {
      let elementLeft = toSort[index2 - 1];
      let elementRight = toSort[index2];
      if (elementLeft.name < elementRight.name) break;
      toSort[index2] = elementLeft;
      toSort[index2 - 1] = elementRight;
      index2--;
    } while (index2 > 0);
  }
  return toSort;
};
//TODO: Find a way to optimize the method
export const stagedSortArray = (
  comparingItemClass: string,
  comparableItemClass: string,
  toSort: Item[]
) => {
  const stages: Stage[] = [];
  const length = toSort.length;
  for (let index = 1; index < length; index++) {
    let index2 = index;
    let swappingStage: Stage | undefined;
    const originalSortCopy = [...toSort];
    do {
      let elementLeft: Item = toSort[index2 - 1];
      let elementRight: Item = toSort[index2];
      const toSortCopy: Item[] = [...originalSortCopy];
      toSortCopy[index2 - 1] = {
        ...elementLeft,
        className: comparableItemClass,
      };
      toSortCopy[index] = { ...elementRight, className: comparingItemClass };
      const preCompareStage: Stage = {
        name: `Comparing ${elementRight.name} < ${elementLeft.name}`,
        description: `Comparing current item(${elementRight.name}) with previous item(${elementLeft.name})`,
        followUp: `If current item is less than previous one, swap, otherwise proceed.`,
        items: toSortCopy,
      };
      stages.push(preCompareStage);
      if (elementRight.name > elementLeft.name) break;
      toSort[index2] = elementLeft;
      toSort[index2 - 1] = elementRight;
      swappingStage = {
        name: `Swapping ${elementRight.name} & ${elementLeft.name}`,
        description: `Swapping ${elementRight.name} with ${elementLeft.name}`,
        followUp: `Proceed to the next number`,
        items: [...toSort],
      };
      index2--;
    } while (index2 > 0);
    if (swappingStage) stages.push(swappingStage);
  } // add last stage
  const lastStage: Stage = {
    name: `Finished`,
    description: `Sorting is done`,
    followUp: `None...`,
    items: toSort,
  };
  stages.push(lastStage);
  return stages;
};
