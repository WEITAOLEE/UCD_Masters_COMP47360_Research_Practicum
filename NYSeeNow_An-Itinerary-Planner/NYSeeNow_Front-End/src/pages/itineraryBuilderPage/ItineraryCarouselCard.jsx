import ItineraryDetailsCard from './ItineraryDetailsCard'
import styles from './ItineraryCarouselCard.module.css'

const ItineraryCarouselCard = (props) => {
  let attractions_for_day = props.value

  const stringWithoutGMT =
    props.day.split(' ')[0] +
    ' ' +
    props.day.split(' ')[1] +
    ' ' +
    props.day.split(' ')[2] +
    ' ' +
    props.day.split(' ')[3]

  return (
    <>
      <div className={styles.carouselCard}>{stringWithoutGMT}</div>
      {attractions_for_day.map((attraction, key) => (
        <ItineraryDetailsCard
          key={key}
          cardkey={key}
          attraction={attraction}
        ></ItineraryDetailsCard>
      ))}
    </>
  )
}

export default ItineraryCarouselCard
