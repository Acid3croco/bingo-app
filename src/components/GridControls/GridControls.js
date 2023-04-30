// components/GridControls/GridControls.js

import React, { useContext, useState } from "react"
import { BingoContext } from "@/contexts/BingoContext"

const GridControls = () => {
  const { grid, gridSize, handleImportGrid, generateNewGrid } =
    useContext(BingoContext)
  const [importId, setImportId] = useState("")

  return (
    <div className="flex justify-between  place-items-center">
      <button
        className="bg-green-500 text-white py-2 px-4 rounded"
        onClick={generateNewGrid}
      >
        Regen Grid
      </button>
      {/* <input
        type="number"
        value={gridSize}
        onChange={(e) => handleGridSizeChange(e.target.value)}
      /> */}
      {grid && grid.id && <p className="">Grid Code: {grid.id}</p>}
      <div className="">
        <input
          type="text"
          value={importId}
          onChange={(e) => setImportId(e.target.value)}
          placeholder="Grid ID"
          className="border-2 border-gray-300 p-1 rounded"
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => handleImportGrid(importId)}
          value={importId}
        >
          Import Grid
        </button>
      </div>
    </div>
  )
}

export default GridControls
