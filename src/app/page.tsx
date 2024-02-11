"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable"

import { Sidebar } from "@/components/sidebarzer"
import { Content } from "@/components/content"
import { BingoProvider } from "@/lib/bingo-context"

export default function Home() {
  return (
    <BingoProvider>
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <Content />
        </ResizablePanel>
      </ResizablePanelGroup>
    </BingoProvider>
  )
}
