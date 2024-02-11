import { useContext } from "react"

import { BingosContext } from "@/lib/bingo-context"

export function Content() {
  const bingosState = useContext(BingosContext)

  return (
    <div className="flex h-full items-center justify-center p-6">
      {bingosState.selectedBingo && (
        <div>
          <h1 className="text-3xl font-bold mb-4">
            {bingosState.selectedBingo.title}
          </h1>
          <div>
            {bingosState.selectedBingo.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-200 text-gray-800 rounded-full px-2 py-1 text-sm mr-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
