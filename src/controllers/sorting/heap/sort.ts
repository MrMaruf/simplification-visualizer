import { Item } from "@/types/store/SortingTypes";
const heapify = (toSort: Item[], length: number, currentIndex: number) => {
  let largest = currentIndex;
  const left = 2 * currentIndex + 1;
  const right = 2 * currentIndex + 2;
  const leftItem = toSort[left];
  const rightItem = toSort[right];
  if (left < length && toSort[largest].name < leftItem.name) largest = left;

  if (right < length && toSort[largest].name < rightItem.name) largest = right;

  // Swap and continue heapifying if root is not largest
  if (largest != currentIndex) {
    swap(toSort, currentIndex, largest);
    heapify(toSort, length, largest);
  }
};
const swap = (toSort: Item[], index1: number, index2: number) => {
  const item1 = toSort[index1];
  const item2 = toSort[index2];
  toSort[index2] = item1;
  toSort[index1] = item2;
};
const sortArray = (toSort: Item[]) => {
  const length = toSort.length;
  for (let index = length / 2; index > -1; index--) {
    heapify(toSort, length, index);
  }
  for (let index = length - 1; index > -1; index--) {
    swap(toSort, index, 0);
    heapify(toSort, index, 0);
  }
  return toSort;
};
export default sortArray