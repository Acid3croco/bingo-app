// contexts/BingoContext.js

import React, { createContext, useState, useEffect } from "react"
import db from "@/firebase/firebaseConfig"

const BingoContext = createContext()

const BingoProvider = ({ children }) => {
  const [grid, setGrid] = useState(null)
  const [events, setEvents] = useState([])
  const [gridSize, setGridSize] = useState({ rows: 4, columns: 4 })

  const createEvent = async (eventName) => {
    const existingEvent = events.find((event) => event.name === eventName)

    if (!existingEvent) {
      const newEvent = {
        name: eventName
      }

      const eventRef = await db.collection("events").add(newEvent)
      const eventSnapshot = await eventRef.get()
      setEvents([
        ...events,
        {
          id: eventSnapshot.id,
          ...eventSnapshot.data()
        }
      ])
    } else {
      console.error("Event with the same name already exists")
    }
  }

  const deleteEvent = async (eventId) => {
    await db.collection("events").doc(eventId).delete()
    setEvents(events.filter((event) => event.id !== eventId))
  }

  const setCheckEvent = async (event) => {
    event.checked = !event.checked
    console.log(`Setting event ${event.id} to ${event.checked}`)

    const updatedEvents = grid.events.map((e) =>
      e.id === event.id ? event : e
    )
    db.collection("grids")
      .doc(grid.id)
      .update({ events: updatedEvents }, { merge: true })

    setGrid((prevGrid) => {
      return { ...prevGrid, events: updatedEvents }
    })
  }

  const shuffleEvents = (eventsToShuffle) => {
    const shuffledEvents = [...eventsToShuffle]

    for (let i = shuffledEvents.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledEvents[i], shuffledEvents[j]] = [
        shuffledEvents[j],
        shuffledEvents[i]
      ]
    }

    return shuffledEvents
  }

  const generateGridId = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    const length = 8
    let result = ""

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    return result
  }

  const generateNewGrid = () => {
    const gridId = generateGridId()
    window.localStorage.setItem("gridId", gridId)

    const shuffledEvents = shuffleEvents(events)
    const gridEvents = shuffledEvents.slice(0, gridSize.rows * gridSize.columns)
    console.log(`Generating new grid with ${gridEvents.length} events`)

    const newGrid = {
      id: gridId,
      events: gridEvents.map((event) => ({
        ...event,
        checked: false
      }))
    }

    db.collection("grids").doc(gridId).set(newGrid)

    setGrid(newGrid)
    window.localStorage.setItem("gridId", newGrid.id)
  }

  const loadGridFromFirebase = async (gridIdToLoad) => {
    console.log(`Loading grid ${gridIdToLoad} from Firebase`)

    const gridRef = db.collection("grids").doc(gridIdToLoad)

    const gridSnapshot = await gridRef.get()
    if (!gridSnapshot.exists) {
      return null
    }

    const gridData = gridSnapshot.data()
    return {
      id: gridData.id,
      events: gridData.events
    }
  }

  const handleImportGrid = async (gridIdToLoad) => {
    loadGridFromFirebase(gridIdToLoad).then((loadedGrid) => {
      if (loadedGrid) {
        setGrid(loadedGrid)
      } else {
        generateNewGrid()
      }
    })
  }

  useEffect(() => {
    const storedGridId = window.localStorage.getItem("gridId")
    if (storedGridId !== null) {
      handleImportGrid(storedGridId)
    } else {
      generateNewGrid()
    }
  }, [])

  useEffect(() => {
    const unsubscribe = db.collection("events").onSnapshot((snapshot) => {
      const eventsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setEvents(eventsData)
    })
  }, [])

  return (
    <BingoContext.Provider
      value={{
        grid,
        setGrid,
        setCheckEvent,
        events,
        setEvents,
        createEvent,
        deleteEvent,
        gridSize,
        setGridSize,
        handleImportGrid,
        generateNewGrid
      }}
    >
      {children}
    </BingoContext.Provider>
  )
}

export { BingoContext, BingoProvider }
