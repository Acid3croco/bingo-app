import React, { useEffect, useState } from "react"

import firebase from "firebase/compat/app"
import db from "@/firebase/firebaseConfig"

import Grid from "@/components/Grid/Grid"
import EventList from "@/components/EventList/EventList"
import GridControls from "@/components/GridControls/GridControls"

const Index = () => {
  const [events, setEvents] = useState([]) // Replace with your actual events data
  const [gridId, setGridId] = useState() // Replace with the actual grid ID from Firebase
  const [checkedCells, setCheckedCells] = useState({})
  const [gridSize, setGridSize] = useState({ rows: 4, columns: 4 })
  const [numUsers, setNumUsers] = useState(0)

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsSnapshot = await db.collection("events").get()
      const eventsData = eventsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setEvents(eventsData)
    }

    fetchEvents()
  }, [])

  useEffect(() => {
    const checkedCellsRef = db
      .collection("grids")
      .doc(gridId)
      .collection("checkedCells")
    const unsubscribe = checkedCellsRef.onSnapshot((snapshot) => {
      const newCheckedCells = {}
      snapshot.forEach((doc) => {
        newCheckedCells[doc.id] = doc.data().checked
      })
      setCheckedCells(newCheckedCells)
    })

    return () => unsubscribe()
  }, [gridId])

  useEffect(() => {
    const gridRef = db.collection("grids").doc(gridId)
    const unsubscribe = gridRef.onSnapshot((doc) => {
      if (doc.exists) {
        setNumUsers(doc.data().numUsers)
      }
    })

    // Increment the number of users when the component mounts
    gridRef.update({ numUsers: firebase.firestore.FieldValue.increment(1) })

    return () => {
      // Decrement the number of users when the component unmounts
      gridRef.update({ numUsers: firebase.firestore.FieldValue.increment(-1) })
      unsubscribe()
    }
  }, [gridId])

  const handleCellClick = (eventId) => {
    const checkedCellsRef = db
      .collection("grids")
      .doc(gridId)
      .collection("checkedCells")
      .doc(eventId)
    checkedCellsRef.get().then((doc) => {
      if (doc.exists) {
        checkedCellsRef.update({ checked: !doc.data().checked })
      } else {
        checkedCellsRef.set({ checked: true })
      }
    })
  }

  const importGrid = (gridCode) => {
    setGridId(gridCode)
  }

  // const handleCellClick = (eventId) => {
  //   setCheckedCells((prevCheckedCells) => ({
  //     ...prevCheckedCells,
  //     [eventId]: !prevCheckedCells[eventId]
  //   }))
  // }

  const handleShuffle = () => {
    const shuffledEvents = [...events]
    for (let i = shuffledEvents.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledEvents[i], shuffledEvents[j]] = [
        shuffledEvents[j],
        shuffledEvents[i]
      ]
    }
    setEvents(shuffledEvents)
  }

  const handleGridSizeChange = (newSize) => {
    setGridSize({ rows: newSize, columns: newSize })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">BINGO App</h1>
      <div className="flex flex-col items-center">
        <EventList events={events} setEvents={setEvents} />
        <div className="mt-4">
          <Grid
            events={events}
            gridSize={gridSize}
            checked={checkedCells}
            onCellClick={handleCellClick}
          />
        </div>
        <div className="mt-4">
          <p>
            Grid Code: {gridId} | Users: {numUsers}
          </p>
        </div>
        <div className="mt-4">
          <GridControls
            gridSize={gridSize}
            onShuffle={handleShuffle}
            onGridSizeChange={handleGridSizeChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Index
