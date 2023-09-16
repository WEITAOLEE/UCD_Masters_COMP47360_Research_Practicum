import { useEffect, useState } from 'react'
import ItineraryCarouselCard from './ItineraryCarouselCard'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styles from './ItineraryBuilder.module.css'
import { useTripData } from '../../context/TripDataContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useSelection } from '../../context/SelectionContext'

export const ItineraryBuilder = () => {
  const [tripMap, setTripMap] = useState({})
  const { tripData, setTripData } = useTripData()
  const { selectedList, setSelectedList } = useSelection()

  const navigate = useNavigate()

  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth()

  useEffect(() => {
    setTripMap(tripData)
  }, [])

  const saveItinerary = () => {
    // Check if every attraction has a visitTime
    const allHaveVisitTime = Object.values(tripMap)
      .flat()
      .every((attraction) => attraction.visitTime)

    if (!allHaveVisitTime) {
      // Inform the user that they need to set a visit time for each attraction
      alert('Please set a visit time for each attraction before saving the itinerary.')
      return
    }

    // If all attractions have a visitTime, continue with the saving process
    console.log('The request to save')

    let req_obj = { user: authUser }
    req_obj['tripDetails'] = tripMap
    console.log(req_obj)

    const req_string = JSON.stringify(req_obj)
    const save_url = '/trip/create'

    if (!isLoggedIn) {
      navigate('/userProfile')
    } else {
      axios
        .post(save_url, req_string, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          console.log('Saving Success!')
          console.log(response)
          setTripData({})
          setSelectedList([])
          navigate('/itineraries')
        })
        .catch((error) => {
          console.log('You have an error while saving!')
          console.log(error)
        })
    }
  }

  return (
    <div>
      <h1>Itinerary Builder</h1>
      <Carousel
        className={styles.CarouselCard}
        showArrows={true}
        showThumbs={false}
        centerSlidePercentage={50}
      >
        {Object.entries(tripMap).map(([key, value]) => (
          <div className={styles.CarouselElement}>
            <ItineraryCarouselCard key={key} day={key} value={value}></ItineraryCarouselCard>
          </div>
        ))}
      </Carousel>
      <button onClick={saveItinerary} className={styles.BuilderButton}>
        Save Itinerary
      </button>
    </div>
  )
}
