import React, { useState, useContext } from 'react'

const TripDataContext = React.createContext()

export const useTripData = () => {
  return useContext(TripDataContext)
}

export function TripDataProvider(props) {
  const [tripData, setTripData] = useState({})

  const value = {
    tripData,
    setTripData
  }

  return <TripDataContext.Provider value={value}>{props.children}</TripDataContext.Provider>
}
