import React from 'react'
import { WeatherCard } from './WeatherCard' // Import the WeatherCard component

const NowModeButton = ({ isNowMode, toggleNowMode }) => {
  const buttonStyle = isNowMode ? 'now-mode-button on' : 'now-mode-button off'

  const buttonStyleWithBackground = {
    backgroundImage: `linear-gradient(${

      isNowMode ? 'rgba(249, 185, 195, 0.02)' : 'rgba(249, 185, 195, 0.02)'
    }, ${isNowMode ? 'rgba(249, 185, 195, 0.5)' : 'rgba(249, 185, 195, 0.5)'}), url(${
      isNowMode ? '/nyseenowLogoNowModeGreen.png' : '/nyseenowLogoNowModeRed.png'
    })`,

    backgroundSize: 'cover',
    border: '2px solid #333',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)'
  }

  return (
    <div>
      <div className={buttonStyle} onClick={toggleNowMode} style={buttonStyleWithBackground}></div>
      {isNowMode && <WeatherCard />} {/* Render the WeatherCard if isNowMode is true */}
    </div>
  )
}

export default NowModeButton
