import TreeNode from "@/models/TreeNode";
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
function arrayToMaxHeap(arr: number[], i = 0): TreeNode | null {
  if (i >= arr.length) {
    return null;
  }

  const root = new TreeNode(arr[i]);
  root.left = arrayToMaxHeap(arr, 2 * i + 1);
  root.right = arrayToMaxHeap(arr, 2 * i + 2);

  return root;
}
const sortArray = (toSort: Item[]) => {
  const length = toSort.length;
  for (let index = length / 2; index > -1; index--) {
    heapify(toSort, length, index);
  }
  console.log("Max heap array: ", [...toSort]);
  const values = toSort.map((value) => value.name);
  const root = arrayToMaxHeap(values);
  console.log(root?.toString());
  const maxHeap = [...toSort];
  const countedElements: Item[] = [];
  for (let index = 0; index < maxHeap.length; index++) {
    const element = maxHeap[index];
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    const leftItem = toSort[left];
    const rightItem = toSort[right];
    if (element) {
      // console.log("Root :", element.name);
      countedElements.push(element);
    }
    if (leftItem) {
      // console.log("Left :", leftItem.name);
      countedElements.push(leftItem);
    }
    if (rightItem) {
      // console.log("Right :", rightItem.name);
      countedElements.push(rightItem);
    }
  }
  for (let index = length - 1; index > -1; index--) {
    swap(toSort, index, 0);
    heapify(toSort, index, 0);
  }
  return toSort;
};
export default sortArray;
