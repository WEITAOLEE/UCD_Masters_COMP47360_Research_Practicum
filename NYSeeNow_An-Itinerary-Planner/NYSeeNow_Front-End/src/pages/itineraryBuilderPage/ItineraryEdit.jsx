import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styles from './ItineraryEdit.module.css'
import { useNavigate } from 'react-router-dom'

import { Bar } from 'react-chartjs-2'
import {
  Chart,
  LinearScale,
  PointElement,
  TimeScale,
  TimeSeriesScale,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement
} from 'chart.js'
import 'chartjs-adapter-moment'

// Register the necessary components and scales
Chart.register(
  LinearScale,
  PointElement,
  TimeScale,
  TimeSeriesScale,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement
)

const ItineraryEdit = () => {
  const [tripObj, setTripObj] = useState(null)
  const { state } = useLocation()
  const [tripAttractions, setTripAttractions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [attractions, setAttractions] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchAttractions = async () => {
      const response = await axios.get(`/attractions/fetch`)
      setAttractions(response.data)
    }
    fetchAttractions()
  }, [])

  useEffect(() => {
    const fetchTripAttractions = async () => {
      const tripId = state?.trip_id
      const username = state?.username
      const response = await axios.get(`/trip/tripAttraction/${username}/${tripId}`)
      setTripAttractions(response.data)
      setIsLoading(false)
    }
    if (state?.username && state?.trip_id) {
      fetchTripAttractions()
    }
  }, [state])

  const handleInputChange = (index, event) => {
    const values = [...tripAttractions]
    if (event.target.name === 'date') {
      values[index].date = event.target.value
    } else {
      values[index].time = event.target.value
    }
    setTripAttractions(values)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const tripDetails = tripAttractions.map((attraction) => {
      const { date, time, attractionId, prediction } = attraction
      let visitTime = time + ':00'
      return {
        attractionId,
        date,
        time: visitTime,
        prediction: typeof prediction === 'string' ? prediction : JSON.stringify(prediction)
      }
    })

    try {
      const response = await axios.put(
        `/trip/update/${state.username}/${state.trip_id}`,
        tripDetails
      )

      if (response.status === 200) {
        console.log('Data successfully updated')
        navigate('/itineraries')
      } else {
        console.log('Data update failed')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const data = (dayBusyness) => ({
    labels: [
      '12 AM',
      '1 AM',
      '2 AM',
      '3 AM',
      '4 AM',
      '5 AM',
      '6 AM',
      '7 AM',
      '8 AM',
      '9 AM',
      '10 AM',
      '11 AM',
      '12 PM',
      '1 PM',
      '2 PM',
      '3 PM',
      '4 PM',
      '5 PM',
      '6 PM',
      '7 PM',
      '8 PM',
      '9 PM',
      '10 PM',
      '11 PM'
    ],
    datasets: [
      {
        label: 'Busyness',
        data: typeof dayBusyness === 'string' ? JSON.parse(dayBusyness) : dayBusyness,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  })

  const options = {
    scales: {
      x: {
        type: 'category'
      },
      y: {
        beginAtZero: true
      }
    }
  }

  return (
    <div className={styles.editContainer}>
      <h1>Itinerary Edit Page</h1>
      {tripAttractions.map((tripAttraction, index) => {
        const matchedAttraction = attractions.find(
          (attraction) => attraction.attractionId === tripAttraction.attractionId
        )
        return (
          <div key={index} className={styles.attractionContainer}>
            <div className={styles.attractionName}>
              {matchedAttraction ? matchedAttraction.name : 'Attraction not found'}
            </div>
            <div>Date: {tripAttraction.date}</div>
            <label className={styles.timeLabel}>
              Time:
              <input
                className={styles.timeInput}
                type="time"
                name="time"
                value={tripAttraction.time}
                onChange={(event) => handleInputChange(index, event)}
              />
            </label>
            <Bar data={data(tripAttraction.prediction)} options={options} />
          </div>
        )
      })}
      <button className={styles.submitButton} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  )
}

export default ItineraryEdit
