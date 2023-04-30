// components/Grid/Grid.js

import React, { useContext } from "react"
import { BingoContext } from "@/contexts/BingoContext"
import Cell from "@/components/Grid/Cell"

const Grid = () => {
  const { grid } = useContext(BingoContext)
  const gridSize = { rows: 4, columns: 4 }

  return (
    <div
      className="grid grid-cols-4 gap-x-0 gap-y-0 border border-black"
      style={{
        gridTemplateRows: `repeat(${gridSize.rows}, minmax(0, 1fr))`,
        gridTemplateColumns: `repeat(${gridSize.columns}, minmax(0, 1fr))`
      }}
    >
      {grid &&
        grid.events &&
        grid.events.length > 0 &&
        grid.events.map((event) => <Cell key={event.id} id={event.id} />)}
    </div>
  )
}

export default Grid
