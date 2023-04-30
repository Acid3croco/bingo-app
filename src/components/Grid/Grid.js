import React from "react"
import Cell from "./Cell"

const Grid = ({ events, gridSize, checked, onCellClick }) => {
  const gridRows = Array.from({ length: gridSize.rows }, (_, rowIndex) => {
    const rowEvents = events.slice(
      rowIndex * gridSize.columns,
      (rowIndex + 1) * gridSize.columns
    )
    return (
      <tr key={`row-${rowIndex}`}>
        {rowEvents.map((event) => (
          <Cell
            key={event.id}
            event={event}
            checked={checked[event.id] || false}
            onClick={() => onCellClick(event.id)}
          />
        ))}
      </tr>
    )
  })

  return (
    <table>
      <tbody>{gridRows}</tbody>
    </table>
  )
}

export default Grid
