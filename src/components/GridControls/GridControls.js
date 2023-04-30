// components/GridControls/GridControls.js

import React, { useContext, useState } from "react"
import { BingoContext } from "@/contexts/BingoContext"

const GridControls = () => {
  const { gridSize, handleImportGrid, generateNewGrid } =
    useContext(BingoContext)
  const [importId, setImportId] = useState("")

  return (
    <div>
      <button onClick={generateNewGrid}>Shuffle</button>
      {/* <input
        type="number"
        value={gridSize}
        onChange={(e) => handleGridSizeChange(e.target.value)}
      /> */}
      <input
        type="text"
        value={importId}
        onChange={(e) => setImportId(e.target.value)}
        placeholder="Grid ID"
      />
      <button onClick={() => handleImportGrid(importId)} value={importId}>
        Import Grid
      </button>
    </div>
  )
}

export default GridControls
