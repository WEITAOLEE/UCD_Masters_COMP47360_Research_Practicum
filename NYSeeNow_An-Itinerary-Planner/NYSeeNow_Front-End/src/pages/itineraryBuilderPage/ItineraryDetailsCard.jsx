import styles from './ItineraryDetailsCard.module.css'
import { Bar } from 'react-chartjs-2'
import { useState, useEffect } from 'react'

import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'

const ItineraryDetailsCard = (props) => {
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

  const data = {
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
        data: props.attraction.day_busyness,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  }

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

  const handleTimeChange = (event) => {
    props.attraction.visitTime = event.target.value
    console.log('Time changed check it out!')
    console.log(props.attraction)
  }
  return (
    <div className={styles.ItnDetailsCard}>
      <div>{props.attraction.name}</div>
      {props.attraction.all_details && <p>{props.attraction.all_details.properties.description}</p>}
      <label htmlFor="timeInput">Visit Time</label>
      <input type="time" id="timeInput" name="time" onChange={handleTimeChange} />
      <Bar data={data} options={options} />
    </div>
  )
}

export default ItineraryDetailsCard
