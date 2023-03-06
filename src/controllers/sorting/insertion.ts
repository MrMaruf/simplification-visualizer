import { Item } from "@/types/store/SortingTypes";

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

export const stagedSortArray = (toSort: Item[]) => {
  const stages: Item[][] = [];
  const length = toSort.length;
  for (let index = 1; index < length; index++) {
    let index2 = index;
    do {
      let elementLeft = toSort[index2 - 1];
      let elementRight = toSort[index2];
      if (elementLeft.name < elementRight.name) break;
      stages.push([...toSort]);
      toSort[index2] = elementLeft;
      toSort[index2 - 1] = elementRight;
      index2--;
    } while (index2 > 0);
  }
  stages.push([...toSort]); // add last stage
  return stages;
};
