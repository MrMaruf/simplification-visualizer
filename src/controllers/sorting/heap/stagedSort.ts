import MaxHeapBinaryTree from "@/models/MaxHeapBinaryTree";
import { Item, Stage } from "@/types/store/SortingTypes";

//TODO: Implement staging sort
const swap = (toSort: Item[], index1: number, index2: number) => {
  const item1 = toSort[index1];
  const item2 = toSort[index2];
  toSort[index2] = item1;
  toSort[index1] = item2;
};

const heapify = (
  toSort: Item[],
  length: number,
  currentIndex: number,
  stages: Stage[] = [],
  parentClass: string,
  rightClass: string,
  leftClass: string
) => {
  let largest = currentIndex;
  const leftIndex = 2 * currentIndex + 1;
  const rightIndex = 2 * currentIndex + 2;
  const leftItem = toSort[leftIndex];
  const rightItem = toSort[rightIndex];
  const compareItems = [...toSort];
  compareItems[largest] = {
    ...toSort[largest],
    className: parentClass,
  };
  let name = "Check parent < children";
  let description = `Comparing parent(${compareItems[currentIndex].name})`;
  if (leftIndex < length) {
    compareItems[leftIndex] = {
      ...toSort[leftIndex],
      className: leftClass,
    };
    description += `with left(${leftItem.name})`;
    if (toSort[largest].name < leftItem.name) largest = leftIndex;
  }
  if (rightIndex < length) {
    if (leftItem) description += ` & `;
    compareItems[rightIndex] = {
      ...toSort[rightIndex],
      className: rightClass,
    };
    description += `right(${rightItem.name})`;

    if (toSort[largest].name < rightItem.name) largest = rightIndex;
  }
  description += " node(s).";
  if (!leftItem && !rightItem) description = "No children found";
  const compareStage = {
    name: name,
    description,
    followUp: `If current item is less than previous one, swap, otherwise proceed.`,
    items: compareItems,
  };
  stages.push(compareStage);
  // Swap and continue heapifying if root is not largest
  if (largest != currentIndex) {
    swap(toSort, currentIndex, largest);
    const stageToSort = [...compareItems];
    swap(stageToSort, currentIndex, largest);
    const swapStage = {
      name: `Swapping ${compareItems[currentIndex].name} & ${compareItems[largest].name}`,
      description: `Swapping ${compareItems[currentIndex].name} with ${compareItems[largest].name}`,
      followUp: `Move to next element in the heap.`,
      items: [...stageToSort],
    };
    stages.push(swapStage);
    heapify(
      toSort,
      length,
      largest,
      stages,
      parentClass,
      rightClass,
      leftClass
    );
  }
};

const stagedSortArray = (
  parentClass: string,
  rightClass: string,
  leftClass: string,
  toSort: Item[]
): Stage[] => {
  const stages: Stage[] = [];
  const length = toSort.length;
  for (let index = length / 2; index > -1; index--) {
    heapify(toSort, length, index, stages, parentClass, rightClass, leftClass);
  }
  const tree = new MaxHeapBinaryTree();
  const values = toSort.map((value) => value.name);
  tree.arrayToTree([...values]);
  const maxHeapFinishedStage: Stage = {
    name: `Built max heap`,
    description: `Finished max heap building`,
    followUp: `Start sorting.`,
    items: [...toSort],
    binaryTree: tree,
  };
  stages.push(maxHeapFinishedStage);
  for (let index = length - 1; index > -1; index--) {
    const stageToSort = [...toSort];
    stageToSort[index] = { ...stageToSort[index], className: parentClass };
    stageToSort[0] = { ...stageToSort[0], className: parentClass };
    swap(stageToSort, index, 0);
    const swapStage = {
      name: `Swapping index(${index}) with root`,
      description: `Swapping ${toSort[index].name} with ${toSort[0].name}`,
      followUp: `Move to next element in the heap.`,
      items: [...stageToSort],
    };
    swap(toSort, index, 0);

    stages.push(swapStage);
    heapify(toSort, index, 0, stages, parentClass, rightClass, leftClass);
  }
  const lastStage: Stage = {
    name: `Finished`,
    description: `Sorting is done`,
    followUp: `None...`,
    items: toSort,
  };
  stages.push(lastStage);
  return stages;
};

export default stagedSortArray;
