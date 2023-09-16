import React, { useState } from 'react'
import styles from './CategoriesDropDown.module.css'
import options from '../assets/attraction_options.json'
import { useCategories } from '../context/CategoriesContext'
import { getTypeColor } from '../pages/homePage/HomePageMarker'

const attractionSVG = '/attractions.svg'
const museumSVG = '/museums.svg'
const artworkSVG = '/artworkSVG.svg'
const aquariumSVG = '/aquariums.svg'
const campsiteSVG = '/campsites.svg'
const gallerySVG = '/galleries.svg'
const sightseeingSVG = '/sightseeing.svg'

const CategoryDropDown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { selectedOptions, setSelectedOptions } = useCategories()

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionChange = (optionId) => {
    const isSelected = selectedOptions.includes(optionId)

    if (isSelected) {
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId))
    } else {
      setSelectedOptions([...selectedOptions, optionId])
    }
  }

  const getSVGIcon = (type) => {
    const icons = {
      attraction: attractionSVG,
      museum: museumSVG,
      artwork: artworkSVG,
      aquarium: aquariumSVG,
      camp_site: campsiteSVG,
      gallery: gallerySVG,
      sightseeing: sightseeingSVG
    }
    return icons[type] || attractionSVG // default to attractionSVG if type not found
  }

  const getSvgPath = (type) => {
    const svgMap = {
      attraction: '/attractions.svg',
      museum: '/museums.svg',
      artwork: '/artworkSVG.svg',
      aquarium: '/aquariums.svg',
      camp_site: '/campsites.svg',
      gallery: '/galleries.svg',
      sightseeing: '/sightseeing.svg'
    }

    return svgMap[type] || '/attractions.svg' // default to attractions.svg if type is not found
  }

  return (
    <div className={styles.categoryBlock}>
      <a onClick={toggleDropdown}>Categories</a>
      {isOpen && (
        <div className={styles.dropdownContainer}>
          {options.map((option) => (
            <label key={option.id} className={styles.optionLabel}>
              {/* Add SVG to the label */}
              <img
                src={getSvgPath(option.types[0])}
                alt={option.label}
                className={styles.svgIcon}
              />
              <span
                className={styles.colorCircle}
                style={{ backgroundColor: getTypeColor(option.types[0]) }}
              ></span>
              <input
                type="checkbox"
                checked={selectedOptions.includes(option.id)}
                onChange={() => handleOptionChange(option.id)}
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryDropDown
