import React, { useState } from 'react'
import './App.css'
import { NavBar } from './components/NavBar'
import { SideBar } from './components/SideBar'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/homePage/HomePage'
import { MyItineraries } from './pages/savedItinerariesPage/MyItineraries'
import { UserProfile } from './pages/userProfilePage/UserProfile'
import { AuthProvider, useAuth } from './context/AuthContext'
import { Login } from './pages/authOverlay/Login'
import { Forget } from './pages/authOverlay/Reset'
import { SelectionProvider } from './context/SelectionContext'
import { CategoriesProvider } from './context/CategoriesContext'
import { ItineraryBuilder } from './pages/itineraryBuilderPage/ItineraryBuilder'
import { TripDataProvider } from './context/TripDataContext'
import { LocatorContext } from './context/LocatorContext'
import LandingPage from './pages/LandingPage/LandingPage'
import { useLocation } from 'react-router-dom'
import TripEditPage from './pages/itineraryBuilderPage/ItineraryEdit'
import { Register } from './pages/authOverlay/Register'
import ItineraryEdit from './pages/itineraryBuilderPage/ItineraryEdit'
import { OpenCardProvider } from './context/OpenCardProvider'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [center, setMapCenter] = useState({ lat: 40.7699, lng: -73.9757 })
  const [zoom, setZoom] = useState(9) // Add this new state
  const [showLocator, setShowLocator] = useState(false)
  const location = useLocation()

  return (
    <>
      <AuthProvider>
        <SelectionProvider>
          <CategoriesProvider>
            <LocatorContext.Provider value={{ showLocator, setShowLocator }}>
              <TripDataProvider>
                <OpenCardProvider>
                  {location.pathname !== '/' && <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />}
                  {location.pathname !== '/' && (
                    <NavBar isOpen={isOpen} set_map_center={setMapCenter} />
                  )}

                  <div className="route-container">
                    <Routes>
                      <Route path="/" element={<LandingPage />} />
                      <Route
                        path="/home"
                        element={
                          <HomePage
                            map_center={center}
                            setMapCenter={setMapCenter}
                            zoom={zoom}
                            setZoom={setZoom}
                          />
                        }
                      />
                      <Route path="/itineraries" element={<MyItineraries />} />
                      <Route path="/itinerary-builder" element={<ItineraryBuilder />} />
                      <Route path="/userprofile" element={<UserProfile />} />
                      <Route path="/register" element={<Register />} />
                      <Route
                        path="/attractions-map"
                        element={<HomePage map_center={center} setMapCenter={setMapCenter} />}
                      />
                      <Route path="/ItineraryEdit" element={<ItineraryEdit />} />
                    </Routes>
                  </div>
                </OpenCardProvider>
              </TripDataProvider>
            </LocatorContext.Provider>
          </CategoriesProvider>
        </SelectionProvider>
      </AuthProvider>
    </>
  )
}

export default App
