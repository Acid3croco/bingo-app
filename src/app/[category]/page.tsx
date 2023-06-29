"use client"

import { useEffect, useRef, useState } from "react"

const defaultEvents = [
  "un candidat se blesse",
  "un candidat se fait éliminer",
  "un candidat se fait éliminer à l'unanimité",
  "un candidat se fait éliminer à la majorité",

  "un candidat boit du lait",
  "un candidat boit de l'alcool",
  "un candidat boit de l'eau",
  "un candidat boit du café",
  "un candidat boit du thé",
  "un candidat boit du jus de fruit",
  "un candidat boit du soda",

  "un candidat mange de la viande",
  "un candidat mange du poisson",
  "un candidat mange des fruits",
  "un candidat mange des légumes",
  "un candidat mange des féculents",
  "un candidat mange des produits laitiers",
  "un candidat mange des sucreries",
  "un candidat mange des fruits de mer",

  "un candidat fait du feu",
  "un candidat fait la vaisselle",
  "un candidat fait la cuisine",
  "un candidat fait la lessive",
  "un candidat fait la sieste",

  "un candidat se douche",
  "un candidat se lave les dents",
  "un candidat se lave les cheveux",
  "un candidat se lave les mains",

  "un candidat fait du sport",
  "un candidat fait du yoga",
  "un candidat fait du surf",
  "un candidat fait du ski",

  "un candidat se dispute",
  "un candidat pleure",
  "un candidat rit",
  "un candidat chante",
  "un candidat danse",

  "un candidat se maquille",
  "un candidat se coiffe",
  "un candidat se rase",
  "un candidat se parfume"
]

type Score = {
  cells: number
  rows: number
  cols: number
  diags: number
}

type Event = {
  id: number
  name: string
  checked: boolean
  isRowFull: boolean
  isColFull: boolean
  isDiagFull: boolean
}

export default function CategoryPage({
  params: { category }
}: {
  params: { category: string }
}) {
  const [rowNb, setRowNb] = useState(4)
  const [colNb, setColNb] = useState(4)
  const [rows, setRows] = useState([] as Event[][])

  const [bingo, setBingo] = useState(false)

  const [events, setEvents] = useState(defaultEvents)
  const [lastEventId, setLastEventId] = useState([] as number[])

  const [score, setScore] = useState({
    cells: 0,
    rows: 0,
    cols: 0,
    diags: 0
  } as Score)

  const rowNbRef = useRef(rowNb)
  const colNbRef = useRef(colNb)
  const rowsRef = useRef(rows)
  const scoreRef = useRef(score)
  const eventsRef = useRef(events)

  // eventToggle is used to force a re-render when an event is checked
  const [eventToggle, setEventToggle] = useState(false)
  const [regenerateToggle, setRegenerateToggle] = useState(false)

  useEffect(() => {
    console.log(`useEffect generate rows`)
    const shuffle = (array: string[], size: number) => {
      const shuffled = array.sort(() => 0.5 - Math.random())
      const _events = shuffled.slice(0, size)
      return _events.map((event, index) => {
        return {
          id: index,
          name: event,
          checked: false,
          isRowFull: false,
          isColFull: false,
          isDiagFull: false
        } as Event
      })
    }

    const suffledEvents = shuffle(eventsRef.current, rowNb * colNb)

    const _rows = []
    for (let i = 0; i < rowNb; i++) {
      const _row = []
      for (let j = 0; j < colNb; j++) {
        // prevent going too far in case col x row > events.length
        if (i * colNb + j >= suffledEvents.length) {
          break
        }
        _row.push(suffledEvents[i * colNb + j])
      }
      _rows.push(_row)
      setRows(_rows)
      rowsRef.current = _rows
    }

    // reset score
    scoreRef.current = {
      cells: 0,
      rows: 0,
      cols: 0,
      diags: 0
    } as Score
    setScore(scoreRef.current)
    //reset rollback
    setLastEventId([])
  }, [setRows, rowNb, colNb, regenerateToggle])

  useEffect(() => {
    if (!rowsRef.current.length) return

    const _rows = rowsRef.current
    const _newRows = []
    const _newScore = {
      cells: 0,
      rows: 0,
      cols: 0,
      diags: 0
    } as Score

    // reset isRowFull and isColFull
    _rows.forEach((row) => {
      row.forEach((event) => {
        event.isRowFull = false
        event.isColFull = false
        event.isDiagFull = false
      })
    })

    // check cells for score
    _rows.forEach((row) =>
      row.forEach((event) => (event.checked ? _newScore.cells++ : null))
    )

    // check rows
    for (let i = 0; i < _rows.length; i++) {
      const row = _rows[i]
      const isFullRow = row.every((event) => event.checked)
      if (isFullRow) {
        _newScore.rows++
        row.forEach((event) => {
          event.isRowFull = true
        })
      }
      _newRows.push(row)
    }

    // check columns
    const colLength = _rows[0].length
    for (let i = 0; i < colLength; i++) {
      const col = _rows.map((row) => row[i]).filter((event) => event)
      const isFullCol = col.every((event) => event.checked)
      if (isFullCol) {
        _newScore.cols++
        col.forEach((event) => {
          event.isColFull = true
        })
      }
    }

    // check diagonals, there is 2 diagonals to check so we will do it manually

    // diagonal 1
    let diagonal = []
    for (let i = 0; i < _rows.length; i++) {
      const event = _rows[i][i]
      if (!event) continue
      diagonal.push(event)
    }
    let isFullDiagonal = diagonal.every((event) => event.checked)
    if (isFullDiagonal) {
      _newScore.diags++
      diagonal.forEach((event) => {
        event.isDiagFull = true
      })
    }
    // diagonal 2
    diagonal = []
    for (let i = 0; i < _rows.length; i++) {
      const event = _rows[i][_rows.length - 1 - i]
      if (!event) continue
      diagonal.push(event)
    }
    isFullDiagonal = diagonal.every((event) => event.checked)
    if (isFullDiagonal) {
      _newScore.diags++
      diagonal.forEach((event) => {
        event.isDiagFull = true
      })
    }

    setRows(_newRows)
    setScore(_newScore)
  }, [rowsRef, setRows, scoreRef, setScore, eventToggle])

  useEffect(() => {
    score.cells === rowsRef.current.flat().length
      ? setBingo(true)
      : setBingo(false)
  }, [score])

  const handleGoldenBuzzer = () => {
    // check a random event that is not already checked
    if (score.cells === rowsRef.current.flat().length) return

    const lenRows = rows.length
    const lenCols = rows[0].length
    const randomRow = Math.floor(Math.random() * lenRows)
    const randomCol = Math.floor(Math.random() * lenCols)
    const randomEvent = rows[randomRow][randomCol]
    if (randomEvent && !randomEvent.checked) {
      randomEvent.checked = true
      setRows([...rows])
      setEventToggle(!eventToggle)
      setLastEventId([...lastEventId, randomEvent.id])
    } else {
      handleGoldenBuzzer()
    }
  }

  const rollbackLastMove = () => {
    if (lastEventId.length === 0) return

    const lastEventIdCopy = [...lastEventId]
    const lastEventIdCopyLast = lastEventIdCopy.pop()

    if (lastEventIdCopyLast == null) return

    setLastEventId(lastEventIdCopy)
    const lastEvent = rows
      .flat()
      .find((event) => event.id === lastEventIdCopyLast)
    if (!lastEvent) return
    lastEvent.checked = !lastEvent.checked
    setRows([...rows])
    setEventToggle(!eventToggle)
  }

  return (
    <div className="container">
      <div className="">
        <h1 className={`${bingo ? "text-green-500" : ""}`}>{category}</h1>
        <div className="flex gap-4 py-4">
          <div>Cells: {score.cells}</div>
          <div>Rows: {score.rows}</div>
          <div>Cols: {score.cols}</div>
          <div>Diags: {score.diags}</div>
          <div className={`${bingo ? "text-green-500" : ""}`}>
            <b> Total: {score.rows + score.cols + score.diags}</b>
          </div>
        </div>
        <div className="flex gap-4">
          <div>
            <button onClick={() => setRegenerateToggle(!regenerateToggle)}>
              Regenerate
            </button>
          </div>
          <div>
            <button
              className="bg-yellow-200 border-yellow-200 hover:bg-yellow-300 hover:border-yellow-300 text-black"
              onClick={handleGoldenBuzzer}
            >
              GOLDEN BUZZER
            </button>
          </div>
          <div>
            <button onClick={rollbackLastMove}>Rollback last move</button>
          </div>
        </div>
      </div>

      <table role="grid" className="table-fixed">
        <tbody>
          {rows.map((row, i) => {
            return (
              <tr key={i}>
                {row.map((event, j) => {
                  return (
                    <td
                      key={j}
                      onClick={() => {
                        event.checked = !event.checked
                        setLastEventId([...lastEventId, event.id])
                        setRows([...rows])
                        setEventToggle(!eventToggle)
                      }}
                      className={`${event.checked ? "cell-selected" : ""} ${
                        event.isRowFull || event.isColFull || event.isDiagFull
                          ? "full-selected"
                          : ""
                      } `}
                    >
                      {event.name}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* add div to input colNb and rowNb */}

      {/* add event editing system */}
      <div className="flex flex-col gap-4">
        <h2>Event list</h2>
        {/* add small form to add new events */}
        <form
          onSubmit={(event) => {
            event.preventDefault()
            const _events = [...events]
            const _event = event.currentTarget.event.value
            if (!_event) return
            if (_events.includes(_event)) {
              alert("Event already exists")
              return
            }
            _events.push(_event)
            setEvents(_events)
            eventsRef.current = _events
            event.currentTarget.event.value = ""
          }}
        >
          <div className="flex gap-4">
            <input type="text" name="event" required />
            <button type="submit" className="bg-black">
              Add
            </button>
          </div>
        </form>

        <div className="gridzer gap-2">
          {events
            .sort((a, b) => a.localeCompare(b))
            .map((event, index) => {
              return (
                <div key={index} className="flex gap-2">
                  <span
                    className="cursor-pointer bg-red-500 px-2 rounded-md"
                    onClick={() => {
                      const _events = [...events]
                      _events.splice(index, 1)
                      setEvents(_events)
                      eventsRef.current = _events
                    }}
                  >
                    x
                  </span>
                  <label htmlFor={event} className="break-all">
                    {event}
                  </label>
                </div>
              )
            })}
        </div>
        <button
          className="bg-red-500"
          onClick={() => {
            setEvents([])
            eventsRef.current = []
          }}
        >
          Flush ALL events
        </button>
      </div>
    </div>
  )
}

{
  /* <div>
        <form>
          <div className="grid">
            <label htmlFor="colNb">Col</label>
            <input
              type="number"
              id="colNb"
              name="colNb"
              value={colNb}
              min={1}
              max={events.length / rowNb}
              onChange={(event) => {
                colNbRef.current = parseInt(event.target.value)
              }}
            />

            <label htmlFor="rowNb">Row</label>
            <input
              type="number"
              id="rowNb"
              name="rowNb"
              value={rowNb}
              min={1}
              max={events.length / colNb}
              onChange={(event) => {
                rowNbRef.current = parseInt(event.target.value)
              }}
            />
            <button
              type="button"
              onClick={() => {
                setColNb(colNbRef.current)
                setRowNb(rowNbRef.current)
              }}
            >
              Apply
            </button>
          </div>
        </form>
      </div> */
}
