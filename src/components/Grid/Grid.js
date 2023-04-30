// components/Grid/Grid.js

import React, { useContext } from "react"
import { BingoContext } from "@/contexts/BingoContext"
import Cell from "@/components/Grid/Cell"

const Grid = () => {
  const { grid } = useContext(BingoContext)

  return (
    <>
      <div className="grid">
        {grid &&
          grid.events &&
          grid.events.length > 0 &&
          grid.events.map((event) => <Cell key={event.id} id={event.id} />)}
      </div>
      {grid && grid.id && <p>Grid Code: {grid.id}</p>}
    </>
  )
}

export default Grid
