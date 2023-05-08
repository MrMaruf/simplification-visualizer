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

export const stagedSortArray = (
  comparingItemClass: string,
  comparableItemClass: string,
  array: Item[]
) => {
  const stages: Stage[] = [];
  const length = array.length;
  for (let index = 1; index < length; index++) {
    let index2 = index;
    let swappingStage: Stage | undefined;
    const originalArrayCopy = [...array];
    do {
      let elementLeft: Item = array[index2 - 1];
      let elementRight: Item = array[index2];
      const visualArray: Item[] = [...originalArrayCopy];
      visualArray[index2 - 1] = {
        ...elementLeft,
        className: comparableItemClass,
      };
      visualArray[index] = { ...elementRight, className: comparingItemClass };
      const preCompareStage: Stage = {
        name: `Comparing ${elementRight.name} < ${elementLeft.name}`,
        description: `Comparing current item(${elementRight.name}) with previous item(${elementLeft.name})`,
        followUp: `If current item is less than previous one, swap, otherwise proceed.`,
        items: visualArray,
      };
      stages.push(preCompareStage);
      if (elementRight.name > elementLeft.name) break;
      array[index2] = elementLeft;
      array[index2 - 1] = elementRight;
      // const postSwapArray = [...array];
      // postSwapArray[index - 1] = {
      //   ...elementRight,
      //   className: comparingItemClass,
      // };
      swappingStage = {
        name: `Moving ${elementRight.name}`,
        description: `Found smaller value. Moving ${elementRight.name} in front of it.`,
        followUp: `Proceed to the next number`,
        items: [...array],
      };
      index2--;
    } while (index2 > 0);
    if (swappingStage) stages.push(swappingStage);
  } // add last stage
  const lastStage: Stage = {
    name: `Finished`,
    description: `Sorting is done`,
    followUp: `None...`,
    items: array,
  };
  stages.push(lastStage);
  return stages;
};
