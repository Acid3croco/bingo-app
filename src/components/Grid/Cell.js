// components/Cell/Cell.js

import React, { useContext } from "react"
import { BingoContext } from "@/contexts/BingoContext"

const Cell = ({ id }) => {
  const { grid, setCheckEvent } = useContext(BingoContext)
  const event = grid.events.find((event) => event.id === id)

  return (
    <div
      className={`cell ${event.checked ? "bg-green-300" : ""}`}
      onClick={() => setCheckEvent(event)}
    >
      {event.name}
    </div>
  )
}

export default Cell
