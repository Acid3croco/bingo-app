import { useContext, useMemo, useState } from "react"

import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Grid } from "@/components/grid"

import { BingosContext, BingosDispatchContext } from "@/lib/bingo-context"

export function Content() {
  const bingosState = useContext(BingosContext)
  const bingoDisptach = useContext(BingosDispatchContext)
  const bingo = bingosState.selectedBingo

  const addTag = (e: any) => {
    e.preventDefault()
    if (!bingo) return

    let targets = e.target as any
    let tag = targets[0].value

    if (!tag || tag === "") {
      toast("Tag is required...")
      return
    }
    if (bingo.tags.includes(tag)) {
      toast("Tag already exists!")
      return
    }

    bingoDisptach({
      type: "ADD_TAG",
      payload: { tag, id: bingo.id }
    })
    // empty the input
    targets[0].value = ""
  }

  const removeTag = (tag: string) => {
    if (!bingo) return
    bingoDisptach({
      type: "REMOVE_TAG",
      payload: { tag, id: bingo.id }
    })
  }

  const clearAllTags = () => {
    if (!bingo) return
    bingoDisptach({
      type: "REMOVE_ALL_TAGS",
      payload: { id: bingo.id }
    })
  }

  return bingo ? (
    <div className="container mx-auto pt-12">
      <div className="flex flex-col gap-8">
        {/* TITLE */}
        <h1 className="text-5xl font-bold">{bingo.title}</h1>
        {/* GRID */}
        <Grid />
        {/* TAGS */}
        <div className="flex gap-4 flex-col">
          <form onSubmit={addTag}>
            <Input placeholder="Add Tag" />
          </form>
          <div className="grid grid-cols-4 gap-4">
            {bingo.tags.map((tag, i) => (
              <div key={i} className="w-full">
                <Button key={i} variant="outline" className="h-full w-full">
                  <div className="flex flex-wrap gap-2 align-baseline justify-between items-center whitespace-normal w-full">
                    <div className="text-left">{tag}</div>
                    {/* add small red cross icon to remove */}
                    <Badge variant="destructive" onClick={() => removeTag(tag)}>
                      x
                    </Badge>
                  </div>
                </Button>
              </div>
            ))}
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Clear all Tags</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Clear all Tags</DialogTitle>
                <DialogDescription>
                  You are about to remove all tags from the bingo board.
                  <br />
                  Are you sure?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="destructive" onClick={clearAllTags}>
                  Clear all Tags
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex h-full items-center justify-center p-6">
      <div className="text-2xl font-bold max-w-sm text-balance text-center">
        Please select a Bingo board on the left!
      </div>
    </div>
  )
}
