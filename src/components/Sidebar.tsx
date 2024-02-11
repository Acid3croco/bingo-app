import { useContext } from "react"

import { toast } from "sonner"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

import { BingosContext, BingosDispatchContext } from "@/lib/bingo-context"

export function Sidebar() {
  const bingosState = useContext(BingosContext)
  const bingoDispatch = useContext(BingosDispatchContext)

  const addBingo = (e: any) => {
    e.preventDefault()
    let targets = e.target as any
    let title = targets[0].value

    if (!title) {
      toast("Title is required...")
      return
    }
    if (bingosState.bingos.find((bingo) => bingo.title === title)) {
      toast("Bingo already exists!")
      return
    }
    bingoDispatch({
      type: "ADD_BINGO",
      payload: { id: bingosState.bingos.length + 1, title, tags: [] }
    })
    toast("Bingo successfully added")
  }

  return (
    <ScrollArea className="w-full h-screen">
      <div className="flex flex-col gap-4 px-4">
        <h3 className="text-lg pt-4 font-medium leading-none">Bingo Boards</h3>
        <form onSubmit={addBingo}>
          <Input placeholder="Add Bingo" />
        </form>

        {bingosState.bingos.map((bingo) => (
          <Button
            key={bingo.id}
            variant="ghost"
            className={`w-full justify-start ${
              bingosState.selectedBingo?.id === bingo.id ? "bg-gray-200" : ""
            }`}
            onClick={() => {
              bingoDispatch({ type: "SELECT_BINGO", payload: bingo })
            }}
          >
            {bingo.title}
          </Button>
        ))}
      </div>
    </ScrollArea>
  )
}
