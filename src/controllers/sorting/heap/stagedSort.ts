import { Item, Stage } from "@/types/store/SortingTypes";

//TODO: Implement staging sort
const swap = (
  toSort: Item[],
  index1: number,
  index2: number,
  stageToSort: Item[]
): Stage => {
  const item1 = toSort[index1];
  const item2 = toSort[index2];
  toSort[index2] = item1;
  toSort[index1] = item2;
  return {
    name: `Swapping ${item1.name} & ${item2.name}`,
    description: `Swapping ${item1.name} with ${item2.name}`,
    followUp: `Move to next element in the heap.`,
    items: [...stageToSort],
  };
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
  compareItems[leftIndex] = {
    ...toSort[leftIndex],
    className: leftClass,
  };
  compareItems[rightIndex] = {
    ...toSort[rightIndex],
    className: rightClass,
  };
  const compareStage = {
    name: `Check parent versus children`,
    description: `Comparing parent(${compareItems[largest].name}) with left(${leftItem.name}) & right(${rightItem.name}) nodes.`,
    followUp: `If current item is less than previous one, swap, otherwise proceed.`,
    items: compareItems,
  };
  stages.push(compareStage);
  if (leftIndex < length && toSort[largest].name < leftItem.name)
    largest = leftIndex;

  if (rightIndex < length && toSort[largest].name < rightItem.name)
    largest = rightIndex;

  // Swap and continue heapifying if root is not largest
  if (largest != currentIndex) {
    const swapStage = swap(toSort, currentIndex, largest);
    stages.push(swapStage);
    heapify(toSort, length, largest, stages);
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
    console.log("Creating max heap");
    heapify(toSort, length, index);
  }
  for (let index = length - 1; index > -1; index--) {
    swap(toSort, index, 0);
    heapify(toSort, index, 0);
  }
  console.log("Finished Sorting", toSort);
  return toSort;
  for (let index = 0; index < length - 1; index++) {
    let index2 = index + 1;
    let minimum = toSort[index];
    let currentMinimumIndex = index;
    let swappingStage: Stage | undefined;
    const originalSortCopy = [...toSort];
    originalSortCopy[index] = {
      ...minimum,
      className: leftClass,
    };
    let foundNewMinimum = false;
    do {
      let newElement = toSort[index2++];
      const preCheckList: Item[] = [...originalSortCopy];
      preCheckList[index2 - 1] = {
        ...newElement,
        className: rightClass,
      };
      preCheckList[currentMinimumIndex] = {
        ...minimum,
        className: parentClass,
      };
      const preCompareStage: Stage = {
        name: `${minimum.name} < ${newElement.name}`,
        description: `Comparing current item(${newElement.name}) with previous item(${minimum.name})`,
        followUp: `If current item is less than previous one, swap, otherwise proceed.`,
        items: preCheckList,
      };
      stages.push(preCompareStage);
      if (minimum.name < newElement.name) continue;
      foundNewMinimum = true;
      currentMinimumIndex = index2 - 1;
      minimum = newElement;
      const postCheckList: Item[] = [...originalSortCopy];
      postCheckList[currentMinimumIndex] = {
        ...minimum,
        className: parentClass,
      };
      const postCompareStage: Stage = {
        name: `Minimum -> ${minimum.name}`,
        description: `Found new minimum value`,
        followUp: `Keep checking`,
        items: postCheckList,
      };
      stages.push(postCompareStage);
    } while (index2 < length);
    if (!foundNewMinimum) continue;
    let previousMinimum = toSort[index];
    toSort[index] = minimum;
    toSort[currentMinimumIndex] = previousMinimum;

    const swapList: Item[] = [...toSort];
    swapList[index] = {
      ...minimum,
      className: parentClass,
    };
    if (index + 1 !== length)
      swapList[index + 1] = {
        ...swapList[index + 1],
        className: leftClass,
      };
    swappingStage = {
      name: `Moving ${minimum.name}`,
      description: `Moving current minimum to #${index} position.`,
      followUp: `Proceed to the next number`,
      items: swapList,
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

export default stagedSortArray;
