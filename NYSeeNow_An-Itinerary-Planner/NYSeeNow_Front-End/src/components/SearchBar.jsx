import { Autocomplete } from '@react-google-maps/api'
import { useRef } from 'react'
import styles from './SearchBar.module.css'

export const SearchBar = (props) => {
  const autocompleteRef = useRef(null)

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace()
    if (place && place.geometry && place.geometry.location) {
      const { lat, lng } = place.geometry.location
      // Access latitude and longitude
      console.log('Latitude:', lat())
      console.log('Longitude:', lng())
      props.set_map_center({ lat: lat(), lng: lng() })
    }
  }
  return (
    <div className={styles.searchBox}>
      <Autocomplete
        onLoad={(autocomplete) => {
          autocompleteRef.current = autocomplete
        }}
        onPlaceChanged={handlePlaceChanged}
      >
        <div className={styles.searchContainer}>
          <input type="text" placeholder="Search for a location" />
        </div>
      </Autocomplete>
    </div>
  )
}
