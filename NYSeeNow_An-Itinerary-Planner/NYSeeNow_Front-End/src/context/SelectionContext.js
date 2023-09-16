import React, { useState, useContext } from 'react'

const SelectionContext = React.createContext()

export const useSelection = () => {
  return useContext(SelectionContext)
}

export function SelectionProvider(props) {
  const [selectedList, setSelectedList] = useState([])  // Changed from null to []

  const value = {
    selectedList,
    setSelectedList
  }

  return <SelectionContext.Provider value={value}>{props.children}</SelectionContext.Provider>
}
