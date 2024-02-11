import { createContext, useReducer } from "react"

import { BingosState } from "./bingo-def"

export const BingosContext = createContext({} as BingosState)
export const BingosDispatchContext = createContext(null as any)

export function BingoProvider({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const [bingo, dispatch] = useReducer(bingoReducer, initialBingoState)

  return (
    <BingosContext.Provider value={bingo}>
      <BingosDispatchContext.Provider value={dispatch}>
        {children}
      </BingosDispatchContext.Provider>
    </BingosContext.Provider>
  )
}

function bingoReducer(state: BingosState, action: any) {
  switch (action.type) {
    case "ADD_BINGO":
      return { ...state, bingos: [...state.bingos, action.payload] }
    case "SELECT_BINGO":
      return { ...state, selectedBingo: action.payload }
    default:
      return state
  }
}

const initialBingoState = {
  bingos: [{ id: 1, title: "title1", tags: ["tag1"] }]
} as BingosState
