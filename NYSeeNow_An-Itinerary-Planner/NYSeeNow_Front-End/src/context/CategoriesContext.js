import React, { useState, useContext } from 'react'

const CategoriesContext = React.createContext()

export const useCategories = () => {
  return useContext(CategoriesContext)
}

export function CategoriesProvider(props) {
  const [selectedOptions, setSelectedOptions] = useState([])

  const value = {
    selectedOptions,
    setSelectedOptions
  }

  return <CategoriesContext.Provider value={value}>{props.children}</CategoriesContext.Provider>
}
