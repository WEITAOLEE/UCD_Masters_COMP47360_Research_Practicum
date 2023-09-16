import { useEffect, useState, useMemo, useRef } from 'react'
import attractions_data from '../../assets/filtered_attractions.json'
import { GoogleMap, MarkerF, HeatmapLayer, Polyline } from '@react-google-maps/api'
import { HomePageMarker } from './HomePageMarker'
import { useCategories } from '../../context/CategoriesContext'
import options from '../../assets/attraction_options.json'
import axios from 'axios'
import bestTimeData from '../../assets/best_time_ok_data.json'


// This function should fetch the code from the backend instead of the json file.

export const HomePageMap = (props) => {
  // fetch_marker_data will be turned into a function call that can get all the attractions from the backend.

  const mapStyles = [
    {
      featureType: 'administrative',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#444444'
        }
      ]
    },
    {
      featureType: 'landscape',
      elementType: 'all',
      stylers: [
        {
          color: '#f2f2f2'
        }
      ]
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'all',
      stylers: [
        {
          visibility: 'on'
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'poi.attraction',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'poi.business',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'all',
      stylers: [
        {
          saturation: -100
        },
        {
          lightness: 45
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [
        {
          saturation: '0'
        },
        {
          visibility: 'on'
        },
        {
          color: '#fefefe'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'labels.text',
      stylers: [
        {
          color: '#303030'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#aca9a9'
        },
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          weight: '0.64'
        },
        {
          color: '#393939'
        },
        {
          visibility: 'on'
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'all',
      stylers: [
        {
          visibility: 'on'
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#f9bc1e'
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          weight: '2.99'
        },
        {
          visibility: 'on'
        }
      ]
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'transit',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'all',
      stylers: [
        {
          color: '#46bcec'
        },
        {
          visibility: 'on'
        }
      ]
    }
  ]

  const darkMapStyles = [
    {
      featureType: 'all',
      elementType: 'geometry',
      stylers: [
        {
          color: '#0a2639'
        }
      ]
    },
    {
      featureType: 'all',
      elementType: 'labels.text',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'all',
      elementType: 'labels.text.fill',
      stylers: [
        {
          gamma: 0.01
        },
        {
          lightness: 20
        }
      ]
    },
    {
      featureType: 'all',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          saturation: -31
        },
        {
          lightness: -33
        },
        {
          weight: 2
        },
        {
          gamma: 0.8
        }
      ]
    },
    {
      featureType: 'all',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [
        {
          lightness: 30
        },
        {
          saturation: 30
        }
      ]
    },
    {
      featureType: 'landscape',
      elementType: 'geometry.fill',
      stylers: [
        {
          saturation: '-19'
        },
        {
          color: '#003148'
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          saturation: 20
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          lightness: 20
        },
        {
          saturation: -20
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          lightness: 10
        },
        {
          saturation: -30
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#000000'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [
        {
          saturation: 25
        },
        {
          lightness: 25
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#12e1e4'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'all',
      stylers: [
        {
          lightness: -20
        }
      ]
    }
  ]

  const { selectedOptions } = useCategories()

  const [initialLoad, setInitialLoad] = useState(true)
  const [fetched_markers, setFetchedMarkers] = useState([])
  const [mapLoaded, setMapLoaded] = useState(false) // New state for map loading
  const [heatmapData, setHeatmapData] = useState([]) // Declare heatmapData state variable

  const getSelectedTypes = () => {
    let filtered_options = options
    let filtered_types = []
    if (selectedOptions.length > 0) {
      filtered_options = options.filter((option) => selectedOptions.includes(option.id))
    }

    filtered_options.map((option) => {
      filtered_types = filtered_types.concat(option['types'])
    })
    return filtered_types
  }

  let attraction_url = '/attractions/fetch'
  let filtered_types = getSelectedTypes()
  let attractions = null
  let coordinate_json = []

  useEffect(() => {
    axios
      .get(attraction_url)
      .then((response) => {
        attractions = response.data
        attractions.map((attraction, key) => {
          attraction['position'] = { lat: attraction.latitude, lng: attraction.longitude }
        })
        for (let key in attractions) {
          if (attractions.hasOwnProperty(key)) {
            let attraction_details = attractions[key]
            if (filtered_types.includes(attraction_details['tourism']))
              coordinate_json.push(attraction_details)
          }
        }
        setMapLoaded(true)
        setFetchedMarkers(coordinate_json)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [selectedOptions])

  //useeffect to set new heatmap data when the selected options change
  //the weight here will be the busyness percentage we get from backend
  // Note that museums and artworks do not load on the map I can not figure out why, they are passed correctly
  // and with a busyness value
  // ... Other parts of the code
  function getCurrentTimeInNewYork() {
    const options = {
      timeZone: 'America/New_York',
      hour12: false // Use 24-hour format
    }
    return new Date().toLocaleString('en-US', options)
  }

  //Currently working by loading in best time data, goes initially
  //Using best time for initial load
  /*
  useEffect(() => {
    if (initialLoad) {

      const fetchData = async () => {
        const heatmapData = [];

        for (let i = 0; i < bestTimeData.length; i++) {
          const venue = bestTimeData[i];
          var venueName = venue["Venue Name"];
          const venueCoordinates = venue["Venue Coordinates"];
          const avgDwellTime = venue["Average Dwell Time"];
          //console.log('Venue name:', venueName, 'has an average dwell time of:', avgDwellTime);

          // Split the coordinates string into latitude and longitude
          const [latitude, longitude] = venueCoordinates.split(' ')
          // Convert latitude and longitude to floating-point numbers
          const latitudeFloat = parseFloat(latitude);
          const longitudeFloat = parseFloat(longitude);

          const dayOfWeekNumber = new Date(getCurrentTimeInNewYork()).getDay();
          // Array to map the day of the week number to a string representation
          const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          // Get the day as a string
          const dayAsString = daysOfWeek[dayOfWeekNumber];

          try {
            const requestBody = {
              name: venueName,
              day: dayAsString,
              hour: '19'//new Date(getCurrentTimeInNewYork()).getHours().toString()
            }
            const url = '/busyness/get';
            const response = await axios.get(url, {
              params: requestBody,
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const data = response.data;
            const busyness = parseInt(data.busyness);
            //console.log(requestBody.name, busyness);

            heatmapData.push({
              location: new window.google.maps.LatLng(latitudeFloat, longitudeFloat),
              weight: busyness
            });

          } catch (error) {
          }
        }
        console.log(heatmapData);
        console.log("Best Time Data has been loaded when you see this message")
        setHeatmapData(heatmapData);
        setInitialLoad(false);
      }
      fetchData();
    }
  }, [initialLoad]);
  */

  //This works for heatmap when markers have been selected
  // make sure it calls from cache if it has already been called
  //Code for every time the markers change

  var cached = {}; // Use an object to cache data

  useEffect(() => {

    if (initialLoad) {
      const fetchData = async () => {
        const lat_lon = fetched_markers.map(
          (marker) => marker.position.lat + ',' + marker.position.lng
        );

        const markersToFetch = lat_lon.filter(position => !cached[position]);
        // Get positions that are not cached

        if (markersToFetch.length === 0) {
          // All data is cached, no need to fetch
          return;
        }

        const heatmapData = await Promise.all(
          markersToFetch.map(async (position) => {
            try {
              const requestBody = {
                name: fetched_markers.find(
                  (marker) => marker.position.lat + ',' + marker.position.lng === position
                )?.name,
                lat_lon: position,
                hour: new Date(getCurrentTimeInNewYork()).getHours(),
                day: new Date(getCurrentTimeInNewYork()).getDay(),
                month: new Date(getCurrentTimeInNewYork()).getMonth() + 1
              };

              const url = 'attraction/predict';
              const response = await axios.post(url, requestBody);
              const data = response.data;
              const busyness = data.prediction[0];
              const [lat, lng] = requestBody.lat_lon.split(',');
              const latitude = parseFloat(lat);
              const longitude = parseFloat(lng);

              cached[position] = lat_lon; // Cache the busyness value
              //console.log(requestBody.name, 'has busyness', busyness)
              return {
                location: new window.google.maps.LatLng(latitude, longitude),
                weight: busyness
              };
            } catch (error) {
              return null;
            }
          })
        );
        console.log('Busyness prediction data has loaded from the Backend')
        setHeatmapData(prevHeatmapData => [
          ...prevHeatmapData,
          ...heatmapData.filter((entry) => entry !== null)
        ]);
      }
      fetchData();
    }
  }, [fetched_markers]);

  const handleHeatmapLoad = (heatmapLayer) => {
    // Handle the loaded heatmapLayer instance
    //define the gradient, opaque, green, yellow, red
    const gradient = [
      'rgba(255, 255, 255, 0)',
      'rgba(0, 255, 0, 1)',
      'rgba(255, 255, 0, 1)',
      'rgba(255, 0, 0, 1)'
    ]

    heatmapLayer.setOptions({
      radius: 30, //Set the radius of each data point
      opacity: 0.5, // Set the opacity of the heatmap layer
      //start at opaque, then green, yellow, red
      gradient
    })
  }

  const [zoomLevel, setZoomLevel] = useState(15) // Initial zoom level

  const mapRef = useRef(null)

  const handleMapLoading = () => {
    setMapLoaded(true)
  }

  // Notice we now also handle zoom from the props if it is provided
  const handleCenterChange = () => {
    if (props.zoom) {
      setZoomLevel(props.zoom)
    } else {
      setZoomLevel(25)
    }
  }

  // If the path has data, prepare it for the polyline
  const polylinePath =
    props.path.length > 0
      ? props.path.map((location) => ({ lat: location.lat, lng: location.lng }))
      : []

  return (
    <GoogleMap
      mapContainerClassName="map-container"
      ref={mapRef}
      mapTypeId="roadmap"
      zoom={zoomLevel}
      center={props.map_center}
      onLoad={handleMapLoading}
      onCenterChanged={handleCenterChange}
      options={{
        styles: props.isNowMode ? darkMapStyles : mapStyles
      }}
    >
      {mapLoaded &&
        fetched_markers.map((marker_details, index) =>
          !props.isNowMode && <HomePageMarker key={index} markerDetails={{ ...marker_details, id: index }} />
        )}

      {props.isNowMode && <HeatmapLayer data={heatmapData} onLoad={handleHeatmapLoad} />}
      {polylinePath.length > 0 && <Polyline path={polylinePath} />}
    </GoogleMap>
  )
}
