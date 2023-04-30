// components/Event/Event.js

import React, { useContext } from "react"
import { BingoContext } from "@/contexts/BingoContext"

const Event = ({ id }) => {
  const { deleteEvent, events } = useContext(BingoContext)
  const event = events.find((e) => e.id === id)

  return (
    <div className="flex gap-2 place-items-center">
      <button
        className="bg-red-300 rounded p-1 px-2"
        onClick={() => deleteEvent(id)}
      >
        x
      </button>
      <span>{event.name}</span>
    </div>
  )
}

export default Event
