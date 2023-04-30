// index.js

import React, { useContext, useEffect } from "react"
import { BingoContext, BingoProvider } from "@/contexts/BingoContext"

import Grid from "@/components/Grid/Grid"
import EventList from "@/components/EventList/EventList"
import GridControls from "@/components/GridControls/GridControls"

const Index = () => {
  return (
    <BingoProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4 text-center">BINGO App</h1>
        <div className="flex flex-col items-center">
          <div className="w-full md:w-2/3 mb-4">
            <Grid />
          </div>
          <div className="w-full md:w-2/3 mb-4">
            <GridControls />
          </div>
          <div className="w-full md:w-2/3 mb-4">
            <EventList />
          </div>
        </div>
      </div>
    </BingoProvider>
  )
}

export default Index
