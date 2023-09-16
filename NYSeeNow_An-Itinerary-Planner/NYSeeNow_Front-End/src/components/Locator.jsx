import React, { useEffect, useRef, useState, useContext } from 'react';
import { Polyline } from '@react-google-maps/api';
import { LocatorContext } from '../context/LocatorContext'; // adjust path as needed

const Locator = ({ selectedAttractions, path, setPath, setTotalTime, setMapCenter, setZoom }) => { // mapRef, itinerary, setPath, setMapCenter, setZoomand setTotalTime as props
    const { showLocator, setShowLocator } = useContext(LocatorContext);
    // Keep a reference to the polyline path
    const pathRef = useRef(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getDirections = async () => {
            const directionsService = new window.google.maps.DirectionsService();
            const waypoints = selectedAttractions.map(location => ({
                location: { lat: location.position.lat, lng: location.position.lng },
                stopover: true
            }));

            if (waypoints.length > 1) {
                console.log('Origin: ', waypoints[0].location);

                directionsService.route({
                    origin: waypoints[0].location,
                    destination: waypoints[waypoints.length - 1].location,
                    waypoints: waypoints.slice(1, -1),
                    optimizeWaypoints: true,
                    travelMode: 'WALKING'
                }, (result, status) => {
                    console.log('Status: ', status);
                    if (status === 'OK') {
                        const directions = result.routes[0].legs;
                        console.log('Directions: ', directions);
                        const routePath = result.routes[0].overview_path.map(latLng => ({ lat: latLng.lat(), lng: latLng.lng() }));
                        const routeTime = result.routes[0].legs.reduce((totalTime, leg) => totalTime + leg.duration.value, 0);
                        setPath(routePath);
                        setLoading(false);
                        console.log('HI', routePath);  // Moved console.log here
                        setTotalTime(routeTime);
                        // Zoom in on the route
                        const bounds = new window.google.maps.LatLngBounds();
                        routePath.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
                        setMapCenter({ lat: bounds.getCenter().lat(), lng: bounds.getCenter().lng() });
                        setZoom(10);

                        // Save the path to the ref
                        pathRef.current = routePath;

                        // Reset showLocator after getting directions
                        setShowLocator(false);
                    } else {
                        console.error('Directions request failed due to ' + status);
                        setLoading(false);
                    }
                });
            } else {
                setLoading(false); // Set loading to false when there are no waypoints
            }
        };

        if (showLocator) {
            getDirections();
        }
    }, [selectedAttractions, setPath, setTotalTime, showLocator, setShowLocator, setMapCenter, setZoom]);

    if (loading) {
        return <p>Loading route...</p>;
    } else {
        return (
            <Polyline
                path={pathRef.current || path}
                options={{ strokeColor: '#FF0000' }}
            />
        );
    }
}
export default Locator;
