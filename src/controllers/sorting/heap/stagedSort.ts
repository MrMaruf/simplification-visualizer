import { Item, Stage } from "@/types/store/SortingTypes";

//TODO: Implement staging sort
const swap = (toSort: Item[], index1: number, index2: number):Stage => {
  const item1 = toSort[index1];
  const item2 = toSort[index2];
  toSort[index2] = item1;
  toSort[index1] = item2;
  return {
    name: `Swapping ${item1.name} & ${item2.name}`,
    description: `Swapping ${item1.name} with ${item2.name}`,
    followUp: `Move to next element in the heap.`,
    items: [...toSort],
  };
};

const heapify = (
  toSort: Item[],
  length: number,
  currentIndex: number,
  stages: Stage[] = [],
  classes:
) => {
  let largest = currentIndex;
  const left = 2 * currentIndex + 1;
  const right = 2 * currentIndex + 2;
  const leftItem = toSort[left];
  const rightItem = toSort[right];
  const compareItems = [...toSort]
  compareItems[largest] = {
    ...toSort[largest],

  }
  const compareStage = {

  }
  if (left < length && toSort[largest].name < leftItem.name) largest = left;

  if (right < length && toSort[largest].name < rightItem.name) largest = right;

  // Swap and continue heapifying if root is not largest
  if (largest != currentIndex) {
    const swapStage = swap(toSort, currentIndex, largest)
    stages.push(swapStage);
    heapify(toSort, length, largest, stages);
  }
};

const stagedSortArray = (
  parent: string,
  right: string,
  left: string,
  toSort: Item[]
) => {
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
      className: left,
    };
    let foundNewMinimum = false;
    do {
      let newElement = toSort[index2++];
      const preCheckList: Item[] = [...originalSortCopy];
      preCheckList[index2 - 1] = {
        ...newElement,
        className: right,
      };
      preCheckList[currentMinimumIndex] = {
        ...minimum,
        className: parent,
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
        className: parent,
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
      className: parent,
    };
    if (index + 1 !== length)
      swapList[index + 1] = {
        ...swapList[index + 1],
        className: left,
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
