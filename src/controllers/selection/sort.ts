import { Item } from "@/types/store/SortingTypes";

const sortArray = (toSort: Item[]) => {
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

export default sortArray;
