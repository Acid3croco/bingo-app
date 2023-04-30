// components/Event/Event.js

import React, { useContext } from "react"
import { BingoContext } from "@/contexts/BingoContext"

const Event = ({ id }) => {
  const { deleteEvent, events } = useContext(BingoContext)
  const event = events.find((e) => e.id === id)

  return (
    <div className="event">
      <span>{event.name}</span>
      <button className="bg-red-300 rounded" onClick={() => deleteEvent(id)}>
        Delete
      </button>
    </div>
  )
}

export default Event
