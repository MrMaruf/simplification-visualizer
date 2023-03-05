import ContextProviderNotFoundError from "@/errors/ContextProviderNotFoundError";
import React from "react";

import contextReducer, { Action, generateArray, State } from "./SortingReducer";

type Dispatch = (action: Action) => void;

type ContextProviderProps = { children: JSX.Element };
type StateContextType = { state: State; dispatch: Dispatch };
const SortingStateContext = React.createContext<StateContextType | undefined>(
  undefined
);

function SortingStateProvider({ children }: ContextProviderProps) {
  const initialState: State = {
    sortingType: "realtime",
    sortingStages: [],
    currentStage: 0,
    items: generateArray(10),
    stagingSpeed: 300,
  };
  const [state, dispatch] = React.useReducer(contextReducer, initialState);

  const value = { state, dispatch };
  return (
    <SortingStateContext.Provider value={value}>
      {children}
    </SortingStateContext.Provider>
  );
}

function useSortingState() {
  const context = React.useContext(SortingStateContext);
  if (context === undefined) {
    throw new ContextProviderNotFoundError(
      "MessagesStateContext",
      "MessagesStateProvider"
    );
  }
  return context;
}

export { SortingStateProvider, useSortingState };
