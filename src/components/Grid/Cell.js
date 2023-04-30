import React from "react"

const Cell = ({ event, checked, onClick }) => {
  return (
    <td
      onClick={onClick}
      className={`p-2 border ${
        checked ? "bg-green-500 text-white" : "bg-white text-black"
      }`}
    >
      {event.name}
    </td>
  )
}

export default Cell
