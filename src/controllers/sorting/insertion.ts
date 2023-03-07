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
  toSort: Item[]
) => {
  const stages: Stage[] = [];
  const length = toSort.length;
  for (let index = 1; index < length; index++) {
    let index2 = index;
    do {
      let elementLeft = toSort[index2 - 1];
      let elementRight = toSort[index2];
      if (elementLeft.name < elementRight.name) break;
      const stage: Stage = {
        name: "Swapping",
        description: `Swapping ${elementRight} with ${elementLeft}`,
        followUp: `Proceed to the next number`,
        items: [...toSort],
      };
      stages.push(stage);
      toSort[index2] = elementLeft;
      toSort[index2 - 1] = elementRight;
      index2--;
    } while (index2 > 0);
  }
  const stage: Stage = {
    name: "Swapping",
    description: `Swapping last element`,
    followUp: `Proceed to the next number`,
    items: [...toSort],
  };
  stages.push(stage); // add last stage
  return stages;
};
