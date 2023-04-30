import React from "react"

const GridControls = ({ gridSize, onShuffle, onGridSizeChange }) => {
  return (
    <div>
      <button
        onClick={onShuffle}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Shuffle Grid
      </button>
      <div className="mt-4">
        <label htmlFor="gridSize">Grid Size:</label>
        <input
          type="number"
          id="gridSize"
          min="2"
          max="10"
          value={gridSize.rows}
          onChange={(e) => onGridSizeChange(parseInt(e.target.value))}
        />
      </div>
    </div>
  )
}

export default GridControls
