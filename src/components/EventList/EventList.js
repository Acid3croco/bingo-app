import React, { useContext, useState } from "react"
import { BingoContext } from "@/contexts/BingoContext"
import Event from "@/components/EventList/Event"

const EventList = () => {
  const { events, createEvent } = useContext(BingoContext)
  const [newEventName, setNewEventName] = useState("")

  const handleAddEvent = () => {
    if (newEventName.trim() !== "") {
      createEvent(newEventName.trim())
      setNewEventName("")
    }
  }

  const handleInputChange = (e) => {
    setNewEventName(e.target.value)
  }

  return (
    <div className="event-list">
      <div className="add-event">
        <input
          type="text"
          value={newEventName}
          onChange={handleInputChange}
          placeholder="Add new event"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddEvent()
            }
          }}
        />
        <button onClick={handleAddEvent}>Add</button>
      </div>
      {events.map((event) => (
        <Event key={event.id} id={event.id} />
      ))}
    </div>
  )
}

export default EventList
