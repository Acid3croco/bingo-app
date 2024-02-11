import { createContext, useReducer } from "react"

import { toast } from "sonner"
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

    case "ADD_TAG":
      let bingoIndex = state.bingos.findIndex(
        (bingo) => bingo.id === action.payload.id
      )
      if (bingoIndex === -1) return { ...state }

      let tags = state.bingos[bingoIndex].tags
      if (tags.includes(action.payload.tag)) return { ...state }

      tags.push(action.payload.tag)
      state.selectedBingo = state.bingos[bingoIndex]
      return { ...state }

    case "REMOVE_TAG":
      let bingoIndex2 = state.bingos.findIndex(
        (bingo) => bingo.id === action.payload.id
      )
      if (bingoIndex2 === -1) return { ...state }

      state.bingos[bingoIndex2].tags = state.bingos[bingoIndex2].tags.filter(
        (tag) => tag !== action.payload.tag
      )
      state.selectedBingo = state.bingos[bingoIndex2]
      return { ...state }

    case "REMOVE_ALL_TAGS":
      let bingoIndex3 = state.bingos.findIndex(
        (bingo) => bingo.id === action.payload.id
      )
      if (bingoIndex3 === -1) return { ...state }

      state.bingos[bingoIndex3].tags = []
      state.selectedBingo = state.bingos[bingoIndex3]
      return { ...state }

    default:
      return state
  }
}

const initialBingoState = {
  bingos: [{ id: 1, title: "title1", tags: ["tag1"] }]
} as BingosState
