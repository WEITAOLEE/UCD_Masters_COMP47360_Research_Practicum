import styles from './TripInfo.module.css'
export const TripInfo = (props) => {
  console.log('tripInfo', props.trip_details)
  return (
    <div className={styles.overlay} onClick={props.onClick}>
      <div className={styles.card}>
        <p className={styles.cardTitle}>Your Saved Trip</p>
        <p className={styles.smallDesc}>
          {`Trip Start Date: ${props.trip_details.trip.start_date}`}
        </p>
        <p className={styles.smallDesc}>{`Trip End Date: ${props.trip_details.trip.start_date}`}</p>
        <h4>Attractions Planned to visit</h4>

        {props.trip_details.attractions.map((attraction) => {
          return (
            <div className={styles.attractionSmallCard}>
              {attraction.all_details.name} on {attraction.date} at {attraction.time}
            </div>
          )
        })}

        <div className={styles.goCorner}>
          <div className={styles.goArrow}>→</div>
        </div>
      </div>
      {/* <div className={styles.overlayCard}>
        <h2>Your Planned Trip</h2>
        <div>{`Trip Start Date: ${props.trip_details.trip.start_date}`}</div>
        <div>{`Trip End Date: ${props.trip_details.trip.end_date}`}</div>
        <h3>Attractions</h3>
        {props.trip_details.attractions.map((attraction) => {
          return <div>{attraction.all_details.name}</div>
        })}
      </div> */}
    </div>
  )
}
