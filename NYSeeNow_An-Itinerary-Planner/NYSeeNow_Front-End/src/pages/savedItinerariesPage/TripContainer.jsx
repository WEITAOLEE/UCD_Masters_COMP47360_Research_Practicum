import React, { useEffect, useState } from 'react'
import styles from './TripContainer.module.css'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const TripContainer = (props) => {
  const [tripObj, setTripObj] = useState(null)
  const { authUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const trip_detail_string = props.trip_details
    setTripObj(JSON.parse(trip_detail_string))
  }, [props.trip_details])

  const handleDelete = async () => {
    try {
      const username = tripObj?.username

      if (!username) {
        console.error('Username is undefined')
        return
      }

      const response = await axios.delete(`/trip/delete/${username}/${tripObj['trip_id']}`)

      if (response.status === 200) {
        // Refresh the component or do something after the trip is deleted
        console.log('Trip deleted successfully')
      } else {
        console.error('Failed to delete trip')
      }
    } catch (error) {
      console.error(error)
    }
  }

  // Function to handle Edit button click
  const handleEdit = () => {
    navigate('/ItineraryEdit', { state: { trip_id: tripObj.trip_id, username: tripObj.username } })
  }

  if (tripObj) {
    const id_val = tripObj['trip_id']
    const random_gen = (id_val % 3) + 1
    const nyc_string = `/nyc${random_gen}.png`
    console.log('Trip image')
    console.log(nyc_string)

    return (
      <>
        <div className={styles.tripContainer}>
          <img src={nyc_string}></img>
          <div className={styles.detailsAndButtons}>
            {' '}
            <div className={styles.tripDetails}>
              <div>Id: {tripObj['trip_id']}</div>
              <div>Attractions: {tripObj['number_of_attractions']}</div>
              <div>Start Date: {tripObj['start_date']}</div>
              <div>End Date: {tripObj['end_date']}</div>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.cardButtontrip} onClick={props.onClick}>
                View
              </button>

              <button
                className={styles.cardButtontrip}
                onClick={() => {
                  console.log(authUser)
                  handleDelete()
                }}
              >
                Delete
              </button>
              <button className={styles.cardButtontrip} onClick={handleEdit}>
                Edit
              </button>
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return <div></div>
  }
}
