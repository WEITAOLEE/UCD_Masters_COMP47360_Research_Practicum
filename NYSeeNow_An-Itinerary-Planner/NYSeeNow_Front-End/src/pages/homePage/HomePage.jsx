import { HomePageMap } from './HomePageMap';
import NowModeButton from '../../components/NowModeButton';
import { useLoadScript } from '@react-google-maps/api';
import React, { useState, useRef, useContext, useEffect } from 'react';
import Locator from '../../components/Locator';
import { useSelection } from '../../context/SelectionContext'; // Import the useSelection hook
import { LocatorContext } from '../../context/LocatorContext';
import { SideBar } from '../../components/SideBar';


const libraries = ['visualization'];

export const HomePage = ({ map_center, setMapCenter, zoom, setZoom }) => {  

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCTCIyYHCeWx1duTYP38_g8ikK3_fwVrSE',
    libraries
  });

  const [isNowMode, setIsNowMode] = useState(false); // add this state
  const [path, setPath] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const { showLocator, setShowLocator } = useContext(LocatorContext);
  // Use the useSelection hook to access the selectedList
  const { selectedList } = useSelection();
  console.log(selectedList);
  const mapRef = useRef(null);

  useEffect(() => {
    console.log("Effect triggered");

    if (showLocator && selectedList.length > 0) {
      console.log("Locator shown and selected list has items");

      // Validate selectedList
      for (let i = 0; i < selectedList.length; i++) {
        if (
          !selectedList[i] ||
          !selectedList[i].position ||
          !isFinite(selectedList[i].position.lat) ||
          !isFinite(selectedList[i].position.lng)
        ) {
          console.error("Invalid location in selectedList at index " + i, selectedList[i]);
          return;
        }
      }

      const latitudes = selectedList.map(location => location.position.lat);
      const longitudes = selectedList.map(location => location.position.lng);

      const minLat = Math.min(...latitudes);
      const maxLat = Math.max(...latitudes);
      const minLng = Math.min(...longitudes);
      const maxLng = Math.max(...longitudes);

      setZoom(10);

      const centerLat = (minLat + maxLat) / 2;
      const centerLng = (minLng + maxLng) / 2;

      console.log("New center coordinates:", { lat: centerLat, lng: centerLng });

      setMapCenter({ lat: centerLat, lng: centerLng });

      setShowLocator(false);
    }
  }, [showLocator, setShowLocator, selectedList, setMapCenter, setZoom]);


  // function to toggle Now Mode on and off
  const toggleNowMode = () => {
    setIsNowMode((prev) => !prev);
  };

  if (!isLoaded) {
    return <h1>Map loading...</h1>
  } else {
    return (
      <>
        <HomePageMap mapRef={mapRef} map_center={map_center} zoom={zoom} isNowMode={isNowMode} selectedAttractions={selectedList} path={path} />
        <NowModeButton isNowMode={isNowMode} toggleNowMode={toggleNowMode} />
        {selectedList && selectedList.length >= 2 && <Locator mapRef={mapRef} selectedAttractions={selectedList} setPath={setPath} setTotalTime={setTotalTime} setMapCenter={setMapCenter} setZoom={setZoom} />}
      </>
    );
  };
};
