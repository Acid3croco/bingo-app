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
    <div>
      <hr className="p-4" />
      <div className="pb-2">
        <input
          type="text"
          value={newEventName}
          onChange={handleInputChange}
          placeholder="Add new event"
          className="border-2 border-gray-300 p-1 rounded"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddEvent()
            }
          }}
        />
        <button
          className="bg-gray-500 text-white ml-2 p-2 rounded"
          onClick={handleAddEvent}
        >
          Add
        </button>
      </div>
      <div className="grid grid-cols-4">
        {events.map((event) => (
          <Event key={event.id} id={event.id} />
        ))}
      </div>
    </div>
  )
}

export default EventList
