import { useAuth } from '../../context/AuthContext'
import { useEffect, useState } from 'react'
import { AuthOverlay } from '../authOverlay/AuthOverlay'
import axios from 'axios'
import { TripContainer } from './TripContainer'
import styles from './MyItineraries.module.css'
import { TripInfo } from '../tripInformation/TripInfo'

export const MyItineraries = () => {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth()
  const [myTrips, setMyTrips] = useState(null)
  const [tripSelected, setTripSelected] = useState(false)
  const [selectedTrip, setSelectedTrip] = useState(null)
  const [attractionList, setAttractionList] = useState([])
  const trips_url = `/trip/${authUser}`
  const attraction_url = '/attractions/fetch'

  useEffect(() => {
    axios
      .get(trips_url)
      .then((response) => {
        setMyTrips(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

    axios
      .get(attraction_url)
      .then((response) => {
        console.log('First element of attraction list')
        console.log(response.data[1])
        setAttractionList(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [isLoggedIn])

  const showTrip = (attraction_details, all_details) => {
    // What we get is an array of attractions
    setTripSelected(true)
    let trip_details = JSON.parse(all_details)
    attraction_details.map((attraction) => {
      attraction['all_details'] = attractionList.find(
        (item) => item.attractionId === attraction.attractionId
      )
    })

    setSelectedTrip({ trip: trip_details, attractions: attraction_details })
  }

  const showAllTrips = () => {
    setTripSelected(false)
  }

  return (
    <div>
      {isLoggedIn && myTrips && !tripSelected && (
        <div>
          {' '}
          <h2>Upcoming Trips</h2>
          {Object.entries(myTrips).map(([key, value]) => (
            <div className={styles.tripPage}>
              <TripContainer
                onClick={() => showTrip(value, key)}
                key={key}
                trip_details={key}
                attraction_details={value}
              ></TripContainer>
            </div>
          ))}
        </div>
      )}
      {isLoggedIn && !myTrips && <h2>No Upcoming Trips</h2>}
      {!isLoggedIn && <AuthOverlay></AuthOverlay>}
      {tripSelected && <TripInfo onClick={showAllTrips} trip_details={selectedTrip}></TripInfo>}
    </div>
  )
}
