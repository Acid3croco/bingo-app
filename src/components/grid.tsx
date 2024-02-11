import { useState } from "react"

export function Grid({ tags }: Readonly<{ tags: string[] }>) {
  const gridSize = 4 // Assuming a 4x4 grid for simplicity
  const [selectedCells, setSelectedCells] = useState<boolean[]>(
    new Array(tags.length).fill(false)
  )

  // Toggle cell selection
  const toggleCell = (index: number) => {
    const updatedSelectedCells = [...selectedCells]
    updatedSelectedCells[index] = !updatedSelectedCells[index]
    setSelectedCells(updatedSelectedCells)
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
      i % (gridSize - 1) === 0 && i !== 0 && i !== tags.length - 1
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
      index % (gridSize - 1) === 0 && index !== 0 && index !== tags.length - 1

    return (
      (primaryDiagonalSelected && onPrimaryDiagonal) ||
      (secondaryDiagonalSelected && onSecondaryDiagonal)
    )
  }

  return (
    <div className="flex gap-4 flex-col">
      {/* Score (placeholder values) */}
      <div className="flex gap-4">
        <h1 className="text-lg font-medium">Score: {1}</h1>
        <h1 className="text-lg font-medium">Rows: {1}</h1>
        <h1 className="text-lg font-medium">Cols: {1}</h1>
        <h1 className="text-lg font-medium">Diags: {1}</h1>
      </div>
      {/* Grid */}
      <div className="grid grid-cols-4 gap-0">
        {tags.map((tag, i) => {
          // Calculate striping effect
          const isEvenRow = Math.floor(i / gridSize) % 2 === 0
          return (
            <div
              key={i}
              onClick={() => toggleCell(i)}
              className={`p-4 cursor-pointer flex items-center justify-center text-center ${
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
  )
}
