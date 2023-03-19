import { Item, Stage } from "@/types/store/SortingTypes";

export const sortArray = (toSort: Item[]) => {
  const length = toSort.length;
  for (let index = 0; index < length - 1; index++) {
    let index2 = index + 1;
    let minimum = toSort[index];
    let currentMinimumIndex = index;
    do {
      let newElement = toSort[index2++];
      if (minimum.name < newElement.name) continue;
      currentMinimumIndex = index2 - 1;
      minimum = newElement;
    } while (index2 < length);
    let previousMinimum = toSort[index];
    toSort[index] = minimum;
    toSort[currentMinimumIndex] = previousMinimum;
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

  for (let index = 0; index < length - 1; index++) {
    let index2 = index + 1;
    let minimum = toSort[index];
    let currentMinimumIndex = index;
    let swappingStage: Stage | undefined;
    const originalSortCopy = [...toSort];
    let foundNewMinimum = false;
    do {
      let newElement = toSort[index2++];
      const toSortCopy: Item[] = [...originalSortCopy];
      toSortCopy[index2 - 1] = {
        ...newElement,
        className: comparableItemClass,
      };
      toSortCopy[index] = { ...minimum, className: comparingItemClass };
      const preCompareStage: Stage = {
        name: `Comparing ${minimum.name} < ${newElement.name}`,
        description: `Comparing current item(${newElement.name}) with previous item(${minimum.name})`,
        followUp: `If current item is less than previous one, swap, otherwise proceed.`,
        items: toSortCopy,
      };
      stages.push(preCompareStage);
      if (minimum.name < newElement.name) continue;
      foundNewMinimum = true;
      currentMinimumIndex = index2 - 1;
      minimum = newElement;
    } while (index2 < length);
    if (!foundNewMinimum) continue;
    let previousMinimum = toSort[index];
    toSort[index] = minimum;
    toSort[currentMinimumIndex] = previousMinimum;
    swappingStage = {
      name: `Moving ${minimum.name} to the #${index} position`,
      description: `New minimum found! Moving to the #${index} position.`,
      followUp: `Proceed to the next number`,
      items: [...toSort],
    };
    stages.push(swappingStage);
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
