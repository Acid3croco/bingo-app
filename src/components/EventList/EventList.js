import React, { useState, useEffect } from "react"
import db from "../../firebase/firebaseConfig"
import Event from "./Event"

const EventList = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const unsubscribe = db
      .collection("events")
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        setEvents(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      })

    return () => unsubscribe()
  }, [])

  const addEvent = async (event) => {
    await db.collection("events").add({
      name: event,
      createdAt: new Date()
    })
  }

  return (
    <div>
      <h2>Events</h2>
      <input
        type="text"
        placeholder="Add a new event"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addEvent(e.target.value)
            e.target.value = ""
          }
        }}
      />
      <ul>
        {events.map((event) => (
          <Event key={event.id} event={event} />
        ))}
      </ul>
    </div>
  )
}

export default EventList
