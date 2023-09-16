import { InfoBox, OverlayView } from '@react-google-maps/api'
import { useEffect, useState } from 'react'
import { MarkerHoverCard } from './MarkerHoverCard'
import { useOpenCard } from '../../context/OpenCardProvider'

const attractionSVG = '/attractions.svg'
const museumSVG = '/museums.svg'
const artworkSVG = '/artworkSVG.svg'
const aquariumSVG = '/aquariums.svg'
const campsiteSVG = '/campsites.svg'
const gallerySVG = '/galleries.svg'
const sightseeingSVG = '/sightseeing.svg'

const getCustomMarker = (type) => {
  const color = getTypeColor(type)
  const svgIcon =
    {
      attraction: attractionSVG,
      museum: museumSVG,
      artwork: artworkSVG,
      aquarium: aquariumSVG,
      camp_site: campsiteSVG,
      gallery: gallerySVG,
      sightseeing: sightseeingSVG
    }[type] || attractionSVG

  return `
    <div style="background-color: ${color}; width: 1.5rem; height: 1.5rem; border-radius: 20%; display: flex; box-shadow: 3px 3px 3px #353535; align-items: center; justify-content: center;">
      <img src="${svgIcon}" style="width: 1rem; height: 1rem;" />
    </div>
  `
}

export const getTypeColor = (type) => {
  const typeColorMap = {

    attraction: '#7DB2E8',  
    museum: '#FF847B',      
    artwork: '#FFB75A',     
    gallery: '#C89BF1',     
    sightseeing: '#B5DA92', 
    aquarium: '#27D4C9',    
    camp_site: '#CF9958',   
    view_point: '#BAC2BE',  
  }

  return typeColorMap[type] || '#7DB2E8' // The mixed blue will be the default color if the type is not found

}


const getTypeIconURL = (type) => {
  const color = getTypeColor(type)
  const svgIcon =
    {
      attraction: attractionSVG,
      museum: museumSVG,
      artwork: artworkSVG,
      aquarium: aquariumSVG,
      camp_site: campsiteSVG,
      gallery: gallerySVG,
      sightseeing: sightseeingSVG
    }[type] || attractionSVG

  // Create an SVG string with a colored circle and the attraction SVG as its background
  const svgString = `
    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="${color}" stroke="black" stroke-width="1"/>
      <image href="${svgIcon}" x="5" y="5" height="30" width="30"/>
    </svg>
  `

  // Convert the SVG string to a data URL
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`
}

export const HomePageMarker = (props) => {
  const { openCardId, setOpenCardId } = useOpenCard()
  const [isClicked, setIsClicked] = useState(false)

  const handleMarkerClicked = () => {
    console.log('Clicked marker ID:', props.markerDetails.id)
    console.log('Current openCardId:', openCardId)
    if (openCardId === props.markerDetails.id) {
      setOpenCardId(null) // Close the card if it's already open
    } else {
      setOpenCardId(props.markerDetails.id) // Open the card and close others
    }
  }

  const handleCardClose = () => {
    setIsClicked(false)
  }

  const onLoad = (infoBox) => {}

  const options = { closeBoxURL: '', enableEventPropagation: true }

  const icon = {
    url: getTypeIconURL(props.markerDetails.tourism),
    scaledSize: new google.maps.Size(40, 40)
  }

  return (
    <>
      <OverlayView
        position={props.markerDetails['position']}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div
          dangerouslySetInnerHTML={{ __html: getCustomMarker(props.markerDetails.tourism) }}
          onClick={handleMarkerClicked}
        />
      </OverlayView>

      {openCardId === props.markerDetails.id && (
        <InfoBox onLoad={onLoad} options={options} position={props.markerDetails['position']}>
          <MarkerHoverCard
            place={props.markerDetails}
            onClose={() => setOpenCardId(null)}
            markerInfo={props.markerDetails}
          ></MarkerHoverCard>
        </InfoBox>
      )}
    </>
  )
}
