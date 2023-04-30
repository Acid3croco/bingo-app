import React, { useState } from "react"
import db from "../../firebase/firebaseConfig"

const Event = ({ event }) => {
  const [editMode, setEditMode] = useState(false)
  const [updatedEvent, setUpdatedEvent] = useState(event.name)

  const updateEvent = async () => {
    await db.collection("events").doc(event.id).update({ name: updatedEvent })
    setEditMode(false)
  }

  const deleteEvent = async () => {
    await db.collection("events").doc(event.id).delete()
  }

  return (
    <li>
      {editMode ? (
        <input
          type="text"
          value={updatedEvent}
          onChange={(e) => setUpdatedEvent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateEvent()
            }
          }}
        />
      ) : (
        <span onDoubleClick={() => setEditMode(true)}>{event.name}</span>
      )}

      <button onClick={updateEvent}>Update</button>
      <button onClick={deleteEvent}>Delete</button>
    </li>
  )
}

export default Event
