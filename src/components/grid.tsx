import { useCallback, useContext, useEffect, useState } from "react"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { BingosContext } from "@/lib/bingo-context"

export function Grid() {
  const gridSize = 4 // Assuming a 4x4 grid for simplicity

  const bingosState = useContext(BingosContext)
  const bingo = bingosState.selectedBingo

  const [score, setScore] = useState({ rows: 0, cols: 0, diags: 0 })
  const [selectedTags, setSelectedTags] = useState([] as string[])
  const [selectedCells, setSelectedCells] = useState<boolean[]>(
    new Array(selectedTags.length).fill(false)
  )

  const generateGrid = useCallback(() => {
    if (!bingo) return
    const bingoTags = bingo.tags
    let tags = [...bingoTags]
    if (tags.length === 0) {
      toast("Please add tags to the bingo board...")
      return
    }

    // select 16 random tags from the list
    tags = tags.sort(() => Math.random() - 0.5).slice(0, 16)
    setSelectedTags(tags)
    setSelectedCells(new Array(tags.length).fill(false))
  }, [bingo])

  useEffect(() => {
    generateGrid()
  }, [bingo, generateGrid])

  // Toggle cell selection
  const toggleCell = (index: number) => {
    const updatedSelectedCells = [...selectedCells]
    updatedSelectedCells[index] = !updatedSelectedCells[index]
    setSelectedCells(updatedSelectedCells)
  }

  const goldernBuzzer = () => {
    // Check if the grid is fully selected
    if (selectedCells.every((cell) => cell)) {
      toast("Congratulations! You've won the game!")
    } else {
      // find an random unselected cell and select it
      let randomIndex = Math.floor(Math.random() * selectedCells.length)
      while (selectedCells[randomIndex]) {
        randomIndex = Math.floor(Math.random() * selectedCells.length)
      }
      toggleCell(randomIndex)
    }
  }

  // Function to check if row, col, or diagonal is fully selected
  const isFullySelected = (index: number, type: "row" | "col" | "diag") => {
    const row = Math.floor(index / gridSize)
    const col = index % gridSize
    let isFull = true

    if (type === "row") {
      for (let i = 0; i < gridSize; i++) {
        if (!selectedCells[row * gridSize + i]) isFull = false
      }
    } else if (type === "col") {
      for (let i = 0; i < gridSize; i++) {
        if (!selectedCells[i * gridSize + col]) isFull = false
      }
    } else if (type === "diag") {
      // Check primary diagonal
      if (row === col) {
        for (let i = 0; i < gridSize; i++) {
          if (!selectedCells[i * gridSize + i]) isFull = false
        }
      } else if (row + col === gridSize - 1) {
        // Check secondary diagonal
        for (let i = 0; i < gridSize; i++) {
          if (!selectedCells[i * gridSize + (gridSize - 1 - i)]) isFull = false
        }
      } else {
        // Not part of a diagonal
        isFull = false
      }
    }

    return isFull
  }

  // Determine if primary or secondary diagonal is fully selected
  const isDiagonalFullySelected = () => {
    const primaryDiagonalSelected = selectedCells.every((_, i) =>
      i % (gridSize + 1) === 0 ? selectedCells[i] : true
    )
    const secondaryDiagonalSelected = selectedCells.every((_, i) =>
      i % (gridSize - 1) === 0 && i !== 0 && i !== selectedTags.length - 1
        ? selectedCells[i]
        : true
    )

    return { primaryDiagonalSelected, secondaryDiagonalSelected }
  }

  // Check if the cell is part of a fully selected diagonal
  const cellIsPartOfFullySelectedDiagonal = (index: number) => {
    const { primaryDiagonalSelected, secondaryDiagonalSelected } =
      isDiagonalFullySelected()
    const onPrimaryDiagonal = index % (gridSize + 1) === 0
    const onSecondaryDiagonal =
      index % (gridSize - 1) === 0 &&
      index !== 0 &&
      index !== selectedTags.length - 1

    return (
      (primaryDiagonalSelected && onPrimaryDiagonal) ||
      (secondaryDiagonalSelected && onSecondaryDiagonal)
    )
  }

  const calculateScore = useCallback(() => {
    let rows = 0,
      cols = 0,
      diags = [true, true] // For primary and secondary diagonals
    for (let i = 0; i < gridSize; i++) {
      // Check rows
      if (
        selectedCells
          .slice(i * gridSize, (i + 1) * gridSize)
          .every((cell) => cell)
      )
        rows++
      // Check columns
      if (
        selectedCells
          .filter((_, index) => index % gridSize === i)
          .every((cell) => cell)
      )
        cols++
      // Check diagonals
      if (!selectedCells[i * gridSize + i]) diags[0] = false
      if (!selectedCells[i * gridSize + (gridSize - i - 1)]) diags[1] = false
    }
    setScore({ rows, cols, diags: diags.filter(Boolean).length })
  }, [selectedCells])

  useEffect(() => {
    calculateScore()
  }, [selectedCells, calculateScore]) // Recalculate score whenever selectedCells changes

  return (
    <div>
      {/* BUTTONS */}
      <div className="flex gap-4 pb-4">
        <Button onClick={generateGrid}>Generate New Grid</Button>
        <Button
          className="bg-yellow-400 text-black hover:bg-yellow-500"
          onClick={goldernBuzzer}
        >
          GOLDEN BUZZER
        </Button>
      </div>
      <div className="flex gap-4 flex-col">
        {/* Score (placeholder values) */}
        <div className="flex gap-4">
          <h1 className="text-lg font-medium">
            Score: {selectedCells.filter(Boolean).length}
          </h1>
          <h1 className="text-lg font-medium">Rows: {score.rows}</h1>
          <h1 className="text-lg font-medium">Cols: {score.cols}</h1>
          <h1 className="text-lg font-medium">Diags: {score.diags}</h1>
        </div>
        {/* Grid */}
        <div className={`grid grid-cols-4 gap-0 border-gray-200 border`}>
          {selectedTags.map((tag, i) => {
            // Calculate striping effect
            const isEvenRow = Math.floor(i / gridSize) % 2 === 0

            return (
              <div
                key={i}
                onClick={() => toggleCell(i)}
                className={`p-4 cursor-pointer flex items-center justify-center text-center border-[0.5px] border-gray-200 ${
                  selectedCells[i]
                    ? "bg-green-500"
                    : isEvenRow
                    ? "bg-gray-200"
                    : "bg-white"
                } ${
                  isFullySelected(i, "row") ||
                  isFullySelected(i, "col") ||
                  cellIsPartOfFullySelectedDiagonal(i)
                    ? "bg-yellow-500"
                    : ""
                }`}
              >
                {tag}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
