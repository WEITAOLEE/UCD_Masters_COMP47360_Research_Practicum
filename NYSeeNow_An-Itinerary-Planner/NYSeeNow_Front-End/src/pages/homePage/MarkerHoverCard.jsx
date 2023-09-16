import { useEffect, useState } from 'react'
import { useSelection } from '../../context/SelectionContext'
import axios from 'axios'

export const MarkerHoverCard = (props) => {
  const { selectedList, setSelectedList } = useSelection()
  const [imageUrl, setImageUrl] = useState(null)
  const [busyness, setBusyness] = useState(null) // State to store busyness
  const [isAdded, setIsAdded] = useState(false)

  const add_attraction = () => {
    console.log('PLACE:', props.place) // Inspects the properties of a place
    const attractionWithImage = { ...props.place, imgUrl: imageUrl }

    if (selectedList == null) {
      setSelectedList([attractionWithImage])
    } else {
      setSelectedList([...selectedList, attractionWithImage])
    }

    setIsAdded(true) // Set the attraction as added
    props.onClose() // Close the card
  }

  function getCurrentTimeInNewYork() {
    const options = {
      timeZone: 'America/New_York',
      hour12: false // Use 24-hour format
    }
    return new Date().toLocaleString('en-US', options)
  }

  const fetchImage = async (placeName) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${placeName}&client_id=aqKawDJQSON-VdRqYv7Go4eY44nlRSflcZsgIveDcIU`
      )

      // Added this line to check the response status
      console.log(`Response status: ${response.status}`)

      const responseJson = await response.json()

      // Logs the entire response as well
      console.log('Response:', responseJson)

      if (responseJson && responseJson.results && responseJson.results.length > 0) {
        setImageUrl(responseJson.results[0].urls.small)
      } else {
        console.error(`No image found for ${placeName}`)
      }
    } catch (error) {
      console.error(`Failed to fetch image for ${placeName}`, error)
    }
  }

  const getBusynessStatus = () => {
    if (busyness >= 70) {
      return { color: 'red', text: 'Busy' }
    }
    if (busyness >= 40) {
      return { color: 'yellow', text: 'Moderately Busy' }
    }
    return { color: 'green', text: 'Not Busy' }
  }

  const getCircleColor = () => {
    console.log('Busyness:', busyness) // Log the busyness value
    if (busyness >= 70) {
      console.log('Color: red')
      return 'red' // busy
    }
    if (busyness >= 40) {
      console.log('Color: yellow')
      return 'yellow' // moderately busy
    }
    console.log('Color: green')
    return 'green' // not busy
  }

  const fetchBusyness = async () => {
    const requestBody = {
      name: props.place.name,
      lat_lon: '' + props.place['position']['lat'] + ',' + props.place['position']['lng'],
      hour: new Date(getCurrentTimeInNewYork()).getHours(),
      day: new Date(getCurrentTimeInNewYork()).getDay(),
      month: new Date(getCurrentTimeInNewYork()).getMonth() + 1
    }
    const url = 'attraction/predict' // Your backend endpoint
    try {
      const response = await axios.post(url, requestBody)
      const data = response.data
      console.log(data)
      console.log('Busyness:', data.prediction[0])
      setBusyness(data.prediction[0])
    } catch (error) {
      console.error(`Failed to fetch busyness for ${props.place.name}`, error)
    }
  }

  useEffect(() => {
    fetchImage(props.place['name'])
    fetchBusyness() // Fetch busyness data when component mounts
  }, [props.place])

  const busynessStatus = getBusynessStatus()

  return (
    <div className="hover-card-container">
      {/* Display the image if available */}
      {imageUrl && (
        <div className="hover-card-image">
          <img src={imageUrl} alt={props.place['name']} />
        </div>
      )}
      <div className="hover-card-info">
        <h3>{props.place['name']}</h3>

        {/* Display busyness circle and text */}
        <div className="busyness-indicator">
          <div className="busyness-circle" style={{ backgroundColor: busynessStatus.color }}></div>
          <i style={{ marginLeft: '5px' }}>{busynessStatus.text}</i>
        </div>

        <button onClick={add_attraction} style={{ backgroundColor: isAdded ? 'green' : '#007BFF' }}>
          {isAdded ? 'Added' : 'Add to itinerary'}
        </button>
        <button onClick={props.onClose}>Close</button>
      </div>
    </div>
  )
}
