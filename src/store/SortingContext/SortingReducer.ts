import UnhandledActionTypeError from "@/errors/UnhandeledActionTypeError";
import SortingType from "@/types/SortType";
import { Items } from "@/types/store/SortingTypes";

export type Action =
  | { type: "shuffle array" }
  | { type: "generate array"; length: number }
  | { type: "change sorting type"; newType: SortingType }
  | { type: "change sorting speed"; newSpeed: number }
  | { type: "set items"; items: Items }
  | { type: "set stages"; stages: Items[] }
  | { type: "move stage"; newStage?: number; onEnd?: () => void };

export type State = {
  sortingType: SortingType;
  items: Items;
  sortingStages: Items[];
  stagingSpeed: number;
  currentStage: number;
};

export const generateArray = (length: number) =>
  Array.from(new Array(length), (x, i) => i + 1).map((value) => {
    return {
      name: value,
    };
  });

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
export default function contextReducer(state: State, action: Action): State {
  switch (action.type) {
    case "shuffle array": {
      const { items } = state;
      const shuffledItems = shuffleArray([...items]);
      return {
        ...state,
        items: shuffledItems,
        currentStage: 0,
        sortingStages: [],
      };
    }
    case "generate array": {
      const { length } = action;
      return {
        ...state,
        items: generateArray(length),
      };
    }
    case "change sorting type": {
      return {
        ...state,
        sortingType: action.newType,
      };
    }
    case "change sorting speed": {
      return {
        ...state,
        stagingSpeed: action.newSpeed,
      };
    }
    case "set items": {
      return {
        ...state,
        currentStage: 0,
        items: action.items,
      };
    }
    case "set stages": {
      return {
        ...state,
        currentStage: 0,
        sortingStages: action.stages,
      };
    }
    case "move stage": {
      const newStage = action.newStage ?? state.currentStage + 1;
      const { onEnd } = action;
      if (newStage === state.sortingStages.length && onEnd) {
        onEnd();
      }
      const selectedStage = state.sortingStages[newStage - 1];
      return { ...state, currentStage: newStage, items: selectedStage };
    }
    default: {
      throw new UnhandledActionTypeError(action);
    }
  }
}
