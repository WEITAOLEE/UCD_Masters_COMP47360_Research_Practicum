import React, { useState } from 'react'
import AttractionCard from './AttractionCard'
import { useSelection } from '../context/SelectionContext'
import SideBarDate from './SideBarDate'
import styles from './SidebarContent.module.css'

const SidebarContent = ({
  open,
  getStartDate,
  getEndDate,
  submitHandler,
  currStartDate,
  currEndDate
}) => {
  const { selectedList, setSelectedList } = useSelection()

  const handleDelete = (attractionName) => {
    setSelectedList(selectedList.filter((attraction) => attraction['name'] !== attractionName))
  }

  return (
    <div className={`sidebar-content ${!open ? 'closed' : ''}`}>
      <SideBarDate startDateSetter={getStartDate} endDateSetter={getEndDate}></SideBarDate>
      {selectedList && (
        <h2>
          <u>Attractions</u>
        </h2>
      )}
      {/* Scrollable container for attraction cards */}
      <div className={styles['attraction-container']}>
        {selectedList &&
          selectedList.map((attraction, index) => (
            <AttractionCard
              key={index}
              attraction={attraction}
              onDelete={handleDelete}
              startDate={currStartDate}
              endDate={currEndDate}
            />
          ))}
      </div>
      {/* Plan Trip button outside of the scrollable container */}
      {selectedList && (
        <div className={styles.buttonContainer}>
          <button onClick={submitHandler}>Plan Trip</button>
        </div>
      )}
    </div>
  )
}

export default SidebarContent
