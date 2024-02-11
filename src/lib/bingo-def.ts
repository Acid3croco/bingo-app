export interface Bingo {
  id: number
  title: string
  tags: string[]
}

export interface BingosState {
  bingos: Bingo[]
  selectedBingo: Bingo | null
}

export type BingoAction =
  | { type: "ADD_TAG"; payload: { tag: string; bingoId: number } }
  | { type: "REMOVE_TAG"; payload: { tag: string; bingoId: number } }
  | { type: "ADD_BINGO"; payload: Bingo }
  | { type: "SELECT_BINGO"; payload: Bingo }
  | { type: "UPDATE_BINGO"; payload: Bingo }
  | { type: "REMOVE_BINGO"; payload: number }
